const handleProfileGet=(req,res,db)=>{
	const {id} = req.params;
	db.select('*')
	.from('users')
	.where( {id}) 
	.then(user => {	
		if (user.length) {
			res.send(user[0])
		} else {
			res.status(400).json('No found')
		}		
		})
	.catch(err=> res.status(400).json('Error getting user'))
	}
	module.exports={
		handleProfileGet
	}