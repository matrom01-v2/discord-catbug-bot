const { ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');


module.exports = {
    name: 'ban',
    description: 'Catbug slays a user!',
    devsOnly: true,
    deleted: false,
    // testOnly: bool
    options: [
        {
            name: 'target-user',
            description: 'the user to ban',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        }, 

        {
            name: 'reason',
            description: 'reason for ban',
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],

    callBack: (client, interaction) => {
        interaction.reply('Throw this noise maker out the airlock.');
    },
};