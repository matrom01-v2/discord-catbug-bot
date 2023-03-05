
const path = require('path');
const getAllFiles = require("../util/getAllFiles");

module.exports = (client) => {
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

    // console.log(eventFolders); see folder array

    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder); // get all files in event folder
        eventFiles.sort((a, b) => a > b); // sorts files for prios

        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop(); // get name of event based on folder name...pop grabs last element of array
        console.log(eventName);

        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile); // define function inside of files
                eventFunction(client, arg); // run function inside files
            }
        })
    }
};