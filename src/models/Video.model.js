import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const VideoSchema=new Schema({

        videoFile:{
            type:String, //cloud
            required:true
        },
        
        thumbnail:{
            type:String, //cloud
            required:true
        },
        
        Title:{
            type:String, 
            required:true
        },
        
        Desc:{
            type:String, 
            required:true
        },
        
        Duration:{
            type:String, //cloud
            required:true
        },
        Views:{
            type:Number, //cloud
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        Owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }




},{timestamps:true})


VideoSchema.plugin(mongooseAggregatePaginate)




export const Video =mongoose.model("Video",VideoSchema)