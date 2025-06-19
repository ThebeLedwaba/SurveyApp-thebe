const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true, minlength: 10, maxlength: 10 },
  dateOfBirth: { type: Date, required: true },
  favoriteFoods: [{ type: String, enum: ['Pizza', 'Pap and Wors', 'Other', 'Pasta'], required: true }],
  ratings: {
    eatOut: { type: Number, required: true, min: 1, max: 5 },
    watchMovies: { type: Number, required: true, min: 1, max: 5 },
    watchTV: { type: Number, required: true, min: 1, max: 5 },
    listenRadio: { type: Number, required: true, min: 1, max: 5 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Survey', surveySchema);