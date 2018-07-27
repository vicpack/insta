import {GraphQLNonNull,GraphQLID} from 'graphql';
import Photo from '../../../models/photos';
import {PhotosType} from '../../types/photos';


const querySinglePhoto = {
	type:PhotosType,
	args:{
		id:{
			name:'ID',
			type:GraphQLNonNull(GraphQLID)
		}
	},

	resolve(root,params){
		const photos = Photo.findById(params.id).exec() //si el id de antes esta con mayusuculas el de aqui debe ser lo contrario , no pueden ser iguales
		return photos
	}
}

export default querySinglePhoto;
