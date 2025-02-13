const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server.',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.reply('❌ You do not have permission to kick members.');
        }

        const user = message.mentions.members.first();

        if (!user) return message.reply('❌ Please mention a user to kick.');

        try {
            await user.kick('Kicked by a moderator');
            message.reply(`✅ ${user.user.tag} has been kicked.`);
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to kick the user.');
        }
    },
};
