const { Client, Interaction, ApplicationCommandOptionType, AttachmentBuilder } = require('discord.js');
const Level = require('../../schemas/Level');
const canvacord =  require('canvacord');
const calculateLevelXp = require('../../util/calculateLevelXp');


module.exports = {

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callBack: async (client, interaction) => {
        if(!interaction.inGuild()) {
            interaction.reply(`Uuuummm I can\'t do that out of a server...`);
            return;
        }


        await interaction.deferReply();

        const mentionUser = interaction.options.get('friend')?.value; // grab passed in friend
        console.log(`Here is mentionUser: ${mentionUser}`);

        const targetUserId = mentionUser || interaction.member.id; // if mention user es no there, grab the homie that ran the command

        const targetUserObj = await interaction.guild.members.fetch(targetUserId);

        const friendsLevel = await Level.findOne({
            userId: targetUserId,
            guildId: interaction.guild.id,
        });

        if (!friendsLevel) {
            interaction.editReply(
                mentionUser ? `${targetUserObj.user.tag} is not friends with me yet.` : "You are not friends with me yet..."
            );
            return;
        }

        let allLevels = await Level.find({ guildId: interaction.guild.id }).select('-_id userId level xp');

        allLevels.sort((a, b) => {
            if (a.level === b.level) {
                return b.xp = a.xp; // get homie with more xp
            }
            else {
                return b.level - a.level;
            }
        });

        let currentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;

        const rank = new canvacord.Rank()
            .setAvatar(targetUserObj.user.displayAvatarURL({size: 256}))
            .setRank(currentRank)
            .setLevel(friendsLevel.level)
            .setCurrentXP(friendsLevel.xp)
            .setRequiredXP(calculateLevelXp(friendsLevel.level))
            .setStatus(targetUserObj.presence.status)
            .setProgressBar('#932BE3', 'COLOR')
            .setUsername(targetUserObj.user.username)
            .setDiscriminator(targetUserObj.user.discriminator);

        const data = await rank.build();
        const attachment = new AttachmentBuilder(data);
        interaction.editReply({ files: [attachment]});
    }, 
    
    name: 'level',
    description: "Catbug displays the firendship level of a user!",
    options: [
        {
            name: 'friend',
            description: "The friend's level you wanna see",
            type: ApplicationCommandOptionType.User,
        }    
    ]
}