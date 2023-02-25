// require needed dependencies
const {REST, routes, Routes} = require('discord.js');
require("dotenv").config();


const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;


// my commands
const commands = [
    {
        name: 'hello',
        description: 'catbug says hi!',
    },
];

const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN);

// This registers slash commands
(async () => {
    try {

        console.log('Regiserting slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands }
        )

        console.log('Commands registerd successfully!');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();