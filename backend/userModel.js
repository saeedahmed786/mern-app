import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
     type: String,
     required: true,
     dropDups: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: Number,
        required: true,
        default: 0
    },
   },
     {timestamps: true}
);



const User = mongoose.model('user', userSchema);
export default User;