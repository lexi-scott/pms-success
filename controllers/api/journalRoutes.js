const router = require('express').Router();
const Journal = require('../../models/Journal');
const User = require('../../models/User');

router.get('/', (req, res) => {
  // Get all user from user table
  Journal.findAll().then((dbJournalData) => {
    res.json(dbJournalData);
  });
});


// //get journal by id
router.get('/:id', async (req, res) => {
    // find a journal by its `id`
    try {
      const dbJournalData = await Journal.findByPk(req.params.id);
      if(!dbJournalData) {
        res.status(404).json({ message: 'No Journal was found with that id!'});
        return
      }
      res.status(200).json(dbJournalData)
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get journal by date
// router.get('/date', async (req, res) => {
//   // find a journal by its `id`
//   try {
//     const dbJournalData = await Journal.findAll();
//     if(!dbJournalData) {
//       res.status(404).json({ message: 'No Journal was found with that date!'});
//       return
//     }
//     res.status(200).json(dbJournalData)
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const journalInput = {
            date: req.body.date,
            mood: req.body.mood,
            period: req.body.period,
            journal: req.body.journal,
            user_id: req.session.id
        }
        const dbJournalData = await Journal.create(journalInput);
        res.status(200).json(dbJournalData)
    } catch (err) {
        res.status(400).json(err)
    }
});

router.put('/:id', async (req, res) => {
    // update a journal by its `id` value
    try {
        await Journal.update({
        id: req.body.id,
        date: req.body.date,
        mood: req.body.mood,
        period: req.body.period,
        journal: req.body.journal
      },
      {
        where: {
          id: req.params.id
        },
      });
      res.status(200).json({ message: "update successful"});
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    // delete a journal by its `id` value
    try {
      const dbJournalData = await Journal.destroy({
        where: {
          id: req.params.id
        },
      });
  
      if (!dbJournalData) {
        res.status(404).json({ message: 'No Journal found with that ID.' });
        return;
      }
  
      res.status(200).json("Journal entry deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


module.exports = router; 