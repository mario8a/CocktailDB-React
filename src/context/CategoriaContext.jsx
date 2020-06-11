import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//Aqui van a fluir los datos y en FOrmulario se estaran consumiendo/ mostrando o  donde quieran mostrar
//crear el context

export const CategoriasContext = createContext();

//provider es donde se encuentran las funiones y state

const CategoriasProvider = (props) => {
    //crear el stste del context
    const [categorias, guardarCategorias] = useState([]);

    //ejecutar llamado a la api
    useEffect(() => {
        const obtenerCategorias = async () =>{
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const categorias = await axios.get(url);

            guardarCategorias(categorias.data.drinks);
        }
        obtenerCategorias();
    }, [])

//todo lo que este dentro de value son los valores disponibles de los demas componentes
    return(
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;