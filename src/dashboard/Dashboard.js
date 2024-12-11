import React, { useEffect, useState } from 'react'
import pgImage from '../resources/pg.png'; 
import axios from 'axios';
import { NumericFormat } from 'react-number-format';

export default function Dashboard() {
  const[balance,setBalance] = useState([]);
  const[ganancia,setGanancia] = useState([]);
  const[gasto,setGasto] = useState([])
  useEffect(()=>{
    cargarProductos();
    cargarVenta();
    cargarGasto();
},[]);
const cargarGasto = async()=>{
  const resultado = await axios.get("https://backend-api-eternal-app.onrender.com/transaccion/gasto")
  setGasto(resultado.data)
}
const cargarVenta = async()=>{
  const resultado = await axios.get("https://backend-api-eternal-app.onrender.com/balance");
  setBalance(resultado.data)
}
const cargarProductos  = async () => {
    const resultado = await axios.get("https://backend-api-eternal-app.onrender.com/venta/gananciaMes");
    setGanancia(resultado.data);
    console.log(resultado.data);
    
}
  return (
    <div className='container' style={{marginTop:100}}>
        <h1 className='text-center' >Dashboard</h1>
        <div className='d-flex justify-content-center' style={{marginTop:50}}>
        <div className="card " style={{width: "40em"}}>
        <div className="d-flex justify-content-center">
            <img src={pgImage} style={{ width: "10em" }} className="card-img-top" alt="..." />
          </div>
        <div className="card-body">
            <h5 className="card-title text-center display-5">Eternal Games</h5>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item fs-4">Dinero disponible:
            <NumericFormat 
                                        value={balance.dineroDisponible}
                                        displayType={'text'} 
                                        thousandSeparator="," 
                                        prefix={' $'} 
                                        decimalScale={2} 
                                        fixedDecimalScale
                                    /> </li>
            <li className="list-group-item fs-4">Dinero invertido:  <NumericFormat 
                                        value={balance.dineroInvertido}
                                        displayType={'text'} 
                                        thousandSeparator="," 
                                        prefix={' $'} 
                                        decimalScale={2} 
                                        fixedDecimalScale
                                    /> </li>
            <li className="list-group-item fs-4">Ganancia mes:
            <NumericFormat 
                                        value={ganancia.valor}
                                        displayType={'text'} 
                                        thousandSeparator="," 
                                        prefix={' $'} 
                                        decimalScale={2} 
                                        fixedDecimalScale
                                    /></li>
                                    <li className="list-group-item fs-4">Gasto mes: 
            <NumericFormat 
                                        value={gasto.valor}
                                        displayType={'text'} 
                                        thousandSeparator="," 
                                        prefix={' $'} 
                                        decimalScale={2} 
                                        fixedDecimalScale
                                    /></li>
            <li className="list-group-item fs-4">Dinero total: 
            <NumericFormat 
                                        value={balance.dineroTotal}
                                        displayType={'text'} 
                                        thousandSeparator="," 
                                        prefix={' $'} 
                                        decimalScale={2} 
                                        fixedDecimalScale
                                    /></li>
                                    
            <li className="list-group-item fs-4">Fecha: {balance.fecha} </li>
        </ul>
        
        </div>
        </div>
    </div>
  )
}
