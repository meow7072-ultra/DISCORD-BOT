const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'untimeout',
    description: 'Removes timeout from a user.',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('❌ You do not have permission to manage timeouts.');
        }

        const user = message.mentions.members.first();

        if (!user) return message.reply('❌ Please mention a user to remove their timeout.');

        try {
            await user.timeout(null); // Removing timeout
            message.reply(`✅ Timeout removed from ${user.user.tag}.`);
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to remove timeout.');
        }
    },
};
