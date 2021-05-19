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
    client.user.setActivity('egg 2: electric boogaloo', { type: 'WATCHING' });
});

client.on('message', message => {


  if (!message.content.startsWith(prefix) || message.author.bot) return;
   const args = message.content.slice(prefix.length).split(/ +/);
   const commandName = args.shift().toLowerCase();
    if (!commandName) return;
    if (commandName.guildOnly && message.channel.type === 'dm') {
        return;
    }
  //easter egg
  if (commandName === "egg") {
    message.channel.send("hi im an egg");
  } //lmao

  if (commandName === 'help') {
    const hEmbed = new Discord.MessageEmbed()
        .setColor('#f7ff00')
        .setTitle('Command list')
        .setDescription('Prefix is o!')
        .setTimestamp()
        .addFields({ name: '**Bot still in development**', value: 'there are no commands for now'})
        .setFooter('Cassiopeia v0.1 beta');
    
    message.channel.send(hEmbed);
    
}

}) 

client.login(token);
