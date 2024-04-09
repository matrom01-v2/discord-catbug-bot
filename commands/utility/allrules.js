const {
  Client,
  ChatInputCommandInteraction,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");

const Rule = require("../../schemas/Rule");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  callBack: async (client, interaction) => {
    if (!interaction.inGuild()) {
      await interaction.reply("Ummm. I can't do that outside a server");
    }

    // grab all and sort rules
    const allRules = await Rule.find({ guildId: interaction.guild.id }).sort({
      number: 1,
    });

    // console.log(`Here are the rules: ${allRules}`);
    // console.log(`here is the size: ${allRules.length}`);
    // interaction.reply('sorting rules...');

    const allRuleArray = [];

    for (const rule of allRules) {
      // console.log(`Here is number: ${rule.number}`);
      allRuleArray.push(`\n${rule.number}: ${rule.title}`);
    }

    // console.log(allRuleSet);

    const allRulesEmbed = new EmbedBuilder({
      color: 0x007bff,
      title: "Server Rules",
      thumbnail: {
        url: "https://i.pinimg.com/564x/5e/7d/c3/5e7dc343cd314ceb442a151e95e86193.jpg",
      },
      fields: [
        {
          name: "Rules:",
          value: `${allRuleArray.toString()}`,
        },
      ],
    });

    interaction.reply({ embeds: [allRulesEmbed], emphemeral: false });
  },

  name: "show-all-rules",
  description: "Catbug shows a list of all the rules in your server!",
  type: ApplicationCommandOptionType.User,
};
