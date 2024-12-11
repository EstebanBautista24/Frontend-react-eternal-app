import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { useNavigate, useParams } from 'react-router-dom';

export default function VenderProducto() {
    const urlBase = "https://backend-api-eternal-app.onrender.com/producto";
    const {id} = useParams();
    let navegacion = useNavigate();
    const [productos, setCampos] = useState([{ nombre: '', valor: '', precioEnvio: '' }]);
    const{nombre,valorProducto,precioEnvio} = productos;
    const [fecha, setFecha] = useState('');

    const [venta, setVenta] = useState({ valor: '' });
    

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
      const handleFechaChange = (event) => {
        setFecha(event.target.value);
      };
      const handleVentaChange = (event) => {
        const { name, value } = event.target;
        setVenta({ ...venta, [name]: value });
    };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const envio = {
            fecha: fecha,
            valor : venta.valor
        }
  
       
        console.log(envio)
        try {
            const response = await axios.post(`https://backend-api-eternal-app.onrender.com/venta/${id}`, envio);
            console.log('Respuesta del servidor:', response.data);
            navegacion('/productos'); // Redirige a la lista de productos o a la página que desees
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };
  return (
    <div className='container' style={{marginTop : 100}}>
        <h3> Vender producto</h3>
        <form onSubmit={handleSubmit}>

        <div  className="mb-3">
          <label htmlFor="disabledTextInput" className="form-label">Nombre</label>
          <input
            required = "true"
            type="text"
            className="form-control"
            id={'nombre'}
            name="nombre"
            value={productos.nombre}
            onChange={(event) => handleInputChange(event)}
            readOnly
          />
          <label htmlFor="disabledTextInput" className="form-label">Precio</label>
          <NumericFormat
            prefix={'$'}
            thousandSeparator
            required = "true"
            step="any"
            className="form-control"
            id={'valor'}
            name="valor"
            value={productos.valor}
            readOnly
            onChange={(event) => handleInputChange(event)}
           
          />
          <label htmlFor={'precioVenta'} className="form-label">Precio venta</label>
          <NumericFormat
            prefix={'$'}
            thousandSeparator
            required = "true"
            step="any"
            className="form-control"
            id={'precioVenta'}
            name="valor"
            value={venta.valor}
            onChange={(event) => handleVentaChange(event)}
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
        Vender
      </button>
    </form>
    </div>
  )
}
