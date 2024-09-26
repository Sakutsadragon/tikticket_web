import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components"
import Logo from"../assets/logoti.png"
import { getHistoryRoute } from "../utils/APIRoutes";
import QRCode from "react-qr-code";
import {BiPowerOff} from 'react-icons/bi';
function Historry() {

    const navigate = useNavigate();
    const [currentUser,setCurrentUser]=useState(undefined);
    const [loadingUser,setLoadingUser]=useState(true);
    const [isLoaded, setIsLoaded] =useState(false);
    const[historry,setHistorry]=useState([]);

    const setUser = async ()=>{
        if(!localStorage.getItem("Tikuser")){
          navigate('/login');
        }
        else{
          setCurrentUser(await JSON.parse(localStorage.getItem("Tikuser")));
          setIsLoaded(true);
          setTimeout(async()=>{
            setLoadingUser(false);
          },1000)
        }
      }

    const prevHistory = async ()=>{
        try {
            if(isLoaded){
            console.log(currentUser);
            const response = await axios.post(getHistoryRoute, { currentuser: currentUser });
            setHistorry(response.data);
            // console.log(response.data);
            }
          
              
        } catch (error) {
            console.error("Error fetching available shows:", error);
        }
    };
    async function logout() {
        await localStorage.clear();
        navigate("/login");
    }

    

      useEffect(()=>{
        setUser();
      },[])
      useEffect(()=>{
        if(isLoaded)
        prevHistory();
      },[currentUser])


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
         </div>
        
         <div className="centreblock">
           
           <div className="showcase">
           {historry.length > 0 && currentUser ? (
                            historry.map((show, index) => (
                               
                                <div key={index} className="show">
                                    <div className="showdetails">
                                        <p>Movie Name: {show.movieName}</p>
                                    <p>Screen Number: {show.screenNumber}</p>
                                    <p>Seat Numbers: {show.seatNumbers.join(', ')}</p>
                                    <p>Show Time: {new Date(show.showTime).toLocaleString()}</p> 
                                    </div>  
                                    <QRCode className="qr" value={show.bookingId}/>
                                </div>
                               
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
            </div>
            
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
.showcase{
display:flex;
flex-direction:column;
gap:4vh;
padding:3vh;
overflow-y:scroll;
.show{
display:flex;
flex-direction:row;
width:65vh;
background-color:white;
border: solid 0.5px lightgrey;
border-radius:3vh;
align-items:center;
justify-content:center;
padding-top:3vh;
padding-bottom:3vh;
.qr{
height:8vh;
width:18vh;
}
}
}
.showcase::-webkit-scrollbar {
    display: none; /* Hide scrollbar for webkit-based browsers */
}

.showcase {
    scrollbar-width: none; /* Hide scrollbar for Firefox */
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

export default Historry
