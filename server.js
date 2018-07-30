import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './src/models/users';
import {createToken} from './src/resolvers/create';
import {verifyToken} from './src/resolvers/verify';
//agregado despues de las queries
import graphQLHTTP  from 'express-graphql';
import schema from './src/graphql';
const app = express();
const PORT = process.env.PORT || 3000

mongoose.connect('mongodb://vicpack:peliculas1@ds049598.mlab.com:49598/clonegram');

const db = mongoose.connection;
db.on('error',() => console.log("Error al conectar a la BD"))
.once('open',() => console.log("Conectado a la BD!!"));


app.use(bodyParser.json());

app.post('/signup',(req,res)=>{
	let user = req.body
	User.create(user).then((user)=>{
		return res.status(201).json({"message":"Usuario creado","id":user._id})
	}).catch((err)=>{
		console.log(err);
		return res.json(err);
	})
})

app.post('/login', (req,res) =>{
    const token = createToken(req.body.email,req.body.password).then((token) => {
        res.status(201).json({token});
        
    }).catch(() => {
        res.status(403).json({
            message:"Login Failed!!!! :( Invalid credentials"
        })
    })
})
app.get('/',(req,res) => {
	res.send("Estoy funcionando");
})
//Middleware para proteger graphql
app.use('/graphql',(req,res,next) => {
    const token = req.headers['authorization'];
    try{
            req.user = verifyToken(token) //le asgina el usuario de la base de datos
            next();//para pasarse a las querys si esta bien
    }catch(error){
            res.status(401).json({message:error.message})
    }
})
app.use('/graphql',graphQLHTTP((req,res)=>({
    schema,
    graphiql:true, //cliente de graphql , abre el navegador
    pretty:true,
    context:{
        user:req.user
    }
})))

app.listen(PORT,()=>{
	console.log("Magic Happens in port" + PORT);
})