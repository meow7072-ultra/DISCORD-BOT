const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unban a user by their ID.',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply('❌ You do not have permission to unban members.');
        }

        const userId = args[0];

        if (!userId) return message.reply('❌ Please provide a user ID to unban.');

        try {
            await message.guild.members.unban(userId);
            message.reply(`✅ Successfully unbanned user with ID ${userId}.`);
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to unban the user. Make sure the ID is correct.');
        }
    },
};
