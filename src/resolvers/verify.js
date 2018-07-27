//verifica si el token es valido
import User from '../models/users';
import jwt from 'jsonwebtoken';

const expiresIn = "3d";//duracion del token
const secret = "samplejwtinstagram"; //en vez del salt,variable de entorno
const tokenPrefix = "JWT";//el prefijo para el header a la hora de mandarselo
//es mejor hacer todo lo d econst con variables de entorno CHECARLO

export const verifyToken = (token) => {
	try{
		const [prefix,recivedToken] = token.split(' ');
		let user = null;
		if(!recivedToken){
			throw new Error('No token provider');
		}

		if(prefix != tokenPrefix){
			throw new Error('Invalid header format');
		}
		jwt.verify(recivedToken,secret,(err,payload) => { //verificamos el token 
			if(err){ 
				throw new Error("Invalid Token");
			}else{
				user = User.findById(data.id).exec();
			}

		})

       if (!user) {throw new Error("User doesnt exist");}
       return user;

}catch(err){
		throw Error("Error not expected");
	}
}