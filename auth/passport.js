require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}

function validPassword(password, hash, salt) {
  var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
}

const users = [{user: 'admin', key: process.env.adminPass}, {user: 'manager', key: process.env.managerPass}, {user: 'academic', key: process.env.academicPass}]
  usersMap = new Map()
  users.forEach((pass)=>{
    keyInfo = genPassword(pass.key)
    user = {username: pass.user, hash: keyInfo.hash, salt: keyInfo.salt}
    usersMap.set(pass.user, user)
})

const verifyCallback = (username, password, done) =>{
  try{
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

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((userId, done) => {
  
  try{
    done(null, usersMap.get(userId))
  }
  catch(err){
    done(err)
  }
});