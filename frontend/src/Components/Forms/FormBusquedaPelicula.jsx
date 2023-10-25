import React from 'react'

const FormBusquedaPelicula = () => {
    return (
        <div>
            <h1>Reserva una pelicula en tu cine más cercano</h1>

            <div className='formularioBusqueda'>
                <input type="text" placeholder='Seleccione su ubicación' />
                <input type="text"  placeholder='Seleccione la pelicula'/>
            </div>
            <button>Buscar</button>
        </div>
    )
}

export default FormBusquedaPelicula