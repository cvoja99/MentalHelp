const userRouter=require("./routes/user");
const postRouter=require("./routes/post");
const commentRouter=require("./routes/comment");
const whisperRouter=require("./routes/whisper");
const authRouter=require("./routes/auth");
const express= require('express');
const {sequelize,User,Post,Comment} = require('./models');
const app=express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/users",userRouter);
app.use("/posts",postRouter);
app.use("/comments",commentRouter);
app.use("/whispers",whisperRouter);
app.use("/auth",authRouter);
const PORT=process.env.PORT|| 5000;



app.listen(PORT, async ()=> {
    console.log(`Server started on port ${PORT}`);
    await sequelize.authenticate({ force: true });
});
    