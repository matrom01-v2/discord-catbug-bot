// require dependencies
const {Client, GatewayIntentBits, IntentsBitField, Events } = require('discord.js');
const token = process.env.DISCORD_TOKEN;
const eventHandler = require('./handlers/eventHandler');
const mongoose = require('mongoose');


require("dotenv").config();


const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
], 
});


 // console.log("MY TOKEN HERE: " + process.env.DISCORD_TOKEN); // test test test

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


