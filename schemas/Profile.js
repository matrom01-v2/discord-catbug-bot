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

    name: {
        type: String,
        default: '',
    },

    pronouns: {
        type: String,
        default: '',
    },

    bio: {
        type: String,
        default: '',
    }
    
});


module.exports = model('Profile', profileSchema); 