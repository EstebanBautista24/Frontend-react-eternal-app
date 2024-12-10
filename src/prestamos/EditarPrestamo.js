import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarPrestamo() {
    const urlBase = "http://localhost:8080/prestamo/todos";
    const {id} = useParams();
    let navegacion = useNavigate();
    const[prestamo,setPrestamo] = useState([]);

    const [fecha, setFecha] = useState('');

    const [actualizar, setActualizar] = useState({ valor: '' });
    

    useEffect(()=>{
      cargarPrestamos();
  },[]);

  const cargarPrestamos  = async () => {
      const resultado = await axios.get(`http://localhost:8080/prestamo/${id}`);
      setPrestamo(resultado.data);
      console.log(resultado.data);
      
  }
    

    const handleInputChange = (event) => {
      setActualizar({...actualizar,[event.target.name]:event.target.value})
      };
      const handleFechaChange = (event) => {
        setFecha(event.target.value);
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const actualizarPrestamo= {
            fecha: fecha,
            prestamoValor : actualizar.deudaTotal
        }
  
       
        console.log(actualizarPrestamo)
        try {
            const response = await axios.put(`http://localhost:8080/prestamo/${id}`, actualizarPrestamo);
            console.log('Respuesta del servidor:', response.data);
            navegacion('/prestamos'); // Redirige a la lista de productos o a la página que desees
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };
  return (
    <div className='container' style={{marginTop : 100}}>
        <h3> Editar prestamo</h3>
        <form onSubmit={handleSubmit}>

        <div  className="mb-3">
          <label htmlFor="disabledTextInput" className="form-label">Nombre</label>
          <input
            required = "true"
            type="text"
            className="form-control"
            id={'prestamoNombre'}
            name="prestamoNombre"
            value={prestamo.prestamoNombre}
            readOnly
          />
          <label htmlFor="disabledTextInput" className="form-label">Valor prestamo</label>
          <NumericFormat
            prefix={'$'}
            thousandSeparator
           
            required = "true"
            step="any"
            className="form-control"
            id={'prestamoValor'}
            name="prestamoValor"
            value={prestamo.prestamoValor}
            readOnly

           
          />
          <label htmlFor={'deudaTotal'} className="form-label">Deuda total</label>
          <NumericFormat
            prefix={'$'}
            thousandSeparator
            required = "true"
            step="any"
            className="form-control"
            id={'deudaTotal'}
            name="deudaTotal"
            value={prestamo.deudaTotal}
            onChange={(event) => handleInputChange(event)}
            readOnly
          />
           <label htmlFor={'deudaTotal'} className="form-label">Nueva deuda</label>
           <NumericFormat
            prefix={'$'}
            thousandSeparator
            required = "true"
            step="any"
            className="form-control"
            id={'deudaTotal'}
            name="deudaTotal"
            value={actualizar.deudaTotal}
            onChange={(event) => handleInputChange(event)}

          />


        <label htmlFor="fecha" className="form-label">Fecha</label>
        <input
          required = "true"
          type="date"
          className="form-control"
          id="fecha"
          value={fecha}
          onChange={handleFechaChange}
        />

        </div>
      

      <button type="submit" className="btn btn-primary">
        Actualizar
      </button>
    </form>
    </div>
  )
}
