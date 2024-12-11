import axios from 'axios';
import React, { useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';

export default function AgregarPrestamo() {
    const urlBase = "https://backend-api-eternal-app.onrender.com/prestamo";
    let navegacion = useNavigate();

  
    const [prestamo,setPrestamo] = useState([{prestamoNombre : '',prestado : '',fecha:'',valor:''}])

    const{prestamoNombre,prestado,fecha,valor} = prestamo;




    const handleInputChange = (event) => {
       setPrestamo({...prestamo,[event.target.name]:event.target.value})
      };
      const handleSubmit = async (event) => {

        event.preventDefault();
        console.log('Datos enviados:', prestado);
        try {
            const response = await axios.post(urlBase, prestamo);
            console.log('Respuesta del servidor:', response.data);
            navegacion('/prestamos'); 
        } catch (error) {
            console.error('Error al agregar el prestamo:', error);
        }
    };
  return (
    <div className='container' style={{marginTop : 100}}>
    <h3> Agregar prestamo</h3>
    <form onSubmit={handleSubmit}>

    <div  className="mb-3">
      <label htmlFor={'prestamoNombre'} className="form-label">Nombre:</label>
      <input
        required = "true"
        type="text"
        className="form-control"
        id={'prestamoNombren'}
        name="prestamoNombre"
        value={prestamo.prestamoNombre}
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
        value={prestamo.valor}
        onChange={(event) => handleInputChange(event)}
      />

       <label htmlFor={'prestado'} className="form-label">Seleccione:</label>
      <select   className="form-select"
                        aria-label="Default select example"
                        id={'prestado'}
                        name="prestado"
                        value={prestamo.prestado}
                        onChange={handleInputChange}
                    >
        <option selected>Tipo de prestamo</option>
        <option value="true">Presté</option>
        <option value="false">Me prestaron</option>
      </select>
      <label htmlFor="fecha" className="form-label">Fecha</label>
        <input
          required = "true"
          type="date"
          className="form-control"
          id={'fecha'}
          name="fecha"
          value={prestamo.fecha}
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
