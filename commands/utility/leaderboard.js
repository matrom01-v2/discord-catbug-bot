const {
  Client,
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  AttachmentBuilder,
  EmbedBuilder,
} = require("discord.js");

const Level = require("../../schemas/Level");
const Profile = require("../../schemas/Profile");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  callBack: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply(`Uuuummm I can\'t do that out of a server...`);
      return;
    }

    // grab the funni top 5
    const topLeaders = await Level.find({ guildId: interaction.guild.id })
      .limit(5)
      .sort({ level: -1 }); // grab the top 5 homies in ascending order


    // helper function to grab user's name from query
    async function getName(index) {
      let currentUser = await interaction.guild.members.fetch(
        topLeaders[index].userId
      );

      return currentUser.displayName;
    }

    // create embed 
    const leaderEmbed = new EmbedBuilder({
      color: 0x007bff,
      title: "Catbug's Best Friends",
      thumbnail: {
        url: "https://i.pinimg.com/564x/5e/7d/c3/5e7dc343cd314ceb442a151e95e86193.jpg",
      },
      image: {
        url: "https://media.tenor.com/iXKL48-rxU8AAAAC/catbug-bravest-warriors.gif",
      },
      fields: [
        {
          name: "Rank 1",
          value: await getName(0),
        },
        {
          name: "Rank 2",
          value: await getName(1),
        },
        {
          name: "Rank 3",
          value: await getName(2),
        },
        {
          name: "Rank 4",
          value: await getName(3),
        },
        {
          name: "Rank 5",
          value: await getName(4),
        },
      ],
      footer: {
        text: "REBECCAA!!!!",
        icon_url:
          "https://www.nicepng.com/png/detail/377-3771581_i-am-catbug-cat-bug-png.png",
      },
    });

    interaction.reply({ embeds: [leaderEmbed], emphemeral: false }); // SEND IT BABY
  },

  name: "leaderboard",
  description: "shows the top 5 friends with catbug",
  type: ApplicationCommandOptionType.User,
};
