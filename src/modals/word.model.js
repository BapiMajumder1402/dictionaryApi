import mongoose from 'mongoose';
import meaningSchema from './meaning.model.js'; 


const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true, 
  },
  meanings: {
    type: [meaningSchema],
  }
}, { timestamps: true }); 


const Word = mongoose.model('Word', wordSchema);
export default Word;
