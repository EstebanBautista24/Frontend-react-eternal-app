import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { useNavigate, useParams } from 'react-router-dom';

export default function AgregarPagoPrestamo() {
    const urlBase = "https://backend-api-eternal-app.onrender.com/prestamo/todos";
    const {id} = useParams();
    let navegacion = useNavigate();
    const[prestamo,setPrestamo] = useState([]);

    const [fecha, setFecha] = useState('');

    const [pagoPrestamo, setPagoPrestamo] = useState({ valor: '' });
    

    useEffect(()=>{
      cargarPrestamos();
  },[]);

  const cargarPrestamos  = async () => {
      const resultado = await axios.get(`https://backend-api-eternal-app.onrender.com/prestamo/${id}`);
      setPrestamo(resultado.data);
      console.log(resultado.data);
      
  }
    

    const handleInputChange = (event) => {
      setPagoPrestamo({...pagoPrestamo,[event.target.name]:event.target.value})
      };
      const handleFechaChange = (event) => {
        setFecha(event.target.value);
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const pago= {
            fecha: fecha,
            valor : pagoPrestamo.valor
        }
  
       
        console.log(pago)
        try {
            const response = await axios.post(`https://backend-api-eternal-app.onrender.com/pagoPrestamo/${id}`, pago);
            console.log('Respuesta del servidor:', response.data);
            navegacion('/prestamos'); // Redirige a la lista de productos o a la página que desees
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };
  return (
    <div className='container' style={{marginTop : 100}}>
        <h3> Agregar pago prestamo</h3>
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
            readOnly
          />
           <label htmlFor={'valor'} className="form-label">Valor pago</label>
           <NumericFormat
            prefix={'$'}
            thousandSeparator
            required = "true"
            step="any"
            className="form-control"
            id={'valor'}
            name="valor"
            value={pagoPrestamo.valor}
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
        Agregar pago
      </button>
    </form>
    </div>
  )
}
