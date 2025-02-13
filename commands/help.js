const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'عرض قائمة الأوامر المتاحة',
    execute(message) {
        const helpEmbed = new EmbedBuilder()
            .setColor('#333')
            .setTitle('📜 all commends')
            .setDescription('🔹 all the commends you need:')
            .addFields(
                
                { name: '⚡ --clear', value: 'for delete messages (just between 1 - 100' },
                { name: '🔨 --kick @user', value: 'kick someone from the server but it can return to server' },
                { name: '⛔ --ban @user', value: 'kick someone and it cant return' },
                { name: '🛑 --timeout @user [دقائق]', value: 'make it cant talk for a time' },
                { name: '🔊 --join', value: 'make the bot join a room' },
                { name: '🚫 --leave', value: 'make the bot leave a room' },
                { name: '📜 --help', value: 'for know the commends' }
            )
            .setFooter({ text: 'good time :3', iconURL: message.client.user.displayAvatarURL() })
            .setTimestamp();

        message.channel.send({ embeds: [helpEmbed] })
            .catch(error => console.error('error:', error));
    },
};


