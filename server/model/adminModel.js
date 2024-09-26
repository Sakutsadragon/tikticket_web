const mongoose = require('mongoose');

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

const adminSchema = new mongoose.Schema({
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

    showList: [{
        movieName: { type: String },
        screenNumber: { type: String },
        showTimings: { type: [Date], default: [] },
        date: { type: String },
        seating: {
            A: [{ id: String, booked: Boolean }],
            B: [{ id: String, booked: Boolean }],
            C: [{ id: String, booked: Boolean }],
            D: [{ id: String, booked: Boolean }],
            E: [{ id: String, booked: Boolean }],
            F: [{ id: String, booked: Boolean }]
        },
    }],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});

adminSchema.pre('save', function (next) {
    if (this.showList.movieName && this.showList.screenNumber && this.showList.showTimings.length > 0 ) {
        this.seating = initializeSeating();
    }
    next();
});

module.exports = mongoose.model('AdminBms', adminSchema);