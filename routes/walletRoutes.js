const express = require('express');
const router = express.Router();
const profileController = require('../controller/userController');


router.post('/', profileController.walletProfile);

router.get('/', profileController.getAllProfiles);

router.get('/wallets/:telegram_id', profileController.getProfilesByTelegramId);

router.get('/profile/:stakingAddress', profileController.getProfileByStakingAddress);


module.exports = router;
