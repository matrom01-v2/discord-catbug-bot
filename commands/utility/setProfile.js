const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const Profile = require("../../schemas/Profile");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callBack: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply(`Uuuummm I can\'t do that out of a server...`);
      return;
    }

    // await interaction.deferReply();

    const mentionMember = interaction.member; // grab passed in friend
    // console.log(`Here is mentionUser: ${mentionUser}`);

    const friendsProfile = await Profile.findOne({
      userId: mentionMember.user.id,
      guildId: interaction.guild.id,
    });

    // check if user has a profile set already
    if (friendsProfile) {
      interaction.reply("Looks like I already know who you are!\nPlease us editprofile if you want to change something.");
      return;
    }

    // send form and push values to db

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
      time: 240000,
    });

    if (!submission) {
      return;
    }
    const name = submission.fields.getTextInputValue("nameInput");
    const pronouns = submission.fields.getTextInputValue("proInput");
    const bio = submission.fields.getTextInputValue("bioInput");

    try {
      if (friendsProfile) {
        console.log(`User ${mentionMember.displayName} already has a profile.`);
        return;
      }

      const newProfile = new Profile({
        userId: interaction.user.id,
        guildId: interaction.guild.id,
        name: name,
        pronouns: pronouns,
        bio: bio,
      });

      await newProfile.save();
      console.log(`Profile sucessfully sent to db!`);
    } catch (error) {
      console.log(`Error adding profile: ${error}`);
    }
  },

  name: "setprofile",
  description: "Catbug sets a server profile for you!",
  type: ApplicationCommandOptionType.User,
};
