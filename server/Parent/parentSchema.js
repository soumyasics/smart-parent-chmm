const mongoose = require("mongoose");

const parentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type:String,
            unique:true,
            required:true,
           
            dropDups: true
        },
        password: {
            type: String,
            required: true,
        },
        contact: {
            type: Number,
        },
        parentalStatus: {
            type: String,
            required: true,
        }, password: {
            type: String
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("parents", parentSchema);
