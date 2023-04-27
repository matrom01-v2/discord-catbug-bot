const { Client, ApplicationCommandOptionType, ChatInputCommandInteraction, AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = {

    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    callBack: async (client, interaction) => {

        if (!interaction.inGuild()) {
            interaction.reply(`Uuuummm I can\'t do that out of a server...`);
            return;
          }

        const channelToSend = interaction.options.getChannel('location'); // location is req, grab location of message
       // console.log(`Channel id to be sent to: $${channelToSend}`);
        const message = interaction.options.getString('message');


        channelToSend.send('Catbug says:\n\n' + message);

        interaction.reply({content: 'Okay! I\'ll let them know!', ephemeral: true});


    },



    name: 'announce',
    description: 'Catbug will send an announcement to a specific channel',
    devsOnly: true,

    options: [
        {
            name: 'location',
            description: 'the channel to send the message',
            required: true,
            type: ApplicationCommandOptionType.Channel,
        },
        {
            name: 'message',
            description: 'the message to send',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        
    ]
}