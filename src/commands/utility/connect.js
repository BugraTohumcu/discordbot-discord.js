const { SlashCommandBuilder } = require('discord.js') ;
const { joinVoiceChannel ,getVoiceConnection } =  require('@discordjs/voice');
const { createAudioPlayer , createAudioResource } = require('@discordjs/voice');
const resource = createAudioResource('c:\\Users\\user\\Desktop\\camtasia\\ses\\acemkızı2\\acemkızı2.mp3')

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
            const player = createAudioPlayer();
            
            const voiceChannel = interaction.options.getChannel('channel-name')
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guildId,
                adapterCreator:interaction.guild.voiceAdapterCreator
            });
            connection.subscribe(player);
            player.play(resource);
            await interaction.reply({ content: 'Connected to ' + voiceChannel.name, ephemeral: true });
            
        }

}
