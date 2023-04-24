const {Client, Message} = require('discord.js');




/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = async (client, message) => {

    if(!message.inGuild() || message.author.bot) {
        return;
    }


    let messageContent = message.content.toString();

    if(messageContent.toLowerCase().includes("no thanks") && messageContent.toLowerCase().includes("catbug")) {
       return;
    }

    if(messageContent.toLowerCase().includes("thank") && messageContent.toLowerCase().includes("catbug")) {
        await message.react('💖');
    }
}