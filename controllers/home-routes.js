const router = require("express").Router();
const Journal = require ('../models/Journal')
const User = require('../models/User');
const withAuth = require('../utils/auth');

// GET homepage
router.get("/", async (req, res) => {

  try {
    res.render('login', {
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      style: 'login.css'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET Journal Page
router.get("/journal", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  try {
    res.render("journal", {
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      style: 'journal.css'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;