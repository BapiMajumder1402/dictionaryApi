import mongoose,{Schema} from 'mongoose';


const meaningSchema = new Schema({
  meaning: {
    type: String,
    required: true,
  }
});

export default meaningSchema;
