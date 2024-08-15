const { SlashCommandBuilder } = require('discord.js') ;
const { joinVoiceChannel ,getVoiceConnection } =  require('@discordjs/voice');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('connect')
        .setDescription('Bot connects to a voice channel')
        .addChannelOption(option => 
            option
                .setName('channel-name')
                .setDescription('Name of the channel to connect')
        ),
        async execute(interaction){
            const voiceChannel = interaction.options.getChannel('channel-name')
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guildId,
                adapterCreator:interaction.guild.voiceAdapterCreator
            });
            await interaction.reply({ content: 'Connected to ' + voiceChannel.name, ephemeral: true });
            
        }

}
