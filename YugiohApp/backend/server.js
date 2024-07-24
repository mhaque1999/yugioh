require('dotenv').config();
const express = require('express');
const sequelize = require('./database/db'); 

const authRoutes = require('./routes/authRoutes');
const deckRoutes = require('./routes/deckRoutes');
const cardRoutes = require('./routes/cardRoutes');
const flickrRoutes = require('./routes/flickrRoutes');


const Card = require('./models/Card');
const Deck = require('./models/Deck');
const User = require('./models/User');
const DeckCard = require('./models/DeckCard');

const { uploadAllImages } = require('./controllers/flickrController');

const app = express();
const rateLimit = require('./middleware/rateLimit');

const PORT = process.env.PORT || 5000;


app.use(require('cors')()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use(rateLimit);
app.use('/api/auth', authRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/cards', cardRoutes);
app.use('/flickr', flickrRoutes);


async function syncDatabaseAndStartServer() {
  try {
    await sequelize.sync({
      force: false, // Drop tables 
      alter: true, 
    }); 
    console.log('Database & tables synchronized successfully!');


    Card.associate({ Deck, DeckCard });
    Deck.associate({ Card, User, DeckCard });
    User.associate({ Deck });

    await uploadAllImages();


    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error syncing database and starting server:', error);
  }
}


const syncOptions = {
  alter: true, 
};


sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful!');
    syncDatabaseAndStartServer(); 
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
