const { Client, Interaction, ApplicationCommandOptionType, AttachmentBuilder, ChatInputCommandInteraction } = require('discord.js');
const Level = require('../../schemas/Level');
const canvacord =  require('canvacord');
const calculateLevelXp = require('../../util/calculateLevelXp');


module.exports = {

    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    callBack: async (client, interaction) => {
        if(!interaction.inGuild()) {
            interaction.reply(`Uuuummm I can\'t do that out of a server...`);
            return;
        }


        await interaction.deferReply();

        const mentionMember = interaction.options.getMember('friend') ?? interaction.member;; // grab passed in friend
        console.log(`Here is mentionUser: ${mentionMember}`);

        // const targetUserId = mentionUser || interaction.member.id; // if mention user es no there, grab the homie that ran the command

        // const targetUserObj = await interaction.guild.members.fetch(targetUserId);

        const friendsLevel = await Level.findOne({
            userId: mentionMember.user.id,
            guildId: interaction.guild.id,
        });

        // check if the funny is a bot
        if(mentionMember.user.bot){
            interaction.editReply(`I'm Catbug!`);
            return;
        }

        // no friend?
        if (!friendsLevel) {
            interaction.editReply(
                mentionMember ? `${mentionMember.displayname} is not friends with me yet.` : "You are not friends with me yet..."
            );
            return;
        }

        let allLevels = await Level.find({ guildId: interaction.guild.id }).select('-_id userId level xp');// grab necessities from db

        // sort through all levels 
        allLevels.sort((a, b) => {
            if (a.level === b.level) {
                return b.xp = a.xp; // get homie with more xp
            }
            else {
                return b.level - a.level;
            }
        });

        let currentRank = allLevels.findIndex((lvl) => lvl.userId === mentionMember.user.id) + 1; // grab homie ranks

        // create rank card
        const rank = new canvacord.Rank()
            .setAvatar(mentionMember.displayAvatarURL({size: 256}))
            .setRank(currentRank)
            .setLevel(friendsLevel.level)
            .setCurrentXP(friendsLevel.xp)
            .setRequiredXP(calculateLevelXp(friendsLevel.level))
            .setProgressBar('#932BE3', 'COLOR')
            .setUsername(mentionMember.user.username)
            .setDiscriminator(mentionMember.user.discriminator);

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