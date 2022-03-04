const express = require('express');
const app = express();
const authRouter = require('./routes/auth')

var cors = require('cors')
const connectMongo = require('./database/db');
connectMongo();


app.use(cors())
app.use(express.json())


app.use("/api/auth",authRouter)


app.listen(5000, () => {
    console.log('Example app listening on port 5000!');
});

