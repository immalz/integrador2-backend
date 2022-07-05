import mongoose from 'mongoose';
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECT_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(db => console.log('Database is connected'))
    .catch(error => console.log(error));
