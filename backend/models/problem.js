const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    city_id:{type:Schema.Types.ObjectId,ref:'City',required:true},
    area_id:{type:Schema.Types.ObjectId,ref:'Area',required:true},
    user_id:{type:Schema.Types.ObjectId,ref:'User',required:true},
    is_resolved:{type:Boolean,default:false},
});

module.exports = mongoose.model('Problem', problemSchema);