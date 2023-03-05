// require dependencies
const {Client, GatewayIntentBits, IntentsBitField } = require('discord.js');
const token = process.env.DISCORD_TOKEN;
const eventHandler = require('./handlers/eventHandler');
const mongoose = require('mongoose');


require("dotenv").config();


const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
], 
});


// console.log("MY TOKEN HERE: " + process.env.DISCORD_TOKEN); // test test test

( async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URI, {keepAlive: true});
        console.log('Connected to DB');
        
        eventHandler(client);
        client.login(token);
        
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();


