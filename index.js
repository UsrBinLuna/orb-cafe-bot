const Discord = require('discord.js');
const { prefix, token, serverid } = require('./config.json');

const client = new Discord.Client({
    disableMentions: 'everyone',
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
guild = new Discord.Guild(serverid)


client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('you, I know what you did', { type: 'WATCHING' });
});

client.on('message', message => {


  if (!message.content.startsWith(prefix) || message.author.bot) return;
   const args = message.content.slice(prefix.length).split(/ +/);
   const commandName = args.shift().toLowerCase();
    if (!commandName) return;
    if (commandName.guildOnly && message.channel.type === 'dm') {
        return;
    }
  }) 

client.login(token);
