const express = require('express');
const app = express();
const authRouter = require('./routes/auth')
const commentRouter = require("./routes/comment")
const postRouter = require("./routes/post")
const userRouter = require("./routes/user")

var cors = require('cors')
const connectMongo = require('./database/db');
connectMongo();


app.use(cors())
app.use(express.json())


app.use("/api/auth",authRouter)
app.use("/api/comment",commentRouter)
app.use("/api/post",postRouter)
app.use("/api/user",userRouter)


app.listen(5000, () => {
    console.log('Example app listening on port 5000!');
});

