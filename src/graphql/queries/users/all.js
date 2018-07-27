import {
	GraphQLList
} from 'graphql';

import User from '../../../models/users';
import {UserType} from '../../types/users'; //tipo usuario , para la lista de usuarios

const queryAllUsers = {
	type:new GraphQLList(UserType),
	resolve(){
		const users = User.find().exec()
		if(!users)throw new Error("Error al traer de la bd")
			return users
	}
}

export default queryAllUsers;