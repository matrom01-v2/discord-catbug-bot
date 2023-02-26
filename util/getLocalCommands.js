const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
    let localCommands = [];

    const commandCategories = getAllFiles(
        path.join(__dirname, '..', 'commands'),
        true
    );

    // console.log(commandCategories); // see the funny command categories

    for (const commandCategory of commandCategories) {
        const commandFiles = getAllFiles(commandCategory);

        // console.log(commandFiles); // see the command files

        for (const commandFile of commandFiles) {
            const commandObject = require(commandFile);

            if(exceptions.includes(commandObject.name)) {
                continue;
            }
            localCommands.push(commandObject);
        }
    }

    return localCommands;
}