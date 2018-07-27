import {GraphQLNonNull,GraphQLID} from 'graphql';
import User from '../../../models/users';
import {UserType} from '../../types/users';

const querySingleUser = {
	type:UserType,
	args:{
		id:{
			name:'ID',
			type:GraphQLNonNull(GraphQLID)
		}
	},

	resolve(root,params){
		const user = User.findById(params.id).exec() //si el id de antes esta con mayusuculas el de aqui debe ser lo contrario , no pueden ser iguales
		return user
	}
}

export default querySingleUser;