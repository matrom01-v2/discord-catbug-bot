const { Client, Message, ApplicationCommandOptionType: {Integer}, ChatInputCommandInteraction, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const rules = require('../../data/rules.json');
const file = new AttachmentBuilder('./images/bug.png');
// @ts-check







module.exports = {


    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     * @returns 
     */
    callBack: async (client, interaction) => {

        const ruleNo = interaction.options.getInteger('rule-number'); // desiered rule no

        
        

        if(!interaction.inGuild()) {
            interaction.reply(`Uuuummm I can\'t do that out of a server...`);
            return;
        }



        if (!rules.hasOwnProperty(ruleNo)) {
            interaction.reply('Uuuummm I don\'t think this rule exists...');
            return;
        }
        
        else{

            const ruleEmbed = new EmbedBuilder({
                color: 0x007bff,
                title: 'City of Faith Cult Guide',
                description: 'Yeah! Everything is okay!',
                thumbnail: {
                    url: 'attachment://bug.png'
                },    
                fields: [
                    {
                        name: rules[ruleNo].name,
                        value: rules[ruleNo].description,
                    },
                ],
                footer: {
                    text: 'Yea but I don\'t know how to make myself go there',
                    icon_url: 'https://www.nicepng.com/png/detail/377-3771581_i-am-catbug-cat-bug-png.png'
                },
            });
            
            interaction.reply({embeds: [ruleEmbed], files: [file], ephemeral: false});
   
         }
            

    }, 

    name: 'rules',
    description: 'catbug tells you a rule!',
    options: [{

            name: 'rule-number',
            description: 'the number of rule you want',
            required: true,
            type: Integer,
        }
    ],
}