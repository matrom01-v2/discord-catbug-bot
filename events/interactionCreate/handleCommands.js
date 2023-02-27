const getLocalCommands = require("../../util/getLocalCommands");

const { devs, testServer } = require('../../config.json');
const { permissionsRequired } = require("../../commands/moderation/ban");



module.exports = async (client, interaction) => {
    if(!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find(   
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;

        // check if command is dev only
        if(commandObject.devsOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: 'You\'re in a position to demand nothing, kitchen wench Tezuka.',
                    ephemeral: true,
                });
                return;
            }    
        }

        // check if valid server
        if(commandObject.testOnly) {
            if (!interaction.guild.id === testServer) {
                interaction.reply({
                    content: 'Uuuuummm I can\'t do that here.',
                    ephemeral: true,
                });
                return;
            }    
        }

        // check for permissions
        if (commandObject.permissionsRequired?.length) {
            for (const permissionsRequired of commandObject.permissionsRequired) {
                if(!interaction.member.permissions.has(permissionsRequired)) {
                    interaction.reply({
                        content: 'Momma said, you can\'t do that.',
                        ephemeral: true,
                    });
                    return;
                }
            }
        }

        await commandObject.callBack(client, interaction);


    } catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }

    console.log(`Incoming interaction: ${interaction.commandName}`); // prints incoming interaction
};