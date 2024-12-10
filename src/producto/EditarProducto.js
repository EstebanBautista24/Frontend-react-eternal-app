import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarProducto() {
    const urlBase = "http://localhost:8080/producto";
    const {id} = useParams();
    let navegacion = useNavigate();
    const [productos, setCampos] = useState([{ nombre: '', valor: '', precioEnvio: '' }]);
    const{nombre,valor,precioEnvio} = productos;

    useEffect(()=>{
        cargarProducto()
    },[])

    const cargarProducto = async () =>{
        const resultado = await axios.get(`${urlBase}/${id}`)
        setCampos(resultado.data);
        console.log(resultado.data);
    }

    const handleInputChange = (event) => {
       setCampos({...productos,[event.target.name]:event.target.value})
      };
      const handleSubmit = async (event) => {

        event.preventDefault();
        console.log('Datos enviados:', productos);
        try {
            const response = await axios.put(`${urlBase}/${id}`, productos);
            console.log('Respuesta del servidor:', response.data);
            navegacion('/productos'); // Redirige a la lista de productos o a la página que desees
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };
  return (
    <div className='container' style={{marginTop : 100}}>
        <h3> Editar producto</h3>
        <form onSubmit={handleSubmit}>

        <div  className="mb-3">
          <label htmlFor={'nombre'} className="form-label">Nombre</label>
          <input
            required = "true"
            type="text"
            className="form-control"
            id={'nombre'}
            name="nombre"
            value={productos.nombre}
            onChange={(event) => handleInputChange(event)}
          />
          <label htmlFor={'valor'} className="form-label">Precio</label>
          <NumericFormat
            prefix={'$'}
            thousandSeparator
            required = "true"
            step="any"
            className="form-control"
            id={'valor'}
            name="valor"
            value={productos.valor}
            onChange={(event) => handleInputChange(event)}
          />
          <label htmlFor={'precioEnvio'} className="form-label">Precio Envío</label>
          <NumericFormat
            prefix={'$'}
            thousandSeparator
            required = "true"
            step="any"
            className="form-control"
            id={'precioEnvio'}
            name="precioEnvio"
            value={productos.precioEnvio}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
      

      <button type="submit" className="btn btn-primary">
        Guardar
      </button>
    </form>
    </div>
  )
}
