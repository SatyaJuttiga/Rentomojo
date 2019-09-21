var mongoose=require('mongoose');

var newsSchema=new mongoose.Schema({
    name:String,
    description:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});
var News = module.exports = mongoose.model('News', newsSchema);
