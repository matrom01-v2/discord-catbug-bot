module.exports = {
    name: 'hello',
    description: 'Catbug says hi!',
    // options: Object[],

    callBack: (client, interaction) => {
        interaction.reply('Hello I\'m Catbug!!!!')
    }
}