const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  mobile: {
    type: String,
  },

  email: {
    type: String,
  },

  address: {
    type: String,
  },

  aadharCardNumber: {
    type:Number,
    required:true,
    unique:true
  },

  password: {
    type: String,
    required: true, 
  },
 
  role:{
  type:String,
  enum:['voter', 'admin'],
  default:'voter'
  },

  isVoted:{
    type:Boolean,
    default: false
  }
});


userSchema.pre("save", async function (next) {
 const user = this;

if(!user.isModified("password")){
    return next();
}

 try{
   const salt = await bcrypt.genSalt(20); //generate salt

   const hashPassword = await bcrypt.hash(user.password, salt); 

   user.password = hashPassword; 
   next();

 }catch(err){
   return next(err);
 }
});


userSchema.methods.comparePassword = async function(candidatePassword){
  try {
    const isMatch =  await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return false;
  }
};


const User = mongoose.model('User', userSchema);
module.exports =User;
