import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { DateFormatter } from 'react-format/lib/Date';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function Transacciones() {
    const urlBase = "http://localhost:8080/transaccion/todas";

    const[transaccion,setTransaccion] = useState([]);

    useEffect(()=>{
        cargarProductos();
    },[]);

    const cargarProductos  = async () => {
        const resultado = await axios.get(urlBase);
        setTransaccion(resultado.data);
        console.log(resultado.data);
        
    }
    const productosVendidos = async(event) => {
        event.preventDefault();
        const resultado = await axios.get("http://localhost:8080/producto/vendidos");
        //setProducto(resultado.data);
        console.log(resultado.data);
    }
    const productosDisponibles = async(event) => {
        event.preventDefault();
        const resultado = await axios.get("http://localhost:8080/producto/disponibles");
        //setProducto(resultado.data);
        console.log(resultado.data);
    }
    const transaccionTipo = async(tipo) =>{
        console.log({tipo})
        const resultado = await axios.post("http://localhost:8080/transaccion/tipo",{tipo});
        setTransaccion(resultado.data);
        console.log(resultado.data);

    }


  return (
    <div className='container'style={{marginTop:100}}>
        <div className='container text-center' >
            <h3>Transacciones</h3>
         </div>
         <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Filtrar
          </a>
          <ul class="dropdown-menu">
          <li><a class="dropdown-item" onClick={cargarProductos} style={{ cursor: 'pointer' }}>Todos</a></li>
          <li><hr class="dropdown-divider"/></li>
          <li><a class="dropdown-item"  onClick={() => transaccionTipo('VENTA')}  style={{ cursor: 'pointer' }}>Ventas</a></li>
            
            <li><a class="dropdown-item" onClick={() => transaccionTipo('COMPRA')} style={{ cursor: 'pointer' }}>Compras</a></li>
            <li><a class="dropdown-item" onClick={() => transaccionTipo('ENVIO')} style={{ cursor: 'pointer' }}>Envios</a></li>
            
            <li><a class="dropdown-item" onClick={() => transaccionTipo('PRESTAMO')} style={{ cursor: 'pointer' }}>Prestamos</a></li>
            <li><a class="dropdown-item" onClick={() => transaccionTipo('GASTO')} style={{ cursor: 'pointer' }}>Gastos</a></li>
            
            <li><a class="dropdown-item" onClick={() => transaccionTipo('INGRESO')} style={{ cursor: 'pointer' }}>Ingresos</a></li>
            <li><a class="dropdown-item" onClick={() => transaccionTipo('PAGOPRESTAMO')} style={{ cursor: 'pointer' }}>PagosPrestamos</a></li>
          </ul>
        </li>
      </ul>

    </div>
  </div>
</nav>
            <table className="table table-striped table-hover align-middle">
        <thead className='table-dark'>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Fecha</th>
            <th scope="col">Valor</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Tipo</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
        {transaccion.map((transaccion, indice) => (
                        <tr key={indice}>
                            <th scope="row">{transaccion.id}</th>
                            <td>{transaccion.fecha}</td>
                            <td> <NumericFormat value = 
                                {transaccion.valor}
                                displayType={'text'}
                                thousandSeparator=","
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale/>
                                </td>

                            <td>
                            {transaccion.descripcion}
                           </td>
                                <td>
                               
                                {transaccion.tipo}
                               
                                </td>
                                
                        </tr>
                    ))}
           
         
           
        </tbody>
        </table>    
    </div>
   
  )
}
