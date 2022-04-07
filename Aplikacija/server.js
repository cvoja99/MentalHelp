const express= require('express');
const {sequelize,User} = require('./models');
const app=express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/',(req,res) => res.send('API Running'));

const PORT=process.env.PORT|| 5000;
//napravi usera
app.post("/users", async(req,res) =>{
    const { tip, email, password,username} = req.body
    try{
        const user = await User.create({tip, email,password,username});
        return res.json(user);
    }catch(err){
        return res.status(500).json(err);
    }})
//vrati usera sa IDem
app.get("/users", async(req,res) =>{
        try{
            const users = await User.findAll({include:'posts'});
            return res.json(users);
        }catch(err){
            return res.status(500).json({err: "An error occured"});
        }
    });
app.listen(PORT, async ()=> {
    console.log(`Server started on port ${PORT}`);
    await sequelize.sync({ force: true });
});
    