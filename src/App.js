import { BrowserRouter, Route, Routes } from "react-router-dom";
import AgregarPedido from "./producto/AgregarPedido";
import ListadoProductos from "./producto/ListadoProductos";
import Navegacion from "./plantilla/Navegacion";
import EditarProducto from "./producto/EditarProducto";
import VenderProducto from "./producto/VenderProducto";
import Dashboard from "./dashboard/Dashboard";
import Transacciones from "./transacciones/Transacciones";
import AgregarTransaccion from "./transacciones/AgregarTransaccion";
import ListarPrestamos from "./prestamos/ListarPrestamos";
import AgregarPrestamo from "./prestamos/AgregarPrestamo";
import AgregarPagoPrestamo from "./prestamos/AgregarPagoPrestamo";
import EditarPrestamo from "./prestamos/EditarPrestamo";

function App() {
  return (
    <div className="container">
    <BrowserRouter> 
    <Navegacion/>
    <Routes>
      <Route exact path='/productos' element ={<ListadoProductos/>}/>
      <Route exact path='/agregarPedido' element ={<AgregarPedido/>}/>
      <Route exact path='/editarProducto/:id' element = {<EditarProducto/>}/>
      <Route exact path='vender/:id' element = {<VenderProducto/>}/>
      <Route exact path = '/' element = {<Dashboard/>}/>
      <Route exact path = '/transacciones' element = {<Transacciones  />}/>
      <Route exact path = '/agregarTransaccion' element = {<AgregarTransaccion/>}/>
      <Route exact path = '/prestamos' element = {<ListarPrestamos/>}/>
      <Route exact path = '/agregarPrestamo' element = {<AgregarPrestamo/>}/>
      <Route exact path='/pagoPrestamo/:id' element = {<AgregarPagoPrestamo/>}/>
      <Route exact path='editarPrestamo/:id' element = {<EditarPrestamo/>}/>
    </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
