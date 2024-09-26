import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import Logo from"../assets/logoti.png"
import {BiPowerOff} from 'react-icons/bi';

function Ahomee() {

    const navigate = useNavigate();
    const [currentUser,setCurrentUser]=useState(undefined);
    const [loadingUser,setLoadingUser]=useState(true);
    const [isLoaded, setIsLoaded] =useState(false);

    const setUser = async ()=>{
        if(!localStorage.getItem("ATikuser")){
          navigate('/alogin');
        }
        else{
          setCurrentUser(await JSON.parse(localStorage.getItem("ATikuser")));
          setIsLoaded(true);
          setTimeout(async()=>{
            setLoadingUser(false);
          },1000)
        }
      }
      
      async function logout() {
        await localStorage.clear();
        navigate("/login");
    }

      useEffect(()=>{
        setUser();
      },[])


    function adshow(){
        navigate('/addshow');
    };
    function checur(){
        navigate('/checur');
    };


  return (
    <>
    <Ahome>
        <div className="mainbody">
        <div className="headtop">
        <h2>TICK YOUR TICKETS WITH US</h2>
        
         </div>

         <div className="brand"> 
            <img src={Logo} alt="" />
            <h2>TIKTICKET</h2>
            <h6>admin</h6>
         </div>
        
         <div className="centreblock">
           
            <button className="bb1" onClick={adshow}>Add a show</button>
         </div>
         <div className="endblock">
            <h2>{currentUser ? currentUser.username : "Loading..."}</h2>
            <BiPowerOff className="logoutbutton" onClick={logout}/>
        </div>
        </div>
        
    
    </Ahome>
    </>
  )
}

const Ahome = styled.div`
display:flex;
align-items:center;
justify-content:center;
.mainbody{
filter: drop-shadow(-1rem 1rem 1rem rgb(51, 51, 51));
margin-top:5vh;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
.headtop{
display: flex;
align-items:center;
justify-content:center;
background-color:#062D4E;
height:16vh;
width:80vh;
 color:white;
font-size:3vh;
}
.centreblock{
display: flex;
background-color:white;
height:54vh;
width:80vh;
display:flex;
justify-content:center;
gap:5rem;
button{
background-color:#062D4E;
color:white;
margin-top:8vh;
border: solid 0.5px light-grey;
width:20vh;
height:25vh;
border-radius: 2vh;
cursor:pointer;
}
}
.brand{
background-color:white;
height:10vh;
width:80vh;
display:flex;
align-items:center;
justify-content:center;
gap:0.6rem;
h2{
font-size:3vh;
color:#062D4E;
padding-top:0.8rem;
}
img{
height: 5rem;
transform: scale(1);
padding-top:1rem;
}
}
.endblock{
display: flex;
align-items:center;
justify-content:center;
background-color:#062D4E;
height:10vh;
width:80vh;
 color:white;

     .logoutbutton{
    font-size: 3.5vh;
    color: #ebe7ff;
    margin-left:1.5vh;
    cursor:pointer;
     }

}

}

`;

export default Ahomee
