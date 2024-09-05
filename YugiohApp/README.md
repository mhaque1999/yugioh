# Yu-Gi-Oh! Deck Builder

## Introduction
The **Yu-Gi-Oh! Deck Builder** is a web application that allows users to create, edit, and manage custom Yu-Gi-Oh! decks. Whether you're a beginner or a seasoned player, this tool helps you search for cards, create powerful combos, and build a deck that suits your playstyle.

---

## What Does The Website Do?

This website enables users to:

1. **Search and browse** thousands of Yu-Gi-Oh! cards using filters like card type, attribute, and more.
2. **Create and edit decks** by adding or removing cards, with a visual display of your deck's composition.
3. **Save and manage multiple decks** with the ability to update and delete them.
4. **View card details**, including stats and effects, to help with strategic deck-building.
5. **Authenticate users** so they can manage their own personal decks.
   
---

## Key Features

### 1. **Card Search & Filter**
   - Users can search through a large database of cards and filter by type, attribute, level, and more.
   - This feature was implemented because building a strong deck requires the ability to quickly find specific cards based on different criteria.
   
### 2. **Deck Management**
   - Users can create a new deck, add cards to the deck, remove them, and save the deck for future editing.
   - You can only have up to 3 copies of any card, which follows the official Yu-Gi-Oh! rules.
   - Deck editing and saving were essential features since the core function of the website is to help players manage their decks easily.

### 3. **User Authentication**
   - Users must create an account or log in to save their decks. This ensures that each user has their own personalized experience.
   - I chose to implement this for security and personalization, so each user’s decks are stored privately.

---

## Challenges Faced

### 1. **Deck Editing Logic**
   - Implementing deck editing was challenging, particularly handling cases where users wanted to modify the number of copies of cards in a deck without exceeding the 3-card limit.
   
### 2. **Handling Card Clicks**
   - Managing card selection to ensure that no more than 3 copies of any card could be added to a deck required careful logic handling. Another issue was correctly displaying multiple copies of the same card in a deck, which required additional checks in the frontend code.

---

## Standard User Flow

1. **Sign Up or Log In**: The user creates an account or logs in if they already have one.
2. **Search for Cards**: The user searches for cards using the card search feature and adds desired cards to a new or existing deck.
3. **Create/Edit Deck**: Once the cards are selected, the user can save the deck, give it a name, and review the card count.
4. **Save Deck**: After finalizing the deck, the user saves it to their profile. They can then return later to edit or review it.
5. **Deck Management**: Users can view all their saved decks on their dashboard, edit them, or delete them entirely if they wish to start fresh.

---

## API Details

This project uses the **YGOPRODeck API** to fetch data about Yu-Gi-Oh! cards. The API provides details such as card name, type, attack/defense points, and card effects. 
---

## Technology Stack

- **Frontend**: React.js with CSS for styling.
- **Backend**: Node.js with Express.js.
- **Database**: PostgreSQL for storing user and deck data.
- **ORM**: Sequelize was used to manage database operations.
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication.

---

## Additional Notes

This project was a great learning experience. It helped me understand how to integrate third-party APIs, manage data flow between frontend and backend, and build a functional deck-building interface. If I had more time, I would like to add features such as:
- A drag-and-drop interface for easier deck building.
- Improved filtering options to further refine card searches.
- An analytics feature to break down deck compositions and offer suggestions.

Thank you for visiting!
