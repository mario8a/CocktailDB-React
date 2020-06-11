import React, {createContext, useEffect, useState} from 'react'
import axios from 'axios';

//crear context
export const ModalContext = createContext();

const ModalProvider = (props) => {

    //state del provider
    //Se inicia como null porqueee pues no ninguna seleccionada al inicio hasta que el user selecciona una
    const [idreceta, guardarIdReceta] = useState(null);
    const [receta, guardarReceta] = useState({});

    //Una vez que tenemos una receta, llamar la api
    useEffect(() => {
        const obtenerReceta = async () => {

            //si no hay ninguna receta
            if(!idreceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const resultado = await axios.get(url);
            guardarReceta(resultado.data.drinks[0]);
        }
        obtenerReceta();
    }, [idreceta])

    return ( 
        <ModalContext.Provider
            value={{
                guardarIdReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;