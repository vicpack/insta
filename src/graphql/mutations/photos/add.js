import {
	GraphQLNonNull
} from 'graphql'

import Photos from '../../../models/photos';
import {PhotosInputType,PhotosType} from '../../types/photos';

export default{
	type:PhotosType,
	args:{
		data:{
			type:new GraphQLNonNull(PhotosInputType)
		}
	},

	resolve(root,params){
		const photos = new Photos(params.data); //creando un nuevo objeto usuario
		const newPhotos = photos.save();
		if(!newPhotos)throw new Error("Error al agregar una foto");
		return newPhotos
	}
}