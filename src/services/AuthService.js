import axios from 'axios';

const USERS_REST_API_URL_AUTH = "http://localhost:8080/api/Authentication";
const USERS_REST_API_URL_RECOV = "http://localhost:8080/api/RecoveryPass";

var valores = {
    valor : String,
    email : String

};

class AuthService{
    

     
    
    Authentication(number,pass){

       
        axios.post(`${USERS_REST_API_URL_AUTH}/${number}/${pass}`).then(response=>{
            console.log("datos"+response.data);
            
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                window.location.href="./menu";
            }else{
                alert('El usuario o la contraseña no son correctos');
            }
        })
        
        .catch(error=>{
            console.log(error);
        })
    }

    RecoveryPass =async(number)=>{
        await axios.post(`${USERS_REST_API_URL_RECOV}/${number}`).then(response=>{  
            
            valores = response.data;
            return response.data;
        })
        .then(response=>{
            if(response.valor==true){

                return true;
            }
            
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export default new AuthService();