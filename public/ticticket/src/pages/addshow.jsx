import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/ReactToastify.css"
import styled from "styled-components"
import Logo from"../assets/logoti.png"
import { addshowRoute } from "../utils/APIRoutes";
import {BiPowerOff} from 'react-icons/bi';
function Addshow() {

    const navigate = useNavigate();
    const [currentUser,setCurrentUser]=useState(undefined);
    const [loadingUser,setLoadingUser]=useState(true);
    const [isLoaded, setIsLoaded] =useState(false);

    const[values,setvalues]=useState({
        moviename:"",
        screennumber:"",
        showstart:"",
        date:"",
    });

    const toastoptions={
        position: "bottom-right",
        autoclose: 4000,
        pauseOnHover: true,
        draggable: true,
        
    };

    async function logout() {
      await localStorage.clear();
      navigate("/login");
  }

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

      useEffect(()=>{
        setUser();
      },[])

      const clisubmission= async(event)=>{
        event.preventDefault();
       if(validentry()){
        console.log("adding element started");
        

        try {
            const { moviename, screennumber, showstart, date } = values;
            const formattedDate = date; 
            const formattedTime = showstart; 
            const { data } = await axios.post(addshowRoute, {
                userId: currentUser._id,
                moviename,
                screennumber,
                showstart: formattedTime,
                date: formattedDate,
            });
            if (data.status) {
                alert("Show added successfully");
            } 
            
            else {
                console.error("Error adding show", data.msg);
            }
        } catch (err) {
            console.error("Error adding show", err);
        }


       }
    };



    const validentry= ()=>{
        const { moviename,screennumber,showstart,date}=values;
        if(moviename===""){
            toast.error("Enter Movie Name",toastoptions);
            return false;
        }
        if(screennumber===""){
            toast.error("Enter Screen Number",toastoptions);
            return false;
        }
        if(showstart===""){
            toast.error("Enter showstart",toastoptions);
            return false;
        }
        if(date===""){
            toast.error("Enter the Date",toastoptions);
            return false;
        }
        return true;
    };



      const textchan= (event)=>{
        setvalues({...values,[event.target.name]:event.target.value})
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
            <h2>TIKTIKET</h2>
            <h6>admin</h6>
         </div>
        
         <div className="centreblock">
           
         <form action="" onSubmit={(event)=>clisubmission(event)}>
            <input type='text' placeholder='Movie Name' name="moviename" onChange={(ev)=>textchan(ev)}></input>
            <input type='text' placeholder='Screen No' name="screennumber" onChange={(ev)=>textchan(ev)}></input>
            <input type='time' placeholder='Starting Time' name="showstart" onChange={(ev)=>textchan(ev)}></input>
            <input type="date" placeholder="Date" name="date" onChange={(ev) => textchan(ev)} />
            <button type='submit'>Start</button>
         </form>


         </div>
         <div className="endblock">
            <h2>{currentUser ? currentUser.username : "Loading..."}</h2>
            <BiPowerOff className="logoutbutton" onClick={logout}/>
        </div>
        </div>
        <ToastContainer/>
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

     form {
     display: flex;
     flex-direction: column;
     gap: 1.2rem;
     border-radius: 2rem;
     padding: 2rem 5rem;
       
   }
     input {
       background-color: transparent;
       padding: 1rem;
       border: 0.1rem solid #062D4E;
       border-radius: 0.4rem;
       color:black ;
       width: 100%;
       font-size: 1rem;
       &:focus {
         border: 0.1rem solid #006DC0;
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

export default Addshow
