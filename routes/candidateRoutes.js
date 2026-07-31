const express = require('express');
const router = express.Router();

const Candidate = require('./../models/candidate');
const User = require('./../models/user');
const{jwtAuthMiddleware, generateToken}=require('./../jwt');


const checkAdminRole = async (userId) => {
  try {
    const user = await User.findById(userId);
    return (user.role === 'admin');
  } catch (error) {
    return false;
  }
}


router.post('/',jwtAuthMiddleware, async (req, res) => {
  try{

   if(! await checkAdminRole(req.user.id))
    return res.status(403).json({mesage : 'user does not admin role'});
   

   const data = req.body;
   const newCandidate = new Candidate(data);
   const response = await newCandidate.save();

   console.log('data saved');
   res.status(201).json({response: response});

  }catch(error){
    console.log('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data' });
  }
});



router.put('/:candidateID',jwtAuthMiddleware, async (req, res) => {
  try {

     if(!checkAdminRole(req.user.id))
    return res.status(403).json({mesage : 'user does not admin role'});

    const candidateID = req.user.candidateID;
   const updatedCandidateData = req.body;

   const response = await Candidate.findByIdAndUpdate(candidateID, updatedCandidateData,{
    new:true,
    runValidators:true
   })

   if(!response){
    return res.status(404).json({error: "candidate not found"});
   }

    console.log('password updated');
    res.status(200).json({message: "password updated"});

  } catch (err) {
    console.log('Error updating data', err);
    res.status(500).json({ error: 'An error occurred while updating data' });
  }
});



router.delete('/:candidateID',jwtAuthMiddleware, async (req, res) => {
  try {

     if(!checkAdminRole(req.user.id))
    return res.status(403).json({mesage : 'user does not admin role'});

    const candidateID = req.user.candidateID;

   const response = await Candidate.findByIdAndDelete(candidateID);

   if(!response){
    return res.status(404).json({error: "candidate not found"});
   }

    console.log('password updated');
    res.status(200).json({message: "password updated"});

  } catch (err) {
    console.log('Error updating data', err);
    res.status(500).json({ error: 'An error occurred while updating data' });
  }
});


router.post('/vote/:candidateID', jwtAuthMiddleware, async (req, res) =>{
  
  try {
    
  } catch (error) {
    
  }
})


module.exports = router;