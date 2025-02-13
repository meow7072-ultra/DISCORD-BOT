const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'timeout',
    description: 'Timeout a user for a certain duration.',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ You do not have permission to timeout members.');
        }

        const user = message.mentions.members.first();
        const duration = parseInt(args[1]); // Duration in minutes

        if (!user) return message.reply('❌ Please mention a user to timeout.');
        if (isNaN(duration) || duration <= 0) return message.reply('❌ Please provide a valid timeout duration in minutes.');

        try {
            await user.timeout(duration * 60 * 1000, 'Timed out by a moderator');
            message.reply(`✅ ${user.user.tag} has been timed out for ${duration} minutes.`);
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to timeout the user.');
        }
    },
};
