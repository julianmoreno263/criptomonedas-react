/* 

En este proyecto crearemos un cotizador de criptomonedas, llevara un formulario donde selecaremos el tipo de moneda que queremos ver,osea,dolar,peso,etc, y la criptomoneda que queremos cotizar.

1- instalamos el proyecto con npx y hacemos limpieza de los archivos.

2- instalamos emotion y axios para trabajar con style components(v126)

        npm i @emotion/core @emotion/styled axios


------------------------------------------------------------------------------------

1-creamos en App.js un contenedor para el contenido principal usando style components(v127)

2- dentro de este contenedor creamos 2 divs, en uno ponemos una imagen,se importa directamente,le damos estilos con style components, se importa una imagen asi:

                            import image from './cryptomonedas.png';


3- creamos estilos para el h1, aqui creamos un pseudoelemento que pinta una linea azul debajo del h1

------------------------------------------------------------------------------------------------

1- creamos el componente Formulario, pero dentro de su return vamos a usar custom hook(v128), primero le damos unos stilos con style components.

2- este formulario lo mostramos despues del Heading en App.js,dentro del div.

-------------------------------------------------------------------------------------------

1- vamos a crear nuestros propios hooks,los hooks como useState y UseEffect son en si funciones, estos viene con React, pero tambien podemos crear nuestros propios hooks(se conocen como custom hooks,hooks personalizados), cada uno de los custom hooks que hagamos tendra su propio state con su correspondiente funcion que lo modifica(v129)

2- creamos en src una carpeta llamada hooks, el nombre del hook debe comenzar con use, igual que como useState, nuestro hook se llamara useModena.js.

3- dentro del archivo creamos el codigo como si fuera un componente,es decir imr y despues sfc.Este hook mostrara el select para elegir la moneda que queremos, entonces dentro del hook creamos una funcion como function expression y dentro de esta funcion es que estará el select que mostaremos, lo que este antes de esta funcion sera codigo js, osea la zona donde podemos escribir js,igual que un componente.(v129).

4- ahora, cuando utilizamos el useState,tenemos el state y la funcion que lo modifica, estos dos elementos son los que retorna el hook de useState, entonces para crear el state de nuestro hook debemos utilizar useState y crear el state en la zona segura de js,osea antes de lo que se retorna,antes d ela funcion flecha. Este state sera en principio un string vacio.

5- entonces tenemos tres elementos en nuestro hook, el state,la funcion que lo actualiza y la funcion que muestra el select, por lo que estos tres elementos son los que retornaremos por medio de un return al final del hook.

6- ahora, este hook lo utilizaremos en el formulario, por lo que se lo importamos y hacemos destructuring de sus elementos, no es necesario poner los nombres iguales,lo importante es el orden en que le pasamos los elementos,deben de estar en el mismo orden como los retornamos en el hook(v129).

7- podemos verque la diferencia con useState es que este retorna dos elementos(el state y la funcion que lo modifica) mientras que nuestro custom hook retorna tres elementos(state,su funcion y la funcion que muestra el select). Ahora, para mostrar ese select lo hacemos como un componene normal,lo colocamos antes del boton(v129).

8- La razón principal para utilizar hooks es más que reutilización de state, es la utilización de múltiples states.
En efecto, la apuesta de React es poco a poco desprenderse de los Class Components.

NOTA: LA FUNCION SELECCIONAR DEL HOOK DEBE IR CON () Y NO CON {} O TIRA UN ERROR.

--------------------------------------------------------------------------------------------

1- VAMOS A HACER MAS INTELIGENTE NUESTRO HOOK,PORQUE ASI COMO ESTA TIENE SIEMPRE EL MISMO TEXTO,ADEMAS SOLO TIENE UNA OPCION, ENTONCES EN EL FORMULARIO DONDE HICIOMOS DESTRUCTURING DEL HOOK, AL USEMONEDA() LE PASAMOS UN TEXTO COMO VALOR PREDETERMINADO,USEMONEDA("ELIGE TU MONEDA")
Y ESTE VALOS LO PASAMOS VIA PROPS CON EL NOMBRE DE "LABEL".(V130).

2- el state inicialmente de useMoneda es un string vacio, en useMoneda.js puedo pasarle mas valores iniciales a mi hook, osea, en Formulario.js puedo agregarle al useMoneda un valor de string vacio, voy a useMoneda.js y al hook le paso este string vacio como "stateInicial" via props, para que en caso de que el usuario quiera agregar una moneda inicial lo haga con este prop. En si estamos pasando valores por defecto inciales desde el state del hook y los podemos usar en el custom hook teniendo en cuenta que deben de ir en orden.

3- para hacer las otras opciones de monedas creo en Formulario.js un array de objetos con las opciones de monedas para elegir. Le paso este array al custom hook como tercer valor via prop, lo paso con el nombre de "opciones" y lo uso en el select de la funcion Seleccionar, para usar este array lo itero con un map y como key de cada opcion uso el codigo de cada moneda, pues se necesita tener un key.(v130)


4- ahora, en useMoneda.js ponemos en el select un evento onChange para que cuando el usuario seleccione una de las opciones, esta se guarde en el state del custom hook, a este onChange pues le pasamos la funcion de actualizarState y ademas le pasamos la propiedad value que tendra el propio state como valor, osea lo que se seleccione en el select sera el valor que se guardara en el state de nuestro custom hook. Podemos verificar que funciona en components de react developers tools en el navegador,(v131)

-----------------------------------------------------------------------------------

1- Crearemos style components en el custom hook useMoneda.js, recordar que para instalar emotion debemos hacerlo asi:

                npm i --save-dev @emotion/core @emotion/styled @emotion/react

como ya lo tenemos instalado ahora le damos estilos al label y al select del custom hook.,(v132)

2- de esta forma tenemos un codigo mas ordenado y limpio utilizando custom hooks, porque en Formulario solo usamos la funcion del custom hook de useMoneda llamada Seleccionar que muestra la interfaz para elegir el tipo de moneda, y crearemos otro custom hook que muestre las opciones de las criptomonedas.

----------------------------------------------------------------------------------------

1- creamos un segundo custom hook llamado useCriptomoneda.js, copiamos el codigo del primer hook y se lo pegamos a este nuevo hook, cambiaremos unas cosas. Ahora, este custom hook tomara las opciones d elas criptomonedas desde una API.(v133)

2- ya creado este nuevo hook, lo importamos al Formulario y lo usamos antes del return asi.

	const [criptomoneda, SelectCripto] = useCriptomoneda("Elige tu Criptomoneda","");

aqui le indicamos a formulario.js que usaremos useCriptomoneda haciendo uso del state que llamaremos criptomoneda y de la funcion del hook que pinta la interfaz llamada SelectCripto, e inicialmente le pasamos un mensaje y como seleccion inicial del usuario ponemos un string vacio(v133)

3- para utilizar este nuevo hook pues ponemos despues de la funcion Seleccionar del primer hook la funcion SelectCripto de nuestro nuevo hook.

4- La API de las criptomonedas esta en este enlace:

        https://min-api.cryptocompare.com/documentation?key=Toplists&cat=TopTotalMktCapEndpointFull

entramos aqui y damos click en execute call y nos sacara el link de las 10 criptomonedas mas usadas que son las que queremos mostrar en nuestra APP.

-------------------------------------------------------------------------------------------

1- vamos a pasarle las criptomonedas al custom hook de criptomonedas desde la API, para ello importamos en nuestro Formulario useEffect, recordar que con el hook useEffect podremos ejecutar código cada vez que nuestro componente se renderice, las dependencias [] de este useEffect las dejamos vacias para que se ejecute una sola vez, aqui en el useEffect es donde hacemos el llamado a la API una vez este cargado el formulario,(v134)

2- dentro de useEffect creamos una funcion llamada consultarAPI()  y en esta funcion con async-await consultamos los datos de la url que obtuvimos de la API.

3- como habiamos instalado axios, lo utilizamos para ejecutar esta consulta y es más sencillo,pues solo se pone esto:

                const resultado= await axios.get(url)

y para ver los datos puedo poner un console.log(resultado) para probar si todo va bien, despues se manda llamar la funcion consultarAPI para que se ejecute la consulta y poder ver los resultados en consola,(v134)

4- veremos que la consulta a la API nos arroja un objeto con mucha informacion dentro, una de estas informaciones es otro objeto data que es el que tiene la informacion de las criptomonedas, ara ve solo esta informacion pues ponemos  resultado.data.Data.

5- cada una de las criptomonedas tiene un CoinInfo con la informacion de cada criptomoneda, esta es la que necesitamos, entonces creamos un state para guardar alli ese listado de criptomonedas,lo creamos aqui en nuestro Formulario.js. La respuesta de la consulta viene como un array,entonces el state sera en principio un array vacio. Entonces en la consulta, utilizamos la funcion de este state para guardar en él el resultado de la consulta asi:

			guardarCriptomonedas(resultado.data.Data);


podemos ir a nuestro formulario en components y en el state ver como se guardaran los resultados d ela consulta.

6-por lo tanto, como ya tenemos guardado en este state la lista de criptomonedas, le pasamos este state al hook de useCriptomoneda como tercera opcion en la linea donde lo estamos usando,osea:

const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '',listacripto);

7- ahora, si vamos al hook de useCriptomoneda,vemos que habiamos puesto como tercer prop "opciones", esta prop sera la tercera opcion que es el listado de criptomonedas que le estamos pasando,si hacemoscosole.log(opciones) pdemos ver en consola el listado de criptomonedas,es lo mismo de los componentes, cuando pasamos via props los parametros.

----------------------------------------------------------------------------------------

1- ya tenemos la lista de criptomonedas que viene de la API en nuestro hook de useCriptomonedas, ahora para mostrar esta lista en el select de useCriptomonedas vamos a usar solo tres propiedades de esta lista, seran las propiedades fullName,Id y Name(que es el nombre de tres caracteres,este se necesita para realizar la cotizacion).(v135)

2- el codigo en el select queda asi:

        <Select onChange={(e) => actualizarState(e.target.value)} value={state}>
			<option value="">-Seleccione-</option>
			{opciones.map((opcion) => (
				<option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>
					{opcion.CoinInfo.FullName}
				</option>
			))}
	</Select>

si vamos a components en Formulario veremos los dos states de moneda y criptomoneda y cuando seleccionamos lo que queremos ver, estos valores se almacenana en estos states.

Ahora, cuando presionemos calcular debemos agregar un evento al formulario y realizar una consulta para hacer el calculo.(v135)

--------------------------------------------------------------------------------------------


1. vamos a crear en Formulario.js tro state para el error y asi poder realizar la validacion.(v136)

2- creamos en el form el evento onsubmit que llamara a una funcion la cual realizara la cotizacion de la moneda. Para validar si los campos del formulario estan llenos lo hacemos con un if y validamos los state que son los que guardan los valores introducidos por el usuario,osea stet y criptomoneda.

3- si no estan llenos el state de error pasa a ser true y nos sacara un mensaje, si si estan llenos pasara la validacion y no saca el mensaje de error. Probamos este codigo haciendo submit del formulario sin llenar los campos y debe de sacar el error.(v136)

4- ahora, para el mensaje de error creamos un componente y le damos estilos con style components.(v137)

---------------------------------------------------------------------------------------

1- ahora, ya creados los states que nos ayudan a capturar lo que el usuario ingresa en el formulario(son los states de los hooks que creamos) y sirven para realizar la validacion del mismo, debemos crear dos states mas en App.js, que lo que haran sera tomar esos valores de los hooks y realizamos el calculo de la cotizacion,(v138)

2- creamos dos states en App.js llamados moneda y criptomoneda, se los pasamos al componente Formulario  via props por medio de las funciones de cada state, y en el propio componente Formulario.js pasamos estas funciones en la parte despues d ela validacion del formulario y como prps llevaran los states de los hooks,que son state y criptomoneda. Verificamos que esto funcione al colocar valores en el formulario y al dar submit en components debemos ver en App los dos states y deben de estar guardando esos valores.(v138).

3- ya comprobado que estos datos se guardan en estos nuevos states de App.js, tomamos estos states de moneda y criptomoneda que son los que tienen los datos y realizamos los calculos de la cotizacion, para esto usamos un useEffect pues los states cambian(v138)

4- el use Effect va revisando en sus [] si los states de moneda y criptomoneda van cambiando, entonces s e los pasamos, y debemos evitar que se active en un primer momento pues al inicio no tienen nada,esto lo podemos hacer evaluando el state con un if(v138)

---------------------------------------------------------------------------------------------

1- una vez ya tengamos una moneda en el useEffect quiere decir que ya podemos hacer una cotizacion, y esta cotizacion se hace mediante una consulta a la API, pues esta es la que tiene los datos del valor de cada moneda y criptomoneda, para realizar esta consulta utilizamos como antes Axios, por lo que lo importamos en App.js(v139)

2- entonces en el useEffect hacemos la consulta a la API para la cotizacion, primero creamos una const para la url y estara dentro de templates string.

3- en la pagina d ela API en la parte de Price, utilizaremos como end-point la tercera opcion "Multiple symbols full data" pues tiene toda la informacion sobre los calculos a realizar,por lo que copiamos esta url y la pegamos en la constante que creamos con template strings. La url se hace con template string para poder reemplazar en esta url donde esta fsyms por los valores de moneda y criptomoneda asi:  ${moneda} ${criptomoneda}(v139)

4- ahora, con axios usamos el metodo get(axios es get por defecto pero el profe lo pone para especificarlo), y realizamos la consulta a la API.

NOTA: EN EL EFFECT ES RECOMENDABLE QUE TODO ESTE DENTRO DE UNA FUNCION PARA PONER ASYNC-AWAIT(V139)

5- ahora, si vemos en un console.log() la respuesta a la consulta, vemos que nos trae un objeto con mucha informacion, en la seccion de Display sacara el simbolo de acuerdo a la criptomoneda que consultamos, para que nos traiga dinamicamente este simbolo segun lo que el usuario consulte se puede poner asi:

				console.log(resultado.data.DISPLAY[criptomoneda][moneda])


------------------------------------------------------------------------------------------------

1- ahora, este resultado debemos guardarlo en un state nuevo para poderlo mostrar,entonces creamos en App.js otro state llamado resultado. Como la respuesta es un objeto,iniciamos este state como un objeto vacio. La funcion de este state sera la que guarde en el state el resultado de la consulta a la API.(v140)

2- ahora, creamos un componente llamado Cotizacion.js que sera el que muestre este resultado.

3- LISTO, POR ULTIMO LE DAMOS ESTILOS A ESTE COMPONENTE QUE MUESTRA LOS RESULTADOS, TAMBIEN LE PONEMOS UN SPINNER.PARA QUE S EMUESTRE EL SPINNER CREAMOS OTRO STATE EN APP.JS CON UN VALOR INICIAL DE FALSE.





*/
