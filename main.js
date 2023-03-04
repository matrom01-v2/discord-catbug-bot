// require dependencies
const {Client, GatewayIntentBits, IntentsBitField} = require('discord.js');
const token = process.env.DISCORD_TOKEN;
const eventHandler = require('./handlers/eventHandler');


require("dotenv").config();


const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
], 
});


// console.log("MY TOKEN HERE: " + process.env.DISCORD_TOKEN); // test test test

( async () => {
    try {
        eventHandler(client);
        client.login(token);
        
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();


