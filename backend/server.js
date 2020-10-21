import express from 'express';
const app = express();
import data from './data';
import path from 'path';
import mongoose from 'mongoose';
import UserRoutes from './UserRoutes';
import bodyParser from 'body-parser';
import productRoutes from './productRoutes';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';





// Connection
dotenv.config();
mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('connected to db'))
.catch( error => {
    console.log( error.message);
});


//MiddleWare
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(__dirname+ '/uploads'));
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static(__dirname+ '/uploads'));
app.use(cookieParser());
app.use('/api/users', UserRoutes);
app.use('/api/products', productRoutes);


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));

    });
}


// app.get( '/api/products/:id',  (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find( x=> x._id ===productId);
//     if (product) {
//         res.send(product);
        
//     } else 
//         res.status(404).send({msg: 'Product Not Found'});

    
// });


// app.get('/api/products', async (req, res) => {
    
//     res.send(data.products);

// });


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Listening to port 5000'));