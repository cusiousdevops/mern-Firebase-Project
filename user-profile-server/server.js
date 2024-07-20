const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const cors = require('cors');
const path = require('path'); // Add this line

const app = express();
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
}));

mongoose.connect('mongodb://admin:password@localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
        console.log('MongoDb is connected..')
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.name}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/api/signup', upload.fields([{ name: 'profilePhoto' }, { name: 'coverPhoto' }]), async (req, res) => {
  const { name, phone, password, personalDetails } = req.body;
  const profilePhoto = req.files.profilePhoto[0].filename;
  const coverPhoto = req.files.coverPhoto[0].filename;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({
    name,
    phone,
    password: hashedPassword,
    personalDetails,
    profilePhoto,
    coverPhoto,
    createdOn: new Date(),
    updatedOn: new Date(),
    status: 'ACTIVE',
  });

  console.log('User is being created :: ',newUser);

  try {
    await newUser.save();
    console.log('User created successfully.');
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get('/', async (req, res) => {
    
    res.json({"message" : "Welcome to backend npm server"});
  });

app.post('/api/login', async (req, res) => {
  const { name, phone, password } = req.body;
  
  const user = await User.findOne({ name, phone });
  if (user && await bcrypt.compare(password, user.password)) {
    // const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
    res.json({ success: true, userId: user._id });
  } else {
    res.json({ success: false });
  }
});


app.get('/api/profile/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving user profile' });
  }
});

// Route to get all user profiles
app.get('/api/allprofile', async (req, res) => {
    try {
      const users = await User.find(); // Use find() to retrieve all user profiles
      res.json(users); // Send the list of users as JSON response
    } catch (error) {
      console.error('Error fetching all profiles:', error);
      res.sendStatus(500); // Internal Server Error
    }
  });

  // Serve static files from the 'public' directory
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
