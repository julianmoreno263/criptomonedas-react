import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useMoneda from '../hooks/useMoneda.js';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

//style component
const Boton = styled.input`
	margin-top: 20px;
	font-weight: bold;
	font-size: 20px;
	padding: 10px;
	background-color: #66a2fe;
	border: none;
	width: 100%;
	border-radius: 10px;
	color: #fff;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #326ac0;
		cursor: pointer;
	}
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
	//state para guardar el resultado de la consulta a la API de las criptomonedas
	const [listacripto, guardarCriptomonedas] = useState([]);

	//state para el error
	const [error, guardarError] = useState(false);

	//opciones de las monedas
	const MONEDAS = [
		{ codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
		{ codigo: 'MXN', nombre: 'Peso Mexicano' },
		{ codigo: 'COL', nombre: 'Peso Colombiano' },
		{ codigo: 'EUR', nombre: 'Euro' },
	];
	//utilizar el custom hook useMoneda, esto es como el state del hook
	const [state, Seleccionar] = useMoneda('Elige tu moneda', '', MONEDAS);

	//usamos el hook useCriptomoneda
	const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

	//hacemos el llamado a la API
	useEffect(() => {
		const consultarAPI = async () => {
			const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
			const resultado = await axios.get(url);

			guardarCriptomonedas(resultado.data.Data);
		};

		consultarAPI();
	}, []);

	//cuando el usuario hace submit del formulario
	const cotizarMoneda = (e) => {
		e.preventDefault();

		//validamos si ambos campos estan llenos
		if (state === '' || criptomoneda === '') {
			guardarError(true);
			return;
		}

		//pasar los datos al componente principal
		guardarError(false);
		guardarMoneda(state);
		guardarCriptomoneda(criptomoneda);
	};

	return (
		<form onSubmit={cotizarMoneda}>
			{error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
			<Seleccionar />
			<SelectCripto />
			<Boton type="submit" value="Calcular" />
		</form>
	);
};

export default Formulario;
