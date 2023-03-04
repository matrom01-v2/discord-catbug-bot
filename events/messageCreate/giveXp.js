const { Client, Message} = require('discord.js');
const Level = require('../../schemas/Level');
const calculateLevelXp = require('../../util/calculateLevelXp');

// return a value between min and max
function getRandomXp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = async (client, message) => {
    if(!message.inGuild() || message.author.bot) return;

    const xpToGive = getRandomXp(5, 15);

    // seaches DB for specific field type
    const query = {
        userId: message.author.id,
        guildId: message.guild.id,
    };

    try {
        const level = await Level.findOne(query); // pass in query

        if(level) {
            level.xp += xpToGive;

            if (level.xp > calculateLevelXp(level.level)) {
                level.xp = 0;
                level.level += 1;

                message.channel.send(`${message.member} has leveled up to ${level.level}! Yay!`);   
            }

            // update the funny level in DB
            await level.save().catch((e) => {
                console.log(`Error in updating level schema`);
                return;
            })
        }

        // if level is no there, create a new one
        // this literally adds a new entry into table
        else {
            const newLevel = new Level({
                userId: message.author.id,
                guildId: message.guild.id,
                xp: xpToGive,
            });

            await newLevel.save().catch((e) => {
                console.log(`Error in adding level to table`);
                return;
            })
        }


    } catch (error) {
        console.log(`Error giving xp: ${error}`)
    }
}