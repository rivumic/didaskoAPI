require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

//generates random salt and uses to generate password hash
function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}

//checks if a password matches a hash and salt
function validPassword(password, hash, salt) {
  var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
}

//creates map of users and generates each a passoword hash based on environment variables
//to extend system to support user-specific accounts this should be replaced with logic that similarly generates a passowrd hash, but upon user registration or password change
//also, user information should be stored in a database rather than memory
const users = [{user: 'admin', key: process.env.adminPass}, {user: 'manager', key: process.env.managerPass}, {user: 'academic', key: process.env.academicPass}]
  usersMap = new Map()
  users.forEach((pass)=>{
    keyInfo = genPassword(pass.key)
    user = {username: pass.user, hash: keyInfo.hash, salt: keyInfo.salt}
    usersMap.set(pass.user, user)
})

//verifies a user
const verifyCallback = (username, password, done) =>{
  try{
    //gets user from map; should be replaced with database query for user-specific implementation
    var user = usersMap.get(username)
    if (!user){return done(null, false)}
    const isValid = validPassword(password, user.hash, user.salt);
    if (isValid){
      return done(null, user);
    }
    else{
      return done(null, false)
    }
  }catch(err){
    done(err);
  }
}

const strategy = new LocalStrategy(verifyCallback)

passport.use(strategy);

//saves user id into the session
passport.serializeUser((user, done) => {
  // username property corresponds to the user{} object defined on line 30
  done(null, user.username);
});

//retrieves or 'deserializes' user information from session
passport.deserializeUser((userId, done) => {
  try{
    done(null, usersMap.get(userId))
  }
  catch(err){
    done(err)
  }
});