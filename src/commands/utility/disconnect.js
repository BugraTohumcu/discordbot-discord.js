const { SlashCommandBuilder, Guild } = require('discord.js') ;
const { joinVoiceChannel ,getVoiceConnection } =  require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('Disconnect from voice channel'),
        async execute(interaction){
                const connection = joinVoiceChannel({
                        channelId: interaction.channelId,
                        guildId: interaction.guildId,
                        adapterCreator:interaction.guild.voiceAdapterCreator
                    });

                    connection.destroy();
                    await interaction.reply({ content: 'Disconnected from', ephemeral: true });
                
        }
}