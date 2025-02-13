const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'join',
    description: 'Joins the user’s voice channel',
    execute(message) {
        const channel = message.member.voice.channel;
        
        if (!channel) {
            return message.reply('❌ You need to be in a voice channel for me to join!');
        }

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: false, // Set to true if you want the bot to mute itself
        });

        message.reply('✅ Joined the voice channel!');
    },
};