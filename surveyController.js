const Survey = require('../models/Survey');

exports.submitSurvey = async (req, res) => {
  try {
    const newSurvey = new Survey(req.body);
    await newSurvey.save();
    res.status(201).json({ message: 'Survey submitted successfully' });
  } catch (err) {
    // Differentiate between validation (handled by routes) and other errors
    res.status(err.name === 'ValidationError' ? 400 : 500).json({ error: err.message });
  }
};

exports.getSurveyStats = async (req, res) => {
  try {
    const surveys = await Survey.find();
    if (surveys.length === 0) {
      return res.json({ message: 'No Surveys Available' });
    }

    const today = new Date();
    const ages = surveys.map(s => {
      const birthDate = new Date(s.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
      return age;
    });
    const totalSurveys = surveys.length;
    const pizzaCount = surveys.filter(s => s.favoriteFoods.includes('Pizza')).length;
    const papWorsCount = surveys.filter(s => s.favoriteFoods.includes('Pap and Wors')).length;
    const ratings = {
      eatOut: surveys.map(s => s.ratings.eatOut),
      watchMovies: surveys.map(s => s.ratings.watchMovies),
      watchTV: surveys.map(s => s.ratings.watchTV),
      listenRadio: surveys.map(s => s.ratings.listenRadio),
    };

    const stats = {
      totalSurveys,
      averageAge: (ages.reduce((a, b) => a + b, 0) / totalSurveys).toFixed(1),
      oldest: Math.max(...ages),
      youngest: Math.min(...ages),
      pizzaLoversPercentage: ((pizzaCount / totalSurveys) * 100).toFixed(1),
      papWorsPercentage: ((papWorsCount / totalSurveys) * 100).toFixed(1),
      averageEatOutRating: (ratings.eatOut.reduce((a, b) => a + b, 0) / totalSurveys).toFixed(1),
      averageWatchMoviesRating: (ratings.watchMovies.reduce((a, b) => a + b, 0) / totalSurveys).toFixed(1),
      averageWatchTVRating: (ratings.watchTV.reduce((a, b) => a + b, 0) / totalSurveys).toFixed(1),
      averageListenRadioRating: (ratings.listenRadio.reduce((a, b) => a + b, 0) / totalSurveys).toFixed(1),
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};