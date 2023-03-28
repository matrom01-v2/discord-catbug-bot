const { Client, ApplicationCommandOptionType, ChatInputCommandInteraction, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const Profile = require('../../schemas/Profile');
const file = new AttachmentBuilder('./images/bug.png');


module.exports = {

    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     * @returns 
     */
    callBack: async (client, interaction) => {
        if(!interaction.inGuild()) {
            interaction.reply(`Uuuummm I can\'t do that out of a server...`);
            return;
        }


        await interaction.deferReply();

        const mentionMember = interaction.options.getMember('friend') ?? interaction.member; // grab passed in friend or pass in person who called if null
        console.log(`Here is mentionMember: ${mentionMember}`);

        // const targetUserId = mentionMember || interaction.member.id; // if mention user es no there, grab the homie that ran the command

        // const targetUser = mentionMember ?? interaction.member;

        // const targetUserObj = await interaction.guild.members.fetch(targetUserId);

        // do the funni db query
        const friendsProfile = await Profile.findOne({
            userId: mentionMember.user.id,
            guildId: interaction.guild.id,
        });

        // is bot?
        if(mentionMember.user.bot){
            interaction.editReply(`I'm Catbug!`);
            return;
        }

        // no friend?
        if (!friendsProfile) {
            interaction.editReply(
                mentionMember ? `${mentionMember.displayName} is not friends with me yet.` : "You are not friends with me yet..."
            );
            return;
        }
        
        const name = friendsProfile.name;
        const pronouns = friendsProfile.pronouns;
        const bio = friendsProfile.bio;
        //const member = mentionMember.member;
        const userpfp = mentionMember.displayAvatarURL();


        // console.log(`This is the URL: ${userpfp}`);
        // console.log(`name here: ${name}`);
        // console.log(`pronouns here: ${pronouns}`);
        // console.log(`bio here: ${bio}`);

        const profileEmbed = new EmbedBuilder({
            color: 0x007bff,
            title:  name + '\'s profile',
            description: 'Friend of Catbug!',
            thumbnail: {
                url: userpfp,
            },
            fields: [
                {
                    name: 'Name:',
                    value: name, 
                },
                {
                    name: 'Pronouns:',
                    value: pronouns,
                },
                {
                    name: 'About ' + name + ':',
                    value: bio,
                }
            ],
            footer: {
                text: 'REBECCAA!!!!',
                icon_url: 'https://www.nicepng.com/png/detail/377-3771581_i-am-catbug-cat-bug-png.png'
            }, 
        });

        interaction.editReply({embeds: [profileEmbed], emphemeral: false});
    },


    name: 'friend',
    description: 'Catbug shows a person\'s profile!',
    options: [
        {
            name: 'friend',
            description: "The friend's profile you wanna see",
            type: ApplicationCommandOptionType.User,
        } 
    ]
}