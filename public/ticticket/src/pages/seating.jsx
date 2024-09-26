import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEventSeat } from "react-icons/md";
import Logo from "../assets/logoti.png"
import { useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
import { getShowRoute, updateSeatsRoute } from '../utils/APIRoutes';
function Seating() {

    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [loadingUser, setLoadingUser] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const { show } = location.state;
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);



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


    const fetchSeats = async () => {
        try {
            const response = await axios.get(`${getShowRoute}/${show.username}/${show._id}`);
            setSeats(response.data.seating);
        } catch (error) {
            console.error("Error fetching seats:", error);
        }
    };

    useEffect(() => {
        if (show) {
            setUser();
            fetchSeats();
        }
    }, [show]);



    const handleSeatClick = (seat) => {
        if (seat.booked) return;
        if (selectedSeats.includes(seat.id)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
            return;
        }
        setSelectedSeats([...selectedSeats, seat.id]);
    };

    const handleConfirm = async () => {
        try {
            const response = await axios.post(updateSeatsRoute, {
                showUser: show.username,
                showId: show._id,
                selectedSeats,
                bookingUser: currentUser,
            });

            if (response.status === 200) {
                const booking = response.data.bookingId;
                navigate('/displayticket',{state:{selectedSeats,show,booking}});
                setSeats([]);
                fetchSeats();
                setSelectedSeats([]);
            }
        } catch (error) {
            console.error("Error updating seats:", error);
        }
    };

    const renderSeats = (row) => (
        seats[row] && seats[row].map(seat => (
            <div
                key={seat.id}
                className={`seat ${seat.booked ? 'booked' : ''} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seat)}
            >
                <MdEventSeat className='SeatIcon' />
                {seat.id}
            </div>
        ))
    );
    // console.log(typeof(selectedSeats));
    return (
        <>
            <Ahome>
                <div className="mainbody">
                    <div className="brand">
                        <img src={Logo} alt="" />
                        <h2>TICTICKET</h2>
                    </div>

                    <div className="centreblock">
                        {/* <h1>Seating Arrangement</h1> */}
                        <div>{seats ? <div className="seats">
                            <div className="row">{renderSeats("A")}</div>
                            <div className="row">{renderSeats("B")}</div>
                            <div className="row">{renderSeats("C")}</div>
                            <div className="row">{renderSeats("D")}</div>
                            <div className="row">{renderSeats("E")}</div>
                        </div> : "Loading..."}</div>
                        <div className='deatilsofseats'>
                            <div className='seat'>
                            <MdEventSeat className='SeatIcon' />  
                            <p>Available</p>
                            </div>
                            <div className='seat selected'>
                            <MdEventSeat className='SeatIcon' />  
                            <p>Selected</p>
                            </div>
                            <div className='seat booked'>
                            <MdEventSeat className='SeatIcon' /> 
                            <p>Not Available</p> 
                            </div>
                        </div>
                        <p className='cost'>Payement: {(selectedSeats.length) * 200}</p>
                        <button onClick={() => handleConfirm()}>Confirm</button>
                       
                    </div>
                    <div className="endblock">
                        <h2>{seats ? "Seat Arrangement" : "Loading..."}</h2>
                    </div>
                </div>


            </Ahome>
        </>
    );
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
.centreblock {
    display: flex;
    flex-direction: column;
    align-items:center;
    background-color: white;
    padding: 1rem;
    height: 70vh;
    width: 80vh;
    gap: 2rem;
    overflow-x: scroll;
    overflow-y: scroll;
    padding-top: 5vh;
    .deatilsofseats{
    display:flex;
    flex-direction:row;
    margin-top:-2vh;
    margin-left:2vh;
    align-items:center;
    justify-content:center;
    gap:5vh;
    }

        .seats {
        display: flex;
        flex-direction: column;
    }
    .row {
        display: flex;
    }
    .seat {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 5px;
        padding: 10px;
        padding-top: 3px;
        padding-bottom: 2px;
        border: 1px solid grey;
        border-radius: 5px;
        cursor: pointer;
    }
    .seat.booked {
        background-color: lightgrey;
        cursor: not-allowed;
    }
    .seat.selected {
        background-color: green;
        color:white;
    }
    .SeatIcon {
        font-size: 1.5rem;
    }

    button{
    color:white;
    background-color:#062D4E;
    border:none;
    padding:10px;
    border-radius:5px;
    margin-top:-1vh;
    cursor:pointer;

}
    .cost{
    margin-top:-1.5vh;
    }
}

.centreblock::-webkit-scrollbar {
    display: none; /* Hide scrollbar for webkit-based browsers */
}

.centreblock {
    scrollbar-width: none; /* Hide scrollbar for Firefox */
}


    .brand{
    background-color:white;
    height:10vh;
    width:80vh;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:0.6rem;
    border-bottom: solid 1px lightgrey;
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

export default Seating;
