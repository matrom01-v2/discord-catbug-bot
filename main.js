// require dependencies
const {Client, GatewayIntentBits, IntentsBitField} = require('discord.js');
const token = process.env.DISCORD_TOKEN;
const eventHandler = require('./handlers/eventHandler');

require("dotenv").config();


const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
], 
});



console.log("MY TOKEN HERE: " + process.env.DISCORD_TOKEN);


eventHandler(client);


// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);
// });


// client.on('interactionCreate',  (interaction) => {
    
//     if (!interaction.isChatInputCommand()) return; // if not a good interaction, error

//     console.log(`Incoming interaction: ${interaction.commandName}`); // prints incoming interaction

//     if (interaction.commandName === 'hello')
//         interaction.reply('Hi, I\'m Catbug!!!!');
  
// })


client.login(token);