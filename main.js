// require dependencies
const {Client, GatewayIntentBits, IntentsBitField, Events } = require('discord.js');
const token = process.env.DISCORD_TOKEN;
const eventHandler = require('./handlers/eventHandler');
const mongoose = require('mongoose');


require("dotenv").config(); // for .env 

// declared intents
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent
], 
});


 // console.log("MY TOKEN HERE: " + process.env.DISCORD_TOKEN); 

( async () => {
    try {
        mongoose.set('strictQuery', false); // set for strict queries
        await mongoose.connect(process.env.MONGODB_URI, {keepAlive: true}); // connect to db
        console.log('Connected to DB');
        
        eventHandler(client); // cycle through events
        client.login(token); // log in discord
        
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();

// event listener for other interactions: mainly modal submissions
client.on(Events.InteractionCreate, async interaction => {

    if (!interaction.isModalSubmit()) return;

    if(interaction.customId === 'myProfile') {
        await interaction.reply(`Sugar Peas!!! Thank you ${interaction.member.displayName} for your submission!`);
    }
});

client.on(Events.GuildMemberAdd, member => {

    const channelID = process.env.WELCOME_CHANNEL.toString(); // grab channel id from env file

    // console.log(`HERE IS THE CHANNEL: ${channelID}`);

    // define channel and send welcome message
    const channel = member.guild.channels.cache.get(channelID);
    channel.send(`HIII!!! Welcome new friend @${member.displayName} to the server!!!`);
});

