import React from 'react'
import { Link } from 'react-router-dom'

export default function Navegacion() {
  return (
    <div classNameName='container'>
        <nav className="navbar navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Eternal Games</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header d-flex justify-content-center">
        <h5 className="offcanvas-title   " id="offcanvasDarkNavbarLabel">Eternal Games</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-center flex-grow-1 pe-3 d-flex">
  
          <li className="nav-item mx-auto" style={{padding:10}}>
            <Link className="nav-link" to="/">Dashboard</Link>
          </li>
        
          <li class="nav-item dropdown mx-auto" style={{padding:10}}>
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Productos
            </a>
            <ul class="dropdown-menu mx-auto">
              <li><Link class="dropdown-item " to="/productos">Ver productos</Link></li>
              <li><Link class="dropdown-item mx-auto" to="/agregarPedido">Agregar pedido</Link></li>
              
            </ul>
          </li>
          <li class="nav-item dropdown mx-auto" style={{padding:10}}>
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Transacciones
            </a>
            <ul class="dropdown-menu mx-auto">
              <li><Link class="dropdown-item " to="/transacciones">Ver transacciones</Link></li>
              <li><Link class="dropdown-item mx-auto" to="/agregarTransaccion">Agregar transacciones</Link></li>
              
            </ul>
          </li>
          <li class="nav-item dropdown mx-auto" style={{padding:10}}>
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Prestamos
            </a>
            <ul class="dropdown-menu mx-auto">
              <li><Link class="dropdown-item " to="/prestamos">Ver prestamos</Link></li>
              <li><Link class="dropdown-item mx-auto" to="/agregarPrestamo">Agregar prestamos</Link></li>
              
            </ul>
          </li>
          
          
        </ul>
       
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}
