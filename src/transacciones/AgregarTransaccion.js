import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { useNavigate, useParams } from 'react-router-dom';

export default function AgregarTransaccion() {
    const urlBase = "http://localhost:8080/transaccion";
    let navegacion = useNavigate();

  
    const [transaccion,setTransaccion] = useState([{descripcion : '',valor : '',tipo:'',fecha:''}])

    const{descripcion,valor,tipo,fecha} = transaccion;




    const handleInputChange = (event) => {
       setTransaccion({...transaccion,[event.target.name]:event.target.value})
      };
      const handleSubmit = async (event) => {

        event.preventDefault();
        console.log('Datos enviados:', transaccion);
        try {
            const response = await axios.post(urlBase, transaccion);
            console.log('Respuesta del servidor:', response.data);
            navegacion('/transacciones'); 
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };
  return (
    <div className='container' style={{marginTop : 100}}>
    <h3> Agregar transaccion</h3>
    <form onSubmit={handleSubmit}>

    <div  className="mb-3">
      <label htmlFor={'descripcion'} className="form-label">Descripcion</label>
      <input
        required = "true"
        type="text"
        className="form-control"
        id={'descripcion'}
        name="descripcion"
        value={transaccion.descripcion}
        onChange={(event) => handleInputChange(event)}
      />
      <label htmlFor={'valor'} className="form-label">Valor</label>
      <NumericFormat
            prefix={'$'}
            thousandSeparator
        required = "true"
        step="any"
        className="form-control"
        id={'valor'}
        name="valor"
        value={transaccion.valor}
        onChange={(event) => handleInputChange(event)}
      />

       <label htmlFor={'precioEnvio'} className="form-label">Seleccione tipo de transaccion</label>
      <select   className="form-select"
                        aria-label="Default select example"
                        id={'tipo'}
                        name="tipo"
                        value={transaccion.tipo}
                        onChange={handleInputChange}
                    >
        <option selected>Tipo de transaccion</option>
        <option value="INGRESO">Ingreso</option>
        <option value="GASTO">Gasto</option>
      </select>
      <label htmlFor="fecha" className="form-label">Fecha</label>
        <input
          required = "true"
          type="date"
          className="form-control"
          id={'fecha'}
          name="fecha"
          value={transaccion.fecha}
          onChange={handleInputChange}
        />
    </div>
  

  <button type="submit" className="btn btn-primary">
    Guardar
  </button>
</form>
</div>
  )
}
