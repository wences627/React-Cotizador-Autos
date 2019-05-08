import React from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Resultado from './Resultado';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';
import Resumen from './Resumen';

class App extends React.Component{

  state = {
    resultado: "",
    datos: {}
  }

  cotizarSeguro = (datos) => {
    const {marca, year, plan} = datos;


    //agregar una base de 2000
    let resultado = 2000;

    // Obtener la diferencia de anios
    const diferencia = obtenerDiferenciaAnio(year);

    // Por cada anio restar 3% al valor del seguro
    resultado -= (((diferencia-1)*3)* resultado)/100;

    // Americano 15% Asiatico 5% Europeo 30% de incremento al valor actual 
    resultado = (calcularMarca(marca)* resultado);

    // incrementar plan basico en 20% y en cobertura completa 50%
    const incrementoPlan = obtenerPlan(plan);
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    // crear objeto para el resumen
    const datosAuto = {
      marca:marca,
      plan: plan,
      year: year
    }

    this.setState({
      resultado: resultado,
      datos: datosAuto
    })
    
  }
  render(){
    return (
      <div className="contenedor">
        <Header 
          titulo = 'Cotizador de Seguro de Auto'
        />
        <div className="contenedor-formulario">
          <Formulario 
            cotizarSeguro={this.cotizarSeguro}
          />
          <Resumen 
            datos={this.state.datos}
          />
          <Resultado 
            resultado= {this.state.resultado}
          />
        </div>
      </div>
    );
  }
}

export default App;
