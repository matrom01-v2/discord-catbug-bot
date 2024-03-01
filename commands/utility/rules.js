const {
  Client,
  ApplicationCommandOptionType: { Integer },
  ChatInputCommandInteraction,
  AttachmentBuilder,
  EmbedBuilder,
} = require("discord.js");
const Rule = require('../../schemas/Rule')
const file = new AttachmentBuilder("./images/bug.png");
// @ts-check

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   * @returns
   */
  callBack: async (client, interaction) => {
    const ruleNo = interaction.options.getInteger("rule-number"); // desiered rule no

    // check for guild
    if (!interaction.inGuild()) {
      interaction.reply(`Uuuummm I can\'t do that out of a server...`);
      return;
    }

    // look for rule in db based on passed in number
    const foundRule = await Rule.findOne({
      guildId: interaction.guild.id,
      number: ruleNo,
    })


    // check if rule num exists
    if(!foundRule) {
      interaction.reply(`Hmmm, I don't think that rule exists...`);
      return;

    } else {
      // create embed for rule
      const ruleEmbed = new EmbedBuilder({
        color: 0x007bff,
        title: `Rule ${foundRule.number}`,
        description: "Yeah! Everything is okay!",
        thumbnail: {
          url: "attachment://bug.png",
        },
        fields: [
          {
            name: foundRule.title,  // number of rule 
            value: foundRule.description,      // description from db
          },
        ],
        footer: {
          text: "Yea but I don't know how to make myself go there",
          icon_url:
            "https://www.nicepng.com/png/detail/377-3771581_i-am-catbug-cat-bug-png.png",
        },
      });

      // send the embed back
      interaction.reply({
        embeds: [ruleEmbed],
        files: [file],
        ephemeral: false,
      });
    }
  },

  name: "rules",
  description: "catbug tells you a rule!",
  options: [
    {
      name: "rule-number",
      description: "the number of rule you want",
      required: true,
      type: Integer,
    },
  ],
};
