const {token , clientId , guildId} =require('../config.json');
const {REST ,Routes, GatewayIntentBits} = require('discord.js');
const {RoleManager} = require('discord.js');
const { AuditLogEvent } = require('discord.js');
const {Client ,Collection,IntentsBitField, messageLink, GuildChannel, Guild,Events} = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const internal = require('node:stream');

 const client = new Client({

    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        GatewayIntentBits.Guilds,
    ],
});


client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}



const rest = new REST().setToken(token);
client.login(token);

client.on(Events.ClientReady, readyClient => {
    console.log(`${readyClient.user.tag} is online`);
});

client.on('messageCreate', (message) => {

    if(message.author.bot) return;
    
            
    if(message.content === "hello" ){
        message.reply("Hey! " + message.author.globalName); 
    }
            
    });

client.on('roleDelete' , async (deletedRole) => {
    const fetchAuditLogs = await deletedRole.guild.fetchAuditLogs({
        type:AuditLogEvent.RoleDelete,
        limit:1,
    });
    
    const firstentry = fetchAuditLogs.entries.first();
    const channel = deletedRole.guild.channels.cache.find(channel => channel.name === "deneme-1");
    channel.send("A role named "+ deletedRole.name+" been deleted by " + firstentry.executor.displayName);
    
});



client.on('roleCreate', async (role) => {

    const fetchedLogs = await role.guild.fetchAuditLogs({
        type: AuditLogEvent.RoleCreate,

        limit:1,
    });
    const firstentry = fetchedLogs.entries.first();

    const channel = role.guild.channels.cache.find(channel => channel.name === "deneme-1");
    channel.send("A role named " +  role.name+" has been created by "+firstentry.executor.displayName);
    
});

client.on('messageDelete' , async (deletedMessage) => {

    const fetchedLogs = await deletedMessage.guild.fetchAuditLogs({
        type: AuditLogEvent.MessageDelete,
        limit:1,
    });

    const firstentry = fetchedLogs.entries.first();

    console.log(`A message deleted by ` + firstentry.executor.globalName);

});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on('interactionCreate', action =>{
    
})