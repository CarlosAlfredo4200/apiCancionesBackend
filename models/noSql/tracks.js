const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');


const TrackScheme = new mongoose.Schema(
    {
        name:{
            type:String
        },
        album:{
            type:String
        },
        cover:{
            type:String,
            validate:{
                validator:(req)=>{
                    return true;
                },
                message:"Error_url"
            }
        },
        artist:{
            name:{
                type: String,
            },
            nickname:{
                type:String,
            },

            nationality: {
                type: String
            },
        },
        duration:{
            start:{
                type: Number,
            },
            end:{
                type:Number
            }
        },

        //24 caracteres 
        mediaId:{
            type: mongoose.Types.ObjectId,
        },
    },
    {
        timestamps:true,
        versionKey:false
    },
);

TrackScheme.plugin(mongooseDelete, {overrideMethods:'all'});
module.exports = mongoose.model("tracks", TrackScheme)