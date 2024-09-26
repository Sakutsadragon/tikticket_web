import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEventSeat } from "react-icons/md";
import QRCode from "react-qr-code";
import Logo from "../assets/logoti.png"
import { useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";

function Displayticket() {


    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [loadingUser, setLoadingUser] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const { selectedSeats, show ,booking } = location.state;
    const setUser = async () => {
        if (!localStorage.getItem("Tikuser")) {
            navigate('/login');
        }
        else {
            setCurrentUser(await JSON.parse(localStorage.getItem("Tikuser")));
            setIsLoaded(true);
            setTimeout(async () => {
                setLoadingUser(false);
            }, 1000)
        }
    }
    useEffect(() => {
        setUser();
    }, [])
  return (
    <>
            <Ahome>
                <div className="mainbody">
                    <div className="headtop">
                        <h2>BOOKING CONFIRMED</h2>
                    </div>

                    <div className="brand">
                        <img src={Logo} alt="" />
                        <h2>TIKTICKET</h2>
                    </div>

                    <div className="centreblock">
                    <div className="bookdetails">

                    <h1>Booking Details</h1>
                    <QRCode className="qrcodee" value={booking} />
                    <p>Movie Name: {show.movieName}</p>
                    <p>Screen Number: {show.screenNumber}</p>
                    <p>Seat Numbers: {selectedSeats.join(', ')}</p>
                    <p>Show Time: {new Date(show.showTiming).toLocaleString()}</p>
                    </div>

                   
 

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
.centreblock {
    display: flex;
    flex-direction: column;
    align-items:center;
    // justify-content:center;
    background-color: white;
    padding: 1rem;
    height: 64vh;
    width: 80vh;
    gap: 2rem;
    padding-top: 5vh;


    .bookdetails{
     display: flex;
    flex-direction: column;
    width:45vh;
    height:45vh;
    gap:3vh;
    border-radius:3vh;
     border: solid 0.5px lightgrey;
      background-color: white;
       filter: drop-shadow(-1rem 1rem 1rem rgb(51, 51, 51));
       margin-top:-2vh;

        .qrcodee{
    height:10vh;
    margin-left:7vh;
    }
     h1{
     text-align:center;
     background-color:#062D4E;
     color:white;
      border-radius:1vh 1vh 0 0;
     }
     p{
     margin-left:4vh;
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
    }
    
    }
    
    `;

export default Displayticket
