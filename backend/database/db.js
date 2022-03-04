const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost/instagram"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, {
        // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true})
}

module.exports = connectToMongo;