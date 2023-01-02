const mongoose =require('mongoose')

const CodeSchema = mongoose.Schema({
    code:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Code',CodeSchema);