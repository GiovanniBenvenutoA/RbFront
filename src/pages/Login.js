import React, { Component} from 'react';
import '../css/Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/banco-ripley.png';
import axios from 'axios';
import {Button, Modal} from 'react-bootstrap';
const USERS_REST_API_URL_AUTH = "http://18.222.97.138:8080/api/Authentication";
const { validate,format } = require('rut.js')



class Login extends Component {

    constructor(){
        super()
        this.state={show:false}
    }

    state={
        form:
        {
            rut: '',
            password: ''
        }
    }

    handleChange=async e=>{

        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        
    }
    
    iniciarSesion=async()=>{
        await axios.post(`${USERS_REST_API_URL_AUTH}/${this.state.form.rut}/${this.state.form.password}`).then(response=>{
            console.log(response.data);
            return response.data;
        })
        .then(response=>{
            if(response.valor==true){
                window.location.href="./menu";
            }else{
                this.setState({show:true})
            }
        })
        
        .catch(error=>{
            console.log(error);
        })
    }

    hanldeModal(){
        this.setState({show:!this.state.show});
    }

    RecuperarPass(){
        window.location.href="./recuperar";
    }

    render() {
        return (
    <div>
        <img src={logo} />
    
    <div className="containerPrincipal">
        
        <div className="containerSecundario">
          <div className="form-group">
            <label class="lefttext">Rut Usuario</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="rut"
              placeholder="Ingresa tu RUT"
              onChange={(this.handleChange)}
            />
            <br />
            <label class="lefttext">Clave  </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="****"
              onChange={this.handleChange}
            />
            <br />
            <button className="button" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
          </div>
          <a class="what " onClick={()=> this.RecuperarPass()} >¿Olvidaste o se olvido tu clave?</a>

        </div>
      </div>
      <Modal show={this.state.show} onHide={()=> this.hanldeModal()}>
                <Modal.Header closeButton>Error Autenticacion</Modal.Header>
                <Modal.Body>
                    <p class="centerparrafo">Error usuario y/o clave incorrectos</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>{this.hanldeModal()}}>
                        Volver
                    </Button>
                </Modal.Footer>
            </Modal>
      </div>
        );
    }
}

export default Login;