const {Client, Message} = require('discord.js');




/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = async (client, message) => {

    // check for messages in guilds and ignore the funni bots
    if(!message.inGuild() || message.author.bot) {
        return;
    }


    let messageContent = message.content.toString(); // convert message to string

    if(messageContent.toLowerCase().includes("no thanks") && messageContent.toLowerCase().includes("catbug")) {
       return;
    }

    messageContent = messageContent.toLowerCase();

    if( (messageContent.includes("good job") || messageContent.includes("thank")) || messageContent.includes("love") && messageContent.includes("catbug")) {
        await message.react('💖');
    }
}