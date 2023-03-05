const { Client, Message} = require('discord.js');
const Level = require('../../schemas/Level');
const calculateLevelXp = require('../../util/calculateLevelXp');

// return a rando value between min and max
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
    if(!message.inGuild() || message.author.bot) {
        // console.log('inside this if statement'); // see if im readhing this
        return;
    }    

    const xpToGive = getRandomXp(5, 15);

    // seaches DB for specific field type
    const query = {
        userId: message.author.id,
        guildId: message.guild.id,
    };

    try {
        const level = await Level.findOne({
            userId: message.author.id,
            guildId: message.guild.id,
        }); // pass in query
       //  console.log('I am inside try block for client message.');

        if(level) {
            level.xp += xpToGive; // add xp

            // check if user be ready to level up
            if (level.xp > calculateLevelXp(level.level)) {
                level.xp = 0;      // reset xp
                level.level += 1;  // increase level

                message.channel.send(`${message.member} has leveled up to ${level.level}! Yay!`);   
            }

            // update the funny level in DB
            await level.save().catch((e) => {
                console.log(`Error in updating level schema ${e}`);
                return;
            })
        }

        // if level is no there, create a new one
        // this literally adds a new entry into table
        else {
           // console.log('inside create new level schema');
            const newLevel = new Level({
                userId: message.author.id,
                guildId: message.guild.id,
                xp: xpToGive,
            });

            await newLevel.save(); 
        }


    } catch (error) {
        console.log(`Error giving xp: ${error}`)
    }
}