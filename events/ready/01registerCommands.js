const areCommandsDifferent = require("../../util/areCommandsDifferent");
const getApplicationCommands = require("../../util/getApplicationCommands");
const getLocalCommands = require("../../util/getLocalCommands");

const testServer = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;


module.exports = async (client) => {
    const localCommands = getLocalCommands();


    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, testServer);

        for (const localCommand of localCommands) {
            const {name, description, options} = localCommand;

            const existingCommand =  await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    continue;
                }

                if(areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options
                    });
                }
            } else {
                console.log(`Skipping registering command ${name} as it is set to delete.`);
                continue;
            }

            await applicationCommands.create({
                name, 
                description,
                options
            })

            console.log(`Command ${name} registerd successfully!`);
        }
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
};