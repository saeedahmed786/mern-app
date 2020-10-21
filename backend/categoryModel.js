import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    }
},  {timestamps: true}
);

const CategoryModel = mongoose.model('Category', categorySchema);
export default CategoryModel;