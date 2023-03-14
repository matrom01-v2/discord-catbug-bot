const { Schema, mdoel} = require('mongoose');


const profileSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },

    guildId: {
        type: String,
        required: true,
    },


    
});