const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors= require('cors');
const app=express();
const knex= require('knex');
const register= require('./controllers/register');
const signin=require('./controllers/signin');
const image=require('./controllers/image');
const profile=require('./controllers/profile');

const db= knex ({
	client: 'pg',
	connection: {
		host     : 'localhost',
		user     : 'postgres',
		password : 'test',
		database : 'smart_brain',
		}
	}) ;

app.use(bodyParser.json());
app.use(cors());


app.post('/signin' , (req,res)=> {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register' , (req,res)=> {register.handleRegister(req,res,db,bcrypt)})
	
app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image' , (req,res)=> {image.handleImage(req,res,db)})
app.post('/imageUrl' , (req,res)=> {image.handleApiCall(req,res)})
app.listen(3000,()=> {
	console.log('app is running on port 3000')
})


/*



var hash = bcrypt.hashSync("bacon");

bcrypt.compareSync("bacon", hash); // true
bcrypt.compareSync("veggies", hash); // false
Asynchronous



// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});


/*
/ --> res = this is working
/ signin --> POST = success/fail
/ register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/