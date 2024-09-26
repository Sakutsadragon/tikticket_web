const User = require("../model/adminModel");
const Admin = require("../model/adminModel");
const Viewer = require("../model/userModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

module.exports.aregister = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.status(400).json({ msg: "Username already exists, try another one", status: false });
        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.status(400).json({ msg: "Email already exists, try another one", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        user.password = undefined; // Mask the password in the response
        return res.status(201).json({ status: true, user });
    } catch (ex) {
        console.error("Error during registration:", ex); // Log detailed error
        return res.status(500).json({ msg: "Internal Server Error", error: ex.message });
    }
};

module.exports.alogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const userC = await User.findOne({ username });
        if (!userC)
            return res.status(400).json({ msg: "User details not found", status: false });
        const isPasswMatch = await bcrypt.compare(password, userC.password);
        if (!isPasswMatch)
            return res.status(400).json({ msg: "Incorrect username or password", status: false });
        userC.password = undefined; // Mask the password in the response
        return res.status(200).json({ status: true, userC });
    } catch (ex) {
        console.error("Error during login:", ex); // Log detailed error
        return res.status(500).json({ msg: "Internal Server Error", error: ex.message });
    }
};

const initializeSeating = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatsPerRow = 10;
    const seating = {};

    rows.forEach(row => {
        seating[row] = [];
        for (let i = 1; i <= seatsPerRow; i++) {
            seating[row].push({ id: `${row}${i}`, booked: false });
        }
    });

    return seating;
};

module.exports.addshow = async (req, res, next) => {
    try {
        const { userId, moviename, screennumber, showstart, date } = req.body;
        const showDateTime = new Date(`${date}T${showstart}`);
        
        if (isNaN(showDateTime.getTime())) {
            return res.status(400).json({ msg: "Invalid date or time format", status: false });
        }

        const admin = await Admin.findById(userId);
        if (!admin) {
            return res.status(404).json({ msg: "User not found" });
        }
        const existingShow = admin.showList.find(show => 
            show.screenNumber === screennumber && 
            show.showTimings.some(timing => timing.getTime() === showDateTime.getTime())
        );

        if (existingShow) {
            return res.status(400).json({ msg: "Show already exists for this screen number and time", status: false });
        }
        admin.showList.push({
            movieName: moviename,
            screenNumber: screennumber,
            showTimings: [showDateTime],
            date: date,
            seating: initializeSeating() 
        });
        await admin.save();
        return res.json({ status: true, admin });
    } catch (ex) {
        console.error("Error during addshow:", ex); 
        return res.status(500).json({ msg: "Internal Server Error", error: ex.message });
    }
};

module.exports.getShow = async (req, res) => {
    try {
        const { username, id } = req.params;

        const admin = await Admin.findOne({ username: username });
        if (!admin) {
            return res.status(404).json({ msg: "User not found" });
        }

        const show = admin.showList.id(id);
        return res.status(200).json(show);
    } catch (error) {
        console.error("Error fetching show:", error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};

module.exports.updateSeats = async (req, res, next) => {
    try {
        const { showUser, showId, selectedSeats, bookingUser } = req.body;

        const admin = await Admin.findOne({ username: showUser });
        if (!admin) {
            return res.status(404).json({ msg: "User not found" });
        }

        const show = admin.showList.id(showId);
        if (!show) {
            return res.status(404).json({ msg: "Show not found" });
        }

        const bookingId = uuidv4();
        const viewer = await Viewer.findById(bookingUser);
        if (!viewer) {
            return res.status(404).json({ msg: "Booking user not found" });
        }

        viewer.bookings.push({
            bookingId: bookingId,
            movieName: show.movieName,
            screenNumber: show.screenNumber,
            seatNumbers: selectedSeats,
            showTime: show.showTimings[0],
        });

        await viewer.save();

        Object.keys(show.seating).forEach(row => {
            show.seating[row].forEach(seat => {
                if (selectedSeats.includes(seat.id)) {
                    seat.booked = true;
                }
            });
        });

        await admin.save();
        return res.status(200).json({ status: true, msg: "Seats updated successfully", bookingId });
    } catch (ex) {
        console.error("Error during updateSeats:", ex);
        return res.status(500).json({ msg: "Internal Server Error", error: ex.message });
    }
};