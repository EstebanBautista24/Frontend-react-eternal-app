import axios, { Axios } from 'axios';
import React, { useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';

export default function 
() {
  
    let navegacion = useNavigate();
    const [productos, setCampos] = useState([{ nombre: '', precio: '', precioEnvio: '' }]);
    const [fecha, setFecha] = useState('');
    
    const handleAgregarCampo = () => {
      setCampos([...productos, { nombre: '', precio: '', precioEnvio: '' }]);
    };
  
    const handleInputChange = (index, event) => {
      const { name, value } = event.target;
      const nuevosCampos = [...productos];
      nuevosCampos[index][name] = value;
      setCampos(nuevosCampos);
    };
  
    const handleFechaChange = (event) => {
      setFecha(event.target.value);
    };
  
    const calcularTotal = () => {
      return productos.reduce((total, campo) => {
        const precio = parseFloat(campo.precio) || 0;
        const precioEnvio = parseFloat(campo.precioEnvio) || 0;
        return total + precio + precioEnvio;
      }, 0);
    };
    const handleEliminarCampo = (index) => {
      const nuevosCampos = [...productos];
      nuevosCampos.splice(index, 1);
      setCampos(nuevosCampos);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const totalPedido = calcularTotal();
      const pedido = {
        valor: totalPedido,
        fecha: fecha,
        productos: productos
      }; 
      const urlBase = "https://backend-api-eternal-app.onrender.com/pedido";
      await axios.post(urlBase,pedido);
      navegacion("/productos")
   
    };

  return (
    <div className='container'>
<div className='container text-center' style={{marginTop:100}}>
   <h3>Agregar pedido</h3>
</div>
<form onSubmit={handleSubmit}>
      {productos.map((productos, index) => (
        <div key={index} className="mb-3">
          <label htmlFor={`nombre-${index}`} className="form-label">Nombre</label>
          <input
            required = "true"
            type="text"
            className="form-control"
            id={`nombre-${index}`}
            name="nombre"
            value={productos.nombre}
            onChange={(event) => handleInputChange(index, event)}
          />
           <label htmlFor={`precio-${index}`} className="form-label">Precio</label>
          
          <NumericFormat 
              value={productos.precio}
              prefix={'$'}
           thousandSeparator
            required = "true"
            step="any"
            className="form-control"
            id={`precio-${index}`}
            name="precio"
        
            onValueChange={(values) => handleInputChange(index, { target: { name: 'precio', value: values.value } })}
          />
          
          <label htmlFor={`precioEnvio-${index}`} className="form-label">Precio Envío</label>
          <NumericFormat
            prefix={'$'}
            thousandSeparator
            required = "true"
            step="any"
            className="form-control"
            id={`precioEnvio-${index}`}
            name="precioEnvio"
            value={productos.precioEnvio}
            onValueChange={(values) => handleInputChange(index, { target: { name: 'precioEnvio', value: values.value } })}
          />
                <button type="button" className="btn btn-danger mt-2" onClick={() => handleEliminarCampo(index)}>
              Eliminar
     </button>
        </div>
      ))} 
      <button type="button" className="btn btn-secondary mb-3" onClick={handleAgregarCampo}>
        Agregar Campo
      </button>

      <div className="mb-3">
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
      <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label">Total del Pedido</label>
        <NumericFormat
            prefix={'$'}
            thousandSeparator
          required = "true"
          type="text"
          className="form-control"
          value={calcularTotal()}
          readOnly
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Finalizar pedido
      </button>
    </form>
    </div>
  )
}
