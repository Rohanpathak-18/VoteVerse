const express = require('express');
const router = express.Router();

const User = require('./../models/user');
const{jwtAuthMiddleware, generateToken}=require('./../jwt');




router.post('/signup', async (req, res) => {
  try{
   const data = req.body;
   const newUser = new User(data);
   const response = await newUser.save();

   console.log('data saved');

   const payload = {
    id: response.id,
   }

console.log(JSON.stringify(payload));
const token = generateToken(payload);
console.log("Token id: ", token);

   res.status(201).json({response: response, token: token});

  }catch(error){
    console.log('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data' });
  }
});



router.post('/login', async(req,res) => {
  try{
     const{aadharCardNumber, password}= req.body;
     const user = await User.findOne({aadharCardNumber: aadharCardNumber});


if(!user || !(await user.comparePassword(password))){
    return res.status(400).json({
        error:"Invalid username or password"
    });
}

     const payload = {
    id: user._id
};

     const token = generateToken(payload);
     res.json({token})

  }catch(error){
   console.log('Error login:', error);
    res.status(500).json({ error: 'An error occurred while login'});
  }
})



  router.get('/profile',jwtAuthMiddleware, async (req, res)=> {
  try{
   const userData = req.user;
   const userId = userData.id;
   const user = await User.findById(userId);

   if(!user){
   return res.status(404).json({
      error:"User not found"
   });
}
   res.status(200).json({user});

  }catch (error){

    console.log('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});



router.put('/profile/password',jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
   const {currentPassword, newPassword} = req.body;

    const user = await User.findById(userId);

     if(!(await user.comparePassword(currentPassword))){
      return res.status(400).json({error:'Inavalid username or password'})
     } 
     if (!user) {
    return res.status(404).json({
        error: "User not found"
    });
}

     user.password = newPassword;
     await user.save();

    console.log('password updated');
    res.status(200).json({message: "password updated"});

  } catch (err) {
    console.log('Error updating data', err);
    res.status(500).json({ error: 'An error occurred while updating data' });
  }
});



module.exports = router;