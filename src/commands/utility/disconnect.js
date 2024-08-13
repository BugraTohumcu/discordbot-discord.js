const { SlashCommandBuilder } = require('discord.js') ;
const { joinVoiceChannel ,getVoiceConnection } =  require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('Disconnect from voice channel'),
        async execute(interaction){
                const connection = getVoiceConnection();
                console.log(connection);            
        }
}