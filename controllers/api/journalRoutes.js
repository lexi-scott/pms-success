const router = require('express').Router();
const Journal = require('../../models/Journal');
const User = require('../../models/User');

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const journalInput = {
            date: req.body.date,
            mood: req.body.mood,
            period: req.body.period,
            journal: req.body.journal,
            user_id: req.body.userID
        }
        console.log(journalInput)
        const dbJournalData = await Journal.create(journalInput);
        res.status(200).json(dbJournalData)
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router; 