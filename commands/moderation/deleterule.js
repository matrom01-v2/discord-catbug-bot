const {
  Client,
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ApplicationCommandOptionType: { Integer },
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  PermissionFlagsBits
} = require("discord.js");

const Rule = require("../../schemas/Rule");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   * @returns
   */
  callBack: async (client, interaction) => {
    const ruleNumberInput = interaction.options.getInteger("rulenum");

    // all da rulez
    const allRules = await Rule.find({guildId: interaction.guild.id})
            .sort({number: 1});

    // Rule to be murdered
    const foundRule = await Rule.findOne({
      guildId: interaction.guild.id,
      number: ruleNumberInput,
    });

    // console.log(`DB found rule: ${foundRule}`);

    if (!foundRule) {
      interaction.reply(`Hmmm, I don't think that rule exists...`);
      return;
    }

    // create confirmation modal
    const confirmModal = new ModalBuilder()
      .setTitle("Delete Rule")
      .setCustomId("deleteRule");

    // confirmation
    const confirmTextbox = new TextInputBuilder()
      .setCustomId("confirm")
      .setRequired(true)
      .setLabel("Type 'confirm' to delete rule")
      .setStyle(TextInputStyle.Short);

    const confirmComponent = new ActionRowBuilder().addComponents(
      confirmTextbox
    );

    confirmModal.addComponents(confirmComponent);

    await interaction.showModal(confirmModal);

    // time limit submission
    const submission = await interaction.awaitModalSubmit({
      time: 240000,
    });

    if (!submission) {
      return;
    }

    const userConfirm = submission.fields.getTextInputValue("confirm");

    if (!userConfirm.toLowerCase() === "confirm") {
      interaction.reply("no confirm? try again");
      return;
    }

    try {




      await foundRule.deleteOne();
      console.log(`Rule ${ruleNumberInput} deleted from db!`);
    } catch (error) {
      console.log(
        `Error deleting new rule ${ruleNumberInput} with error: ${error}`
      );
    }
  },

  name: "delete-rule",
  description: "Catbug purges a rule from the existence!",
  options: [
    {
      name: "rulenum",
      description: "rule number",
      required: true,
      type: Integer,
    },
  ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],
};
