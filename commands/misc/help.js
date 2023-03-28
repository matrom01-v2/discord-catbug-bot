const { AttachmentBuilder, EmbedBuilder} = require('discord.js');
const file = new AttachmentBuilder('./images/catbugpfp.gif');


const helperEmbed = new EmbedBuilder({
    color: 0x007bff,
    title: 'Helpies',
    image: {
        url: 'attachment://catbugpfp.gif',
    },
    description: 'Yeah! Everything is okay!',
    thumbnail: {
        url: 'https://i.kym-cdn.com/entries/icons/facebook/000/012/812/Catbug_by_sircinnamon-d5riz9k.jpg'
    },    
    fields: [
        {
            name: 'Commands available:',
            value: ''
        },
        {
            name: '/hello',
            value: 'I say hello!'
        },
        {
            name: '/help',
            value: 'I help you out!'
        },
        {
            name: '/friend',
            value: 'I display your profile!',
        },
        {
            name: '/setprofile',
            value: 'I create a profile for you!',
        },
        {
            name: '/editprofile',
            value: ' I help you edit your profile!',
        },
        {
            name: '/level',
            value: 'I display your level of friendship with me!'
        },
    ],
    footer: {
        text: 'Yea but I don\'t know how to make myself go there',
        icon_url: 'https://www.nicepng.com/png/detail/377-3771581_i-am-catbug-cat-bug-png.png'
    },
});


module.exports = {
    name: 'help',
    description: 'catbug offers you some help!',

    callBack: (client, interaction) => {
        interaction.reply({embeds: [helperEmbed], files: [file], ephemeral: true});
    }
}  