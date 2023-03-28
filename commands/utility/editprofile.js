const {
  Client,
  Interaction,
  AttachmentBuilder,
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ChatInputCommandInteraction,
} = require("discord.js");
const Profile = require("../../schemas/Profile");
const file = new AttachmentBuilder("./images/bug.png");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   * @returns
   */
  callBack: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply(`Uuuummm I can\'t do that out of a server...`);
      return;
    }

    const mentionMember = interaction.member; // grab member
    console.log(`Here is mentionUser: ${mentionUser}`);

    // const targetUserId = mentionUser; // set target to passed in value

    // const targetUserObj = await interaction.guild.members.fetch(targetUserId);

    const friendsProfile = await Profile.findOne({
      userId: mentionMember.user.id,
      guildId: interaction.guild.id,
    });

    // create a modal
    const modal = new ModalBuilder()
      .setCustomId("myProfile")
      .setTitle("My Proflie");

    // add components to modal

    // create text inputs
    const nameInput = new TextInputBuilder()
      .setCustomId("nameInput")
      .setRequired(true)
      .setLabel("Hello friend! What is your name?")
      .setStyle(TextInputStyle.Short);

    const pronounsInput = new TextInputBuilder()
      .setCustomId("proInput")
      .setRequired(true)
      .setLabel("What are your pronouns?")
      .setStyle(TextInputStyle.Short);

    const bioInput = new TextInputBuilder()
      .setCustomId("bioInput")
      .setRequired(true)
      .setLabel("Tell me about yourself!")
      .setStyle(TextInputStyle.Paragraph);

    // Actions rows only hold one text input
    // need one per row
    const firstRow = new ActionRowBuilder().addComponents(nameInput);
    const secondRow = new ActionRowBuilder().addComponents(pronounsInput);
    const thirdRow = new ActionRowBuilder().addComponents(bioInput);

    modal.addComponents(firstRow, secondRow, thirdRow);

    // display das modal to the funni user
    await interaction.showModal(modal);

    const submission = await interaction.awaitModalSubmit({
      time: 60000,
    });

    if (!submission) {
      return;
    }

    const name = submission.fields.getTextInputValue("nameInput");
    const pronouns = submission.fields.getTextInputValue("proInput");
    const bio = submission.fields.getTextInputValue("bioInput");

    try {
      friendsProfile.name = name;
      friendsProfile.pronouns = pronouns;
      friendsProfile.bio = bio;

      await friendsProfile.save();
      console.log(`Profile sucessfully edited!`);
    } catch (error) {
      console.log(`Error adding profile: ${error}`);
    }
  },

  name: "editprofile",
  description: "Catbug edits a friends profile!",
};
