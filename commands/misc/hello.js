const { ChatInputCommandInteraction } = require("discord.js")



module.exports = {
    name: 'hello',
    description: 'Catbug says hi!',
    // options: Object[],

    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    callBack: (client, interaction) => {
        interaction.reply({files: ["./images/catbughello.mp4"]}, "Hello!!!");
    }
}