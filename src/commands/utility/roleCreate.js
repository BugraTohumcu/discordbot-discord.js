const { SlashCommandBuilder, Guild } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Create a role')
        .addStringOption(option =>
        option
            .setName('name')
            .setDescription('Enter a role name')
    ),
    async execute(interaction){
        const roleName = interaction.options.getString('name');
        interaction.guild.roles.create({name : roleName})
        await interaction.reply({ content: 'Rolea created', ephemeral: true });
    },
        
}