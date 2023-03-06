const router = require('express').Router();
const User = require('../../models/User');

router.get('/', (req, res) => {
  // Get all user from user table
  User.findAll().then((UserData) => {
    res.json(UserData);
  });
});

//create new user
router.post('/', async (req, res) => {
  try {
    const userInput ={
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    const dbUserData = await User.create(userInput);
    res.status(200).json(dbUserData);

    req.session.save(() => {
      req.session.loggedIn = true;
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({ where: { email: req.body.email } });
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect Email or password, please try again' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect Email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;