const { Client, Message, ApplicationCommandOptionType: {Integer}, ChatInputCommandInteraction, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const rules = require('../../data/rules.json');
// @ts-check
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

        const ruleNo = interaction.options.getInteger('rule-number'); // desiered rule no


        if (!rules.hasOwnProperty(ruleNo)) {
            interaction.reply('I don\'t think this rule exists.');
            return;
        }

        interaction.reply(`${rules[1].name}`); // yuh check the funni json

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