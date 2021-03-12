// Installation Package Use 
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const redis = require("./Config/Redis")
require("dotenv").config();


// Request method link
const productRoutes = require('./Routes/Products');
const orderRoutes   = require('./Routes/Orders');
const userRoutes = require('./Routes/Users');
const categoryRoutes = require('./Routes/Category');

// mongoose.connect("mongodb+srv://aldifarzum:"+ process.env.MONGO_ATLAS_PASSWORD +"@node-js-shop.yynzi.mongodb.net/"+ process.env.MONGO_ATLAS_NAME +"?retryWrites=true&w=majority",     
// mongoose.connect("mongodb://posdb:aldi67890@localhost:27017/admin",
// Database Checking Notification
mongoose.connect("mongodb://"+ process.env.MONGO_ATLAS_NAME +":"+ process.env.MONGO_ATLAS_PASSWORD +"@localhost:27017/admin",     
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('Database Connected'))
.catch(err =>console.log(err));

mongoose.Promise = global.Promise;


redis
    .redisCheck()
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })

// Use app package 
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin","*");
//     res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if (req,method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, EDIT');
//         return res.status(200).json({});
//     }
//     next();
// });

// Handle request routes 
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use('/category', categoryRoutes);

// Handling error code to user friendly notification
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;