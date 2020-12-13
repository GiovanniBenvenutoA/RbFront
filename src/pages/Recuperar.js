import React from 'react';
import '../css/Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import logo from '../img/banco-ripley.png';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';


const cookies = new Cookies();
const USERS_REST_API_URL_RECOV = "http://18.222.97.138:8080/api/RecoveryPass";

const { validate,format } = require('rut.js');

var valores = {
    valor : String,
    email : String

};



class RecuperarPass extends React.Component {
    state={
        form:{
            rut: '',
            password: ''
        }
    }

    constructor(){
        super()
        this.state={show:false}
    }
    
    

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        
    }
    
    
    
    

    RecoveryPass =async()=>{
        await axios.post(`${USERS_REST_API_URL_RECOV}/${this.state.form.rut}`).then(response=>{  
            valores = response.data;
            return response.data;
        })
        .then(response=>{
            if(response.valor==true){
                this.setState({show:true})
            }
            else{
                alert('El usuario no se encuentra registrado');
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    
    
    volverAtras(){
        window.location.href="./";
    }

    hanldeModal(){
        this.setState({show:!this.state.show});
    }

    

    
    
    render() {
        return (
    <div>
        <img src={logo} />
    
    <div className="containerPrincipal">
      <div className="form-group">
        <h5 class="centertext">Recupera tu clave</h5>
        <p class="centerparrafo">Ingresa tu RUT y te enviaremos una clave provisoria a tu email.</p>
        </div>
        <div className="containerSecundario">
          <div className="form-group">
            <label class="lefttext">Rut</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="rut"
              placeholder="Ingresa tu RUT"
              onChange={(this.handleChange)}
            />
            <br/>
            <button className="button" onClick={()=> this.RecoveryPass()}>Iniciar Sesión</button>
          </div>
          <a class="what" onClick={()=> this.volverAtras()} >¿Recordaste tu clave?</a>
        </div>
      </div>
            <Modal show={this.state.show} onHide={()=> this.hanldeModal()}>
                <Modal.Header closeButton>Validacion Exitosa</Modal.Header>
                <Modal.Body>
                    <p class="centerparrafo">Dentro de los proximos Minutos se enviara un correo electronico a tu casilla registrada para restablecer tu contraseña.Por seguridad te recomendamos ingresar a tu banca en línea con tu clave  y cambiarla inmediatamente</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>{this.hanldeModal()}}>
                        Volver al inicio
                    </Button>
                </Modal.Footer>
            </Modal>

            

            

            
      </div>
        );
    }
}

export default RecuperarPass;