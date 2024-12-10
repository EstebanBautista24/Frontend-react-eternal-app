
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { DateFormatter } from 'react-format/lib/Date';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListarPrestamos() {
    const urlBase = "http://localhost:8080/prestamo/todos";

    const[prestamo,setPrestamo] = useState([]);

    useEffect(()=>{
        cargarPrestamos();
    },[]);

    const cargarPrestamos  = async () => {
        const resultado = await axios.get(urlBase);
        setPrestamo(resultado.data);
        console.log(resultado.data);
        
    }
    const prestamosInactivos = async(event) => {
        event.preventDefault();
        const resultado = await axios.get("http://localhost:8080/prestamo/inactivos");
        setPrestamo(resultado.data);
        console.log(resultado.data);
    }
    const prestamosActivos = async(event) => {
        event.preventDefault();
        const resultado = await axios.get("http://localhost:8080/prestamo/activos");
        setPrestamo(resultado.data);
        console.log(resultado.data);
    }

  return (
    <div className='container'style={{marginTop:100}}>
        <div className='container text-center' >
            <h3>Productos</h3>
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
          <li><a class="dropdown-item" onClick={cargarPrestamos} style={{ cursor: 'pointer' }}>Todos</a></li>
          <li><hr class="dropdown-divider"/></li>
          <li><a class="dropdown-item" onClick={prestamosActivos} style={{ cursor: 'pointer' }}>Activos</a></li>
            
            <li><a class="dropdown-item" onClick={prestamosInactivos} style={{ cursor: 'pointer' }}>Finalizados</a></li>
            

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
            <th scope="col">Nombre prestamo</th>
            <th scope="col">Prestado</th>
            <th scope="col">Valor prestamo</th>
            <th scope="col">Deuda total</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
        {prestamo.map((prestamo, indice) => (
                        <tr key={indice}>
                            <th scope="row">{prestamo.prestamoId}</th>
                            <td> {prestamo.fecha} </td>
                            <td>{prestamo.prestamoNombre}</td>
                            <td>{prestamo.prestado ? "Presté" : "Me prestaron"}</td>
                            <td>
                            <NumericFormat value = 
                                {prestamo.prestamoValor}
                                displayType={'text'}
                                thousandSeparator=","
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale/>
                                   <Link to={`/editarPrestamo/${prestamo.prestamoId}`} className="bi bi-pencil-fill" style={{marginLeft:10}}></Link>
                                </td>
                                <td>      
                                <NumericFormat value = 
                                {prestamo.deudaTotal}
                                displayType={'text'}
                                thousandSeparator=","
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale/>
                              
                                </td>
                                <td>
                                {prestamo.estado !== true ? (
                                        <div>
                                           
                                           
                                        </div>
                                ) : (
                                    <Link to={`/pagoPrestamo/${prestamo.prestamoId}`}
                                className='btn btn-primary btn-sm'>Agregar pago</Link>
                                
                                )}
                                
                                </td>
                        </tr>
                    ))}
           
         
           
        </tbody>
        </table>    
    </div>
   
  )
}
