// require dependencies
const {REST, routes, Routes} = require('discord.js');
const {Client, GatewayIntentBits} = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = process.env.GUILD_ID;
console.log("my token: " + process.env.DISCORD_TOKEN);


const commands = [
    {
        name: 'hello',
        description: 'catbug says hi!',
    },
];

const rest = new REST({verson: '10'}).setToken();

// this is from discord documentation, I assume it is necessary
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        rest.put(Routes.applicationGuildCommands(client.user.id, GUILD_ID), { body: commands});

        console.log('Successfully reloaded applciation (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    
    if(!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hello') {
        await interaction.reply('Hi I\'m catbug!!!');
    }
})


client.login(TOKEN);