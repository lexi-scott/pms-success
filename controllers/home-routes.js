const router = require("express").Router();
const { Journal, User } = require ('../models')
const withAuth = require('../utils/auth');

// GET homepage
router.get("/", async (req, res) => {

  try {
    res.render('login', {
      loggedIn: req.session.loggedIn,
      userid: req.session.userId,
      style: 'login.css'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET Journal Page
router.get("/journal", async (req, res) => {
  // if (!req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  
  try {
    res.render("journal", {
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
      name: req.session.name,
      style: 'journal.css'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // GET addCattle Page
// router.get("/addCattle", async (req, res) => {
//   if (!req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }

//   try {
//     res.render("addCattle", {
//       loggedIn: req.session.loggedIn,
//       userId: req.session.userId,
//       name: req.session.name,
//       ranchNum: req.session.ranchNum,
//       ranch: req.session.ranch,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // GET viewCattle Page
// router.get("/viewCattle", async (req, res) => {
//     if (!req.session.loggedIn) {
//     res.redirect('/');
//      return;
//    };


//   try {
//     const ranchNum = req.session.ranchNum;
//     const dbCattleData = await Cattle.findAll({
//       where: {
//         ranchNum: ranchNum
//       }
//     });

//     const prettycows = dbCattleData.map((cows) =>cows.get({plain: true}))


//     res.render("viewCattle", {
//       prettycows,
//       loggedIn: req.session.loggedIn,
//       userId: req.session.userId,
//       name: req.session.name,
//       ranchNum,
//       ranch: req.session.ranch,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
