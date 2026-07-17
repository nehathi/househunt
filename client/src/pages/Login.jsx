import {useState} from "react";
import api from "../services/api";
import {useNavigate} from "react-router-dom";

export default function Login(){

const navigate=useNavigate();

const[data,setData]=useState({

email:"",
password:""

});

const handleChange=(e)=>{

setData({

...data,

[e.target.name]:e.target.value

});

};

const login=async(e)=>{

e.preventDefault();

try{

const res=await api.post("/auth/login",data);

localStorage.setItem("token",res.data.token);

navigate("/");

}

catch(err){

alert("Login Failed");

}

};

return(

<div className="form">

<h2>Login</h2>

<form onSubmit={login}>

<input

type="email"

name="email"

placeholder="Email"

onChange={handleChange}

/>

<input

type="password"

name="password"

placeholder="Password"

onChange={handleChange}

/>

<button>

Login

</button>

</form>

</div>

);

}