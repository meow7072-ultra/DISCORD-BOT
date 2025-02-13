const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a user from the server.',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply('you dont have a permissions to ban someone');
        }

        const user = message.mentions.members.first();

        if (!user) return message.reply('you need to mention the person');

        try {
            await user.ban({ reason: 'you take a ban from someone' });
            message.reply(`✅ ${user.user.tag} you ban`);
        } catch (error) {
            console.error(error);
            message.reply('❌ i cant ban him ❌');
        }
    },
};
