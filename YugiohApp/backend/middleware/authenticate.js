"use strict";
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./secret");
const { UnauthorizedError } = require("./expressError");
const Deck = require('../models/Deck'); 

/** Middleware: Authenticate user.
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals 
 * It's not an error if no token was provided or if the token is not valid.
 */
function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      const payload = jwt.verify(token, SECRET_KEY);
      console.log('Token verified. Payload:', payload);

      
      res.locals.user = {
        userId: payload.userId,
        username: payload.username
      };
      console.log('User object stored in res.locals:', res.locals.user);
    } else {
      console.log('No authorization header found');
    }
    return next();
  } catch (err) {
    console.error('JWT authentication error:', err);
    return next(); // Proceed even if there's an error
  }
}
/** Middleware to ensure the user is logged in.
 * If not, raises UnauthorizedError.
 */
function ensureLoggedIn(req, res, next) {
  try {
    console.log('User in res.locals:', res.locals.user); 
    if (!res.locals.user) {
      console.log('User is not logged in'); 
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    console.error('Ensure Logged In Error:', err); 
    return next(err);
  }
}

/** Middleware to ensure the user matches the userId in the token payload
 * If not, raises UnauthorizedError.
 */
function ensureCorrectUser(req, res, next) {
  try {
    const user = res.locals.user; 
    const userIdFromToken = user?.userId; 
    const userIdFromParams = req.params.userId; 

    console.log('User from token:', user);
    console.log('User ID from request params:', userIdFromParams);

    // Ensure both userId are strings before comparison
    if (String(userIdFromToken) !== String(userIdFromParams)) {
      console.log('Unauthorized: User ID does not match');
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    console.error('Error in ensureCorrectUser:', err);
    return next(err);
  }
}
/** Middleware: Ensure correct user or allow public deck viewing */
async function ensureCorrectUserOrPublicDeck(req, res, next) {
  try {
    const deckId = req.params.id;
    const deck = await Deck.findByPk(deckId);
    console.log("this is the deck, ",deck)
    if (!deck) throw new Error("Deck not found");

    const user = res.locals.user;
    const isOwner = user && user.userId === deck.userId; 

    if (deck.public || isOwner) {
      return next();
    } else {
      throw new UnauthorizedError("Unauthorized to view this private deck");
    }
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser,
  ensureCorrectUserOrPublicDeck
};
