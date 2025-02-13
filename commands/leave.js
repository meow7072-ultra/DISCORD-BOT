const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: 'leave',
    description: 'Leaves the voice channel',
    execute(message) {
        const connection = getVoiceConnection(message.guild.id);

        if (!connection) {
            return message.reply('❌ I am not in a voice channel!');
        }

        connection.destroy();
        message.reply('👋 Left the voice channel!');
    },
};
