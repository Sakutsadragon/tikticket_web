const User = require("../model/userModel");
const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
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
        user.password = undefined; 
        return res.status(201).json({ status: true, user });
    } catch (ex) {
        console.error("Error during registration:", ex); 
        return res.status(500).json({ msg: "Internal Server Error", error: ex.message });
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        const userC = await User.findOne({ username });
        if (!userC) {
            return res.json({ msg: "User details not found", status: false });
        }
        
        const isPasswMatch = await bcrypt.compare(password, userC.password);
        if (!isPasswMatch) {
            return res.json({ msg: "Incorrect username or password", status: false });
        }
        
        return res.json({ status: true, user: userC });
    } catch (ex) {
        next(ex);
    }
};

module.exports.availableShows = async (req, res, next) => {
    try {
        const currentDateTime = new Date();
        const admins = await Admin.find({
            'showList.showTimings': { $gt: currentDateTime }
        });

        const availableShows = [];

        admins.forEach(admin => {
            admin.showList.forEach(show => {
                show.showTimings.forEach(showTiming => {
                    if (new Date(showTiming) > currentDateTime) {
                        availableShows.push({
                            username: admin.username,
                            movieName: show.movieName,
                            screenNumber: show.screenNumber,
                            showTiming: showTiming,
                            seating: show.seating,
                            _id:show._id,
                            date: show.date,
                        });
                    }
                });
            });
        });

        return res.json(availableShows);
    } catch (error) {
        console.error("Error fetching available shows:", error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};


module.exports.getHistory = async (req, res, next) => {
    try {
        const {currentuser} = req.body;
        const userC = await User.findOne({ username: currentuser.username });
        if (!userC) {
            return res.json({ msg: "User details not found", status: false });
        }
        const prevhistory = userC.bookings;
        return res.status(200).json(prevhistory);
    } catch (ex) {
        next(ex);
    }
};
