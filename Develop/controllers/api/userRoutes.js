const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
       

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});  // signup route is the / route here, so it goes: !/api/users/

router.post('/login', async (req, res) => {

    
    try {

        const userData = await User.findOne({ where: { username: req.body.username }})
        
        if(!userData) {
            res.status(400).json({ message: 'Incorrect user data, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        
        if(!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect password, please try again' });
            return;
        }


        req.session.user_id = userData.id;
        req.session.logged_in = true;

        req.session.save((err) => {
            if (err) {
              res.status(500).json({ message: 'Error saving session' });
              return;
            }
            
            res.json({ message: 'You are now logged in!' });
          });

        

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    
   if (req.session.logged_in) {
       req.session.destroy(() => {
           res
           .status(204)
           .json({ message: 'You are now logged out!' })
           .end();
       });
   } else {
       res.status(404).end();
   }
});



module.exports = router;