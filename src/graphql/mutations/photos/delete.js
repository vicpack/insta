import {
	GraphQLNonNull,
	GraphQLID
} from 'graphql'


import Photos from '../../../models/photos';
import {PhotosInputType,PhotosType} from '../../types/photos';

export default{
	type:PhotosType,
	args:{
		id:{
			name:"ID",
			type: new GraphQLNonNull(GraphQLID)
		}
	},

	resolve(root,params){
		const deletedPhoto = Photos.findByIdAndRemove(params.id).exec()
		if(!deletedPhoto) throw new Error("Error al borrar usuario");
		return deletedPhoto
	}
}