import React ,{ useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import stylerr from "styled-components"
import Logo from"../assets/logoti.png"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/ReactToastify.css"
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';
function Login() {


    const navigate = useNavigate()
    const[values,setvalues]=useState({
        username:"",
        password:"",
    });

    const toastoptions={
        position: "bottom-right",
        autoclose: 4000,
        pauseOnHover: true,
        draggable: true,
    };

    useEffect(()=>{
        if(localStorage.getItem("Tikuser"))
            navigate('/')
    },[])

    const clisubmission= async(event)=>{
        event.preventDefault();
        if(validentry()){
            const { password,username}=values;
            const {data}= await axios.post(loginRoute,{
                username,
                password,
            });
            if(data.status===false){
                toast.error(data.msg,toastoptions);
            }
            if(data.status === true){
                localStorage.setItem("Tikuser", JSON.stringify(data.user));
                navigate("/");
            }
            
        }
    };




    const validentry= ()=>{
        const { password,username}=values;
        if(password.length === 0){
            toast.error("Username and Password are required",toastoptions);
            return false;
        }
        else if(username.length ===0){
            toast.error("Username and Password are required",toastoptions);
            return false;
        }
        else if(password.length<8){
            toast.error("Password should contain atleast 8 letters",toastoptions);
            return false;
        }
     
        return true;

    };

    const textchan= (event)=>{
        setvalues({...values,[event.target.name]:event.target.value})
    };
  return (
    <div >
      <Formfiller>
        <form action="" onSubmit={(event)=>clisubmission(event)}>

        <div className="brand">
            <img src={Logo} alt="" />
            <h1>TIKTICKET</h1>
        </div>
        <input type='text' placeholder='Username' name="username" onChange={(ev)=>textchan(ev)}></input>
        <input type='password' placeholder='Password' name="password" onChange={(ev)=>textchan(ev)}></input>
        <button type='submit'>Login</button>
    <span>Don't have an account? <Link to="/register">Register</Link></span>

        </form>
        
      </Formfiller>
    
    <ToastContainer/>
     </div>
  )
}

const Formfiller = stylerr.div`
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
    background-color:white;
  gap: 1rem;
  align-items: center;
     background-image: url('../src/assets/902.webp'); 
  .brand {
    display: flex;
    align-items: center;
     margin-left:-1rem;
    gap: -1rem;
    justify-content: center;
    img {
      height: 5rem;
      transform: scale(1);
      padding-top:1rem;
    }
    h1 {
      color: #062D4E;
      padding-top: 15px;
      text-transform: uppercase;
    }
  }

  form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: rgb(300,300,300);
  border-radius: 2rem;
  padding: 3rem 5rem;
    filter: drop-shadow(-1rem 1rem 1rem rgb(51, 51, 51));
}
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #062D4E;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #006DC0;;
      outline: none;
    }
  }
  button {
    background-color: #062D4E;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #062D4E;
    }
  }
  span {
    color: black;
    text-transform: uppercase;
    a {
      color: #062D4E;
      text-decoration: none;
      font-weight: bold;
    }
  }

`;

export default Login
