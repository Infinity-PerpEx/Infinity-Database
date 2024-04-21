const Wallet = require('../models/wallets');



exports.walletProfile = async (req, res) => {
  try {
    const { telegram_id, address, private_key, seed_phrase } = req.body;

    // Check if any existing wallet already has the same address, private_key, or seed_phrase
    const existingWallet = await Wallet.findOne({
      $or: [
        { address },
        { private_key },
        { seed_phrase }
      ]
    });

    if (existingWallet) {
      // If any of the fields already exist, return an error response
      return res.status(400).json({ error: 'Address, private key, or seed phrase already exists' });
    }

    // Create a new wallet document
    const wallet = new Wallet({ telegram_id, address, private_key, seed_phrase });
    await wallet.save();

    res.status(201).json({ message: 'Wallet created successfully' });
  } catch (error) {
    console.error('Error creating wallet:', error);
    res.status(500).json({ error: 'Failed to create wallet' });
  }
};


exports.getProfilesByTelegramId = async (req, res) => {
  const { telegram_id } = req.params;

  try {
    const wallets = await Wallet.find({ telegram_id });

    if (wallets.length === 0) {
      return res.status(404).json({ error: 'Wallets not found for this telegram_id' });
    }

    const walletData = wallets.map(wallet => ({
      address: wallet.address,
      private_key: wallet.private_key,
      seed_phrase: wallet.seed_phrase
    }));

    res.json(walletData);
  } catch (error) {
    console.error('Error fetching wallet information:', error);
    res.status(500).json({ error: 'Failed to fetch wallet information' });
  }
};




exports.getProfileByStakingAddress = async (req, res) => {
  try {
    const profile = await Profile.findOne({ stakingAddress: req.params.stakingAddress });
    if (!profile) {
      return res.status(404).send('Profile not found');
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving profile');
  }
};

 

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving profiles');
  }
};