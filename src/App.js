import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

//styled components
const Contenedor = styled.div`
	max-width: 900px;
	margin: 0 auto;
	@media (min-width: 920px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 2rem;
	}
`;

//para la image
const Imagen = styled.img`
	max-width: 100%;
	margin-top: 5rem;
`;

//para el h1
const Heading = styled.h1`
	font-family: 'Bebas Neue', cursive;
	color: #fff;
	text-align: left;
	font-weight: 700;
	font-size: 50px;
	margin-bottom: 50px;
	margin-top: 80px;

	&::after {
		content: '';
		width: 100px;
		height: 6px;
		background-color: #66a2fe;
		display: block;
	}
`;

function App() {
	//states para realizar los calculos de cotizacion
	const [moneda, guardarMoneda] = useState('');
	const [criptomoneda, guardarCriptomoneda] = useState('');
	const [resultado, guardarResultado] = useState({});

	//state para el spinner
	const [cargando, guardarCargando] = useState(false);

	//useEffect que escucha si los states van cambiando
	useEffect(() => {
		const cotizarCriptomoneda = async () => {
			if (moneda === '') return;

			//consultar la API para obtener la cotizacion
			const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
			const resultado = await axios.get(url);

			//MOSTRAR EL SPINNER
			guardarCargando(true);

			setTimeout(() => {
				//cambiar el estado del spinner
				guardarCargando(false);

				//guardar resultado
				guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
			}, 3000);
		};

		cotizarCriptomoneda();
	}, [moneda, criptomoneda]);

	//mostrar spinner o componente Cotizacion que tiene el resultado
	const componente = cargando ? <Spinner /> : <Cotizacion resultado={resultado} />;

	return (
		<Contenedor>
			<div>
				<Imagen src={imagen} alt="Imagen cripto" />
			</div>
			<div>
				<Heading>Cotiza Criptomonedas al Instante</Heading>
				<Formulario guardarMoneda={guardarMoneda} guardarCriptomoneda={guardarCriptomoneda} />

				{componente}
			</div>
		</Contenedor>
	);
}

export default App;
