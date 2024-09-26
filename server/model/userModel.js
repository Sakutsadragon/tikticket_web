const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 25,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    bookings: [{
        bookingId:{type: String},
        movieName: { type: String },
        screenNumber: { type: String },
        seatNumbers:{type: Array},
        showTime: { type: [Date] },
    }],
});


module.exports = mongoose.model('BmsUser', userSchema);