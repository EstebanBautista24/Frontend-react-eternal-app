import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { DateFormatter } from 'react-format/lib/Date';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListadoProductos() {
    const urlBase = "https://backend-api-eternal-app.onrender.com/producto/todos";

    const[productos,setProducto] = useState([]);
    const[busqueda,setBusqueda] = useState([""])
    const[Tablaproductos,setTablaProducto] = useState([]);
    useEffect(()=>{
        cargarProductos();
    },[]);

    const filtrar = (busqueda) =>{
        var resultadoBusqueda = Tablaproductos.filter((productos =>{
          if(productos.nombre.toString().toLowerCase().includes(busqueda.toLowerCase())){
            return productos
          }
        }))
        setProducto(resultadoBusqueda);

    }

    const handleInputChange = (event) => {
      console.log(event.target.value)
        setBusqueda(event.target.value);
        filtrar(event.target.value);
     }

    const cargarProductos  = async () => {
        const resultado = await axios.get(urlBase);
        setProducto(resultado.data);
        setTablaProducto(resultado.data)
        console.log(resultado.data);
        
    }
    const productosVendidos = async(event) => {
        event.preventDefault();
        const resultado = await axios.get("https://backend-api-eternal-app.onrender.com/producto/vendidos");
        setProducto(resultado.data);
        console.log(resultado.data);
    }
    const productosDisponibles = async(event) => {
        event.preventDefault();
        const resultado = await axios.get("https://backend-api-eternal-app.onrender.com/producto/disponibles");
        setProducto(resultado.data);
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
          <li><a class="dropdown-item" onClick={cargarProductos} style={{ cursor: 'pointer' }}>Todos</a></li>
          <li><hr class="dropdown-divider"/></li>
          <li><a class="dropdown-item" onClick={productosVendidos} style={{ cursor: 'pointer' }}>Vendidos</a></li>
            
            <li><a class="dropdown-item" onClick={productosDisponibles} style={{ cursor: 'pointer' }}>Disponibles</a></li>
            

          </ul>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Buscar Producto" aria-label="Buscar Producto" value={busqueda}
        onChange={handleInputChange}/>
      </form>
    </div>
  </div>
</nav>
            <table className="table table-striped table-hover align-middle">
        <thead className='table-dark'>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Valor producto</th>
            <th scope="col">Valor envio</th>
            <th scope="col">Valor total</th>
            <th scope="col">Fecha venta</th>
            <th scope="col">Valor venta</th>
            <th scope="col">Ganancia</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
        {productos.map((producto, indice) => (
                        <tr key={indice}>
                            <th scope="row">{producto.productoId}</th>
                            <td>{producto.nombre}</td>
                            <td> <NumericFormat value = 
                                {producto.valor}
                                displayType={'text'}
                                thousandSeparator=","
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale/>
                                </td>
                            <td>
                            <NumericFormat value = 
                                {producto.precioEnvio}
                                displayType={'text'}
                                thousandSeparator=","
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale/></td>
                            <td>
                            <NumericFormat value = 
                                {producto.total}
                                displayType={'text'}
                                thousandSeparator=","
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale/></td>
                                <td>
                               
                                {producto.fechaVenta}
                               
                                </td>
                                <td>
                               
                                {producto.valorVenta !== null ? (
                                        <div>
                                            <NumericFormat 
                                            value={producto.valorVenta} 
                                            displayType={'text'} 
                                            thousandSeparator="," 
                                            prefix={'$'} 
                                            decimalScale={2} 
                                            fixedDecimalScale
                                            />
                                            <Link to={`/vender/${producto.productoId}`} className="bi bi-pencil-fill" style={{marginLeft:10}}></Link>
                                        </div>
                                ) : (
                                    <Link to={`/vender/${producto.productoId}`}
                                className='btn btn-primary btn-sm'>Vender</Link>
                                
                                )}
                                
                                </td>
                                
                                <td>
                                {producto.valorVenta !== null ? (
                                    <NumericFormat 
                                        value={producto.ganancia} 
                                        displayType={'text'} 
                                        thousandSeparator="," 
                                        prefix={'$'} 
                                        decimalScale={2} 
                                        fixedDecimalScale
                                    />
                                ) : (
                                    ' '
                                )}
                                </td>
                            <td className='text-center'>
                                <Link to={`/editarProducto/${producto.productoId}`}
                                className='btn btn-warning btn-sm'>Editar</Link>
                            </td>
                        </tr>
                    ))}
           
         
           
        </tbody>
        </table>    
    </div>
   
  )
}
