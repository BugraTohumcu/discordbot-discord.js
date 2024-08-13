const { Events ,SlashCommandBuilder  }=require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-role')
        .setDescription('Delete a role from Discord server')
        .addRoleOption(option =>
            option
                .setName('role-name')
                .setDescription('Enter the name of the role that you want to delete')
        ),
        async execute(interaction){
            const roleName = interaction.options.getRole('role-name');
            interaction.guild.roles.delete(roleName);
            
            await interaction.reply({ content: 'Role deleted', ephemeral: true });
        }
}