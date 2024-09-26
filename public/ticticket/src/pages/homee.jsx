import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Logo from "../assets/logoti.png"
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { availableShowsRoute } from "../utils/APIRoutes";
import {BiPowerOff} from 'react-icons/bi';

function Homee() {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [loadingUser, setLoadingUser] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [availableShows, setAvailableShows] = useState([]);

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

    function handleShowClick(show){
        // console.log("clicked");
        // console.log(show);
        navigate('/seating',{ state: { show } });
    };
    const fetchAvailableShows = async () => {
        try {
            const response = await axios.get(availableShowsRoute);
            setAvailableShows(response.data);
        } catch (error) {
            console.error("Error fetching available shows:", error);
        }
    };
    function historyViewer(){
        navigate('/history',);
    }
    async function logout() {
        await localStorage.clear();
        navigate("/login");
    }


    useEffect(() => {
        setUser();
        fetchAvailableShows();
    }, [])

    return (
        <>
            <Ahome>
                <div className="mainbody">
                    <div className="headtop">
                        <h2>TIC YOUR TICKETS WITH US</h2>
                    </div>

                    <div className="brand">
                        <img src={Logo} alt="" />
                        <h2>TIKTICKET</h2>
                    </div>
                    <h3 className="cur">Current Shows</h3>
                    <div className="centreblock">
                            
                        {availableShows.length > 0 ? (
                            availableShows.map((show, index) => (
                                <div key={index} className="show" onClick={() => handleShowClick(show)}>
                                    <div className="im">Image</div>
                                    <h3>{show.movieName}</h3>
                                    <p>Screen: {show.username} {show.screenNumber}</p>
                                    <p>{show.date}  {new Date(show.showTiming).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    
                                    {/* <p>Hosted by: {show.username}</p> */}
                                </div>
                            ))
                        ) : (
                            <p>No available shows at the moment.</p>
                        )}
                    </div>
                    <h5 className="showhistory" onClick={historyViewer}>
                            Previous Bookings
                    </h5>
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
    background-color:white;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    .cur{
   color:white;
   background-color:#062D4E;
   width:80vh;
   text-align:center;
    margin-top:1vh;
    margin-bottom:1vh;
    z-index:4;
    }
    .showhistory{
    width:20vh;
    text-align:center;
    margin-bottom:4vh;
    margin-top:2vh;
    padding-left:1vh;
    padding-right:1vh;
    padding-top:1vh;
    padding-bottom:1vh;
    background-color:#062D4E;
    color:white;
    cursor:pointer;
    font-size:1.7vh;
    }
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
    flex-direction: row;
    background-color: white;
    padding-left:3vh;
    padding-right:3vh;
    margin-top:-3vh;
    height: 40vh;
    width: 80vh;
    gap: 2rem;
    overflow-x: scroll;
    overflow-y: hidden; /* Ensure vertical overflow is hidden as well */
    padding-top: 5vh;
}

.centreblock::-webkit-scrollbar {
    display: none; /* Hide scrollbar for webkit-based browsers */
}

.centreblock {
    scrollbar-width: none; /* Hide scrollbar for Firefox */
}

.show {
    p {
        padding-left: 2vh;
        text-align: start;
    }
    .im {
        text-align: center;
        height: 21vh;
        border-bottom: solid 0.5px lightgrey;
    }
    h3 {
        text-align: center;
    }
    border: solid 0.5px lightgrey;
    height: 32vh;
    min-width: 28vh;
    background-color:white;
    border-radius: 2vh 2vh 2vh 2vh;
    filter: drop-shadow(-1vh 1vh 1vh rgb(51, 51, 51));
    cursor: pointer;
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

export default Homee
