const passport = require('passport');
const User = require('./../model/User');
const bcrypt = require('bcryptjs');

exports.signin = (req, res) => {
  passport.authenticate('local', function(err, user, info) {
    
    if (err)
      return res.status(400).json({
        status: false, 
        msg: err
      });
      
    if(!user)
      return res.status(400).json(info);
      
    req.logIn(user, function(err) {
      if (err){
         return res.status(400).json({
           status: false, 
           msg: err
         });
         
      }else{
        
          return res.json({
            status: true, 
            msg: "Logged in!"
          });
      }
    });
  })(req, res);
}

exports.signup = (req, res) => {
  const {name, email, password} = req.body;
  
  if(!name){
    req.status(500).json({
      status: false,
      msg: "Please enter name"
    });
  }
  if(!email){
    req.status(500).json({
      status: false,
      msg: "Please enter enail"
    });
  }
  if(!password){
    req.status(500).json({
      status: false,
      msg: "Please enter password"
    });
  }
  User.findOne({email: email}).then((user)=>{
    if(user){
      res.status(500).json({
        status: false,
        msg:"Email already exists"
      });
    }else{
      const newUser =new User({
        name: name,
        email: email,
        password: password
      });
      
      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) {
            res.status(500).json({
              status: false,
              msg: err
            });
          }
          
          newUser.password = hash;
          
          newUser.save().then((user) =>{
            res.status(201).json({
              status: true,
              msg: "You are now registered and can log in"
            });
            
          });
          
        });
        
      });
      
    }
    
  }).catch((err) => console.log(err));
}

exports.logout = (req, res) => {
  req.logout();
  res.status(200).json({
    status: true,
    msg: 'You are logged out'
  });
};