import {GraphQLList} from 'graphql';
import Photos from '../../../models/photos';
import {PhotosType} from '../../types/photos';


const queryFeed={ type:new GraphQLList(PhotosType),
    resolve(){
        const photos = Photos.find().exec()
        if(!photos) throw new Error("Error al traer la BD")
        return photos;
    }
}




export default queryFeed;