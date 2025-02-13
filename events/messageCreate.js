module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        // Array of prefixes
        const prefixes = ['--'];

        if (!prefixes.some(prefix => message.content.startsWith(prefix)) || message.author.bot) return;

        const prefix = prefixes.find(prefix => message.content.startsWith(prefix));

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error executing this command!');
        }
    },
};

