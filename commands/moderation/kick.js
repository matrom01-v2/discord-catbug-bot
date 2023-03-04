const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');


module.exports = {
    /**
     * this is for intellisense
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callBack: async (client, interaction) => {

        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "no reason provided";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        // check if user is already gone or doesnt exist
        if(!targetUser) {
            await interaction.editReply("I don\'t think that person is here...");
            return;
        }

        // ensure owner cannot be banned lol
        if(targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply("Why would you do that??");
            return;
        }

        // role check
        const targetUserRolePosition = targetUser.roles.highest.position; // highes role of target user
        const requestUserRolePosition = interaction.member.roles.highest.position; // highest role of user of command
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // highest role of bot

        // ensure my people are not abusing their power
        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply("We are ALL friends here, why kill each other?");
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("I won\'t kill my commanders!");
            return;
        }

        // catbug can now kill the user
        try {
            await targetUser.kick( reason );
            await interaction.editReply(`Throw this noise maker ${targetUser} out the airlock for ${reason}. Now, where's my big ol' beer? There you are, yes. *slurp*`);
        } catch (error) {
            console.log(`Error in kick command: ${error}`);
        }

    },


    name: 'kick',
    description: 'Catbug kicks a user!',
    devsOnly: true,
    deleted: false,
    // testOnly: bool
    options: [
        {
            name: 'target-user',
            description: 'Who am I killing?',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        }, 

        {
            name: 'reason',
            description: 'Why am I killing them?',
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissions: [PermissionFlagsBits.KickMembers],

};