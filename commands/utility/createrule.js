const {
  Client,
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ApplicationCommandOptionType: { Integer },
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

const Rule = require("../../schemas/Rule");

module.exports = {
  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   * @returns
   */
  callBack: async (client, interaction) => {
    // if (!interaction.inGuild()) {
    //   interaction.reply(`Uuuummm I can\'t do that out of a server...`);
    //   return;
    // }

    const userRuleNumInput = interaction.options.getInteger("rulenum");
    console.log(`userRuleNumInput is: ${userRuleNumInput}`);

    const foundRule = await Rule.findOne({
      guildId: interaction.guild.id,
      number: userRuleNumInput,
    });

    if (foundRule) {
      console.log(`Found rule in db!!!!`);
      interaction.reply(
        `Hey silly! You already made Rule ${userRuleNumInput}.`
      );
      return;
    }

    // create modal
    const modal = new ModalBuilder()
      .setCustomId("newRule")
      .setTitle("New Rule");

    // create text input
    const titleInput = new TextInputBuilder()
      .setCustomId("titleInput")
      .setRequired(true)
      .setLabel("Name of new Rule")
      .setStyle(TextInputStyle.Short);

    const descriptionInput = new TextInputBuilder()
      .setCustomId("descriptionInput")
      .setRequired(true)
      .setLabel("What's the rule?")
      .setStyle(TextInputStyle.Paragraph);

    // reminder that action rows hold only one text input
    // const firstRow = new ActionRowBuilder().addComponents(ruleNumberInput);
    const firstRow = new ActionRowBuilder().addComponents(titleInput);
    const secondRow = new ActionRowBuilder().addComponents(descriptionInput);

    modal.addComponents(firstRow, secondRow);

    // display the modal
    await interaction.showModal(modal);

    // time limit submission
    const submission = await interaction.awaitModalSubmit({
      time: 240000,
    });

    if (!submission) {
      return;
    }

    const number = userRuleNumInput;
    const title = submission.fields.getTextInputValue("titleInput");
    const description = submission.fields.getTextInputValue("descriptionInput");

    try {
      const newRule = new Rule({
        userId: interaction.member.user.id,
        guildId: interaction.guild.id,
        number: number,
        title: title,
        description: description,
      });
      await newRule.save();
      console.log(`New rule ${number} successfully saved to db!`);
    } catch (error) {
      console.log(`Error adding new rule ${number} with error: ${error}`);
    }
  },

  name: "makerule",
  description: "catbug makes a rule for your server, all hail",
  options: [
    {
      name: "rulenum",
      description: "rule number",
      required: true,
      type: Integer,
    },
  ],
};
