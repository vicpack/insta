import {
	GraphQLNonNull,
	GraphQLID
} from 'graphql'

import Photos from '../../../models/photos';
import {PhotosInputType,PhotosType} from '../../types/photos';

export default {
	type:PhotosType,
	args:{
		id:{
			name:"ID",
			type:new GraphQLNonNull(GraphQLID)
		},
		data:{
			name:"data",
			type:new GraphQLNonNull(PhotosInputType)
		}
	},
	resolve(root,params){
		return Photos.findByIdAndUpdate(params.id,{$set:{...params.data}}
			).then((photos) => {
					return photos
			}).catch((err) => {
				throw new Error("Error al hacer update")
			})
	}
}