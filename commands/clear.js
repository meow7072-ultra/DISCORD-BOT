const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'حذف رسائل مع تأكيد',

    async execute(message, args) {

        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.reply('you dont have a permissions to clear a message');
        }

        let amount = 100;

        if (args[0]) {
            amount = parseInt(args[0], 10);
            if (isNaN(amount)) {
                return message.reply('you need to put a number');
            }
            if (amount < 1 || amount > 100) {
                return message.reply('you can just put a number between 1-100');
            }
        }

        amount += 2;

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('confirm_purge')
                    .setLabel('✅ sure')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('cancel_purge')
                    .setLabel('❌ no')
                    .setStyle(ButtonStyle.Danger)
            );

        const sentMessage = await message.reply({
            content: `are you sure you wanna delete ${amount - 2} message`,
            components: [row],
        });

        const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = sentMessage.createMessageComponentCollector({
            filter,
            time: 7000,
        });

        collector.on('collect', async (interaction) => {
            try {
                if (interaction.customId === 'confirm_purge') {

                    await message.channel.bulkDelete(amount, true);
                    await interaction.reply({ content: `you delete a ${amount - 2} message!`, ephemeral: true });

                } else if (interaction.customId === 'cancel_purge') {
                    await interaction.reply({ content: 'you cancel it', ephemeral: true });
                    
                    await sentMessage.delete();
                    await message.channel.bulkDelete(1, true);
                }
            } catch (error) {
                console.error('you have a error:', error);
                await interaction.reply({ content: 'you have a error', ephemeral: true });
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                sentMessage.edit({ content: 'the timeline is end', components: [] });
            }
        });
    },
};
