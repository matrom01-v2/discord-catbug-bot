const { EmbedBuilder } = require("discord.js");

const catbugEmbed = new EmbedBuilder({
  color: 0x007bff,
  title: "Catbug's profile",
  description: "I'm Catbug!",
  thumbnail: {
    url: "https://i.imgur.com/3vc1vPT.gif",
  },
  fields: [
    {
      name: "Name:",
      value: "Catbug",
    },
    {
      name: "Pronouns:",
      value: "he/him",
    },
    {
      name: "About Catbug:",
      value: "Hello!!! I'm Catbug! Your helpful discord buddy!",
    },
  ],
  footer: {
    text: "REBECCAA!!!!",
    icon_url:
      "https://www.nicepng.com/png/detail/377-3771581_i-am-catbug-cat-bug-png.png",
  },
});

module.exports = catbugEmbed;
