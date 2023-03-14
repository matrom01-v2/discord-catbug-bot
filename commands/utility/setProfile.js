const { Client, Interaction, ApplicationCommandOptionType, AttachmentBuilder } = require('discord.js');
const Profile = require('../../schemas/Profile');
const Level = require('../../schemas/Level');
const canvacord =  require('canvacord');


module.exports = {



    /**
     * 
     * @param {Client} client 
     * @param {Interact} interaction 
     */
    callBack: async (client, interaction) => {

        if(!interaction.inGuild()) {
            interaction.reply(`Uuuummm I can\'t do that out of a server...`);
            return;
        }

        
    }
}