import jwt from 'jsonwebtoken';
import User from '../models/users';

const expiresIn = "1d";
const secret = "samplejwtinstagram";
const tokenPrefix = "JWT";


export const createToken = function (email,password) {

   if(!email || !password) {
       return false
   }

   const user = User.findOne({'email':email}).then((user) => {
       const compare = new Promise((resolve,reject) => {
           user.comparePassword(password,(err,isMatch) => {
               if(isMatch){
                   let payload = {
                       email:user.email,
                       fullname: `${user.name} ${user.lastname}`,
                       id:user._id
                   }
                   const token = jwt.sign(payload,secret,{expiresIn});

                   resolve(token)
               }else{
                   reject(false);
               }
           })
       });

       return compare;

   }).catch((err) => {
       return err;
   });


   return user;

}
