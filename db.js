const mongoose = require('mongoose');
const mongoURL =  process.env.MONGODB_URL_LOCAL || 'mongodb://127.0.0.1:27017/voting';
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('MongoDB connected successfully');
});
db.on("error",(err)=>{
    console.log(err);
});

module.exports = db;

