const {Schema, model} = require('mongoose');
const { INTEGER } = require('sequelize');

const ruleSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },

    guildId: {
        type: String,
        required: true,
    },

    number: {
        type: String,
        required: true,
        default: '',
    },

    title: {
        type: String,
        required: true,
        default: '',
    },

    description: {
        type: String,
        default: '',
    },

});

module.exports = model('Rule', ruleSchema);