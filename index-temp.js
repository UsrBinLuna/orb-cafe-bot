const Discord = require('discord.js');
const { prefix, token, token2, serverid } = require('./config.json');

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

const ytdl = require("ytdl-core");
const queue = new Map();

client.on('message', message => {


  if (!message.content.startsWith(prefix) || message.author.bot) return;
   const args = message.content.slice(prefix.length).split(/ +/);
   const commandName = args.shift().toLowerCase();
    if (!commandName) return;
    if (commandName.guildOnly && message.channel.type === 'dm') {
        return;
    }

    //commands
    if (commandName === 'shutdown') {
        message.channel.send("Shutting down...")
        setTimeout(function(){
            client.destroy();
        },5000)
    }
    //in testing stage

   

    //end of testing
    if (commandName === 'cr') {
        const rName = args.slice().join(' ');
        message.guild.roles.create({
            data: {
              name: rName,
              permissions: ['KICK_MEMBERS', 'SEND_MESSAGES', 'MANAGE_NICKNAMES', 'MANAGE_ROLES']
            },
            reason: 'we needed a role for Super Cool People',
          })
            .then(console.log)
            .catch(console.error);
        message.channel.send('Created role "' + rName + '"'); 
        
    }
    if (commandName === 'ar') {
        const aRole = args.slice().join(' ');
        let role = message.member.guild.roles.cache.find(role => role.name === aRole);
        if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
        message.channel.send('Gave you the role "' + aRole + '"');
        
    }
    if (commandName === 'rr') {
      const aRole = args.slice().join(' ');
      let role = message.member.guild.roles.cache.find(role => role.name === aRole);
      if (role) message.guild.members.cache.get(message.author.id).roles.remove(role);
      
  }

    if (commandName === 'cc') {
        message.guild.channels.create('test', { //Create a channel
            type: 'text', //Make sure the channel is a text channel
            permissionOverwrites: [{ //Set permission overwrites
                id: message.guild.id,
                allow: ['VIEW_CHANNEL'],
            }]
        })
        message.channel.send("Channel Created!"); //Let the user know that the channel was created
        
    }

    //help
    if (commandName === 'help') {
        const hEmbed = new Discord.MessageEmbed()
            .setColor('#f7ff00')
            .setTitle('Help')
            .setDescription('Prefix is !')
            .setTimestamp()
            .addFields({ name: '**moderation**', value: 'kick - its ovbious\nban - same as kick'})
            .addFields({ name: '**misc**', value: 'yellow - yellow.\nsmh - smh my head\nyes - no\nroger - that weird guy\nroomba - random roomba gif\naxolotl - those cuties lmao\ncc - creates a channel (doesnt work cause k2 removed my perms :<\ncr - creates a role\nsay - says the text you want it to say\nomegamart - o-o-o-omega mart you have no idea whats in-store for you\nomegalemons - omega mart lemons are not lemons\nsetbotnick - changes the bots nick\navatar - shows your or another users avatar\nembed - custom embed (broken)\nannounce - announces\nshutdown - kills the bot\ndani - wow that was really cool\npotatofrie - just~ dont.\nsmiley - **_best command ever._**'})
            .addFields({name: '**music**', value: 'play - plays music (usage: !play <youtube **link**>\nskip - skips song'})
            .setFooter(':yellow_square:');
        
        message.channel.send(hEmbed);
        
    }


    if (commandName === 'kick') {
        if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply("You don't have permission to kick members");
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            const reason = args.slice(1).join(' ');
            const member = message.guild.member(taggedUser);
            member.kick();
            message.channel.send(`Successfully kicked ${taggedUser}`);
            
        } else {
            const bvEmbed = new Discord.MessageEmbed().setTitle('PLease tag a valid user');
            message.reply(bvEmbed);
            
        } 
    }
    if (commandName === 'ban') {
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply("You don't have permission to ban members");
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            const reason = args.slice(1).join(' ');
            const member = message.guild.member(taggedUser);
            member.ban();
            message.channel.send(`Successfully banned ${taggedUser}`);
            
        } else {
            const bvEmbed = new Discord.MessageEmbed().setTitle('PLease tag a valid user');
            message.reply(bvEmbed);
            
        } 
    }

    //say
    if (commandName === 'say') {
        const text = args.slice().join(' ');
        message.delete();
        message.channel.send(text);
        
    }

    if (commandName === 'kill') {
        const taggedUser = message.mentions.users.first();
        client.users.cache.get('id').send('Blabla')
        
    }

    if (commandName === 'yellow') {
        message.channel.send(':yellow_square:');
        
    }

    if (commandName === 'smh') {
        message.channel.send('<:AngryStabbySirius:839699760637280256>');
        
    }
    if (commandName === 'yes') {
        message.channel.send('https://tenor.com/view/k20-gif-20249801');
        
    }
    if (commandName === 'roger') {
        message.channel.send('https://tenor.com/view/worm-weird-purple-purple-worm-dance-gif-17090715');
        
    }
    if (commandName === 'roomba') {
        roombagif = ['https://tenor.com/view/roomba-roombas-roomba-party-gif-18291345', 'https://tenor.com/view/opossum-cute-roomba-eat-eating-out-gif-16016450', 'https://tenor.com/view/roomba-cat-on-my-way-ride-the-pet-collective-gif-14273605', 'https://tenor.com/view/roomba-riding-spinning-cat-kitty-gif-17826121', 'https://tenor.com/view/gato-bisho-cat-michi-dog-gif-17576965', 'https://tenor.com/view/dog-cute-roomba-bulldog-riding-gif-17497992', 'https://tenor.com/view/lol-dogs-dog-roll-up-ride-gif-5528492'];
        var randomItem = roombagif[Math.floor(Math.random()*roombagif.length)];
        message.channel.send(randomItem);
    }

    if (commandName === 'smiley'){
      smileygif = ['https://tenor.com/view/bruh-puke-vomit-emoji-gif-14995746', 'https://tenor.com/view/free-smiley-faces-de-emoji-wink-gif-16175415', 'https://tenor.com/view/free-smiley-free-smiley-gif-13282162', 'https://tenor.com/view/free-smiley-faces-de-smiley-emoji-happy-gif-16168886', 'https://tenor.com/view/free-smiley-faces-de-emoji-gif-16210169', 'https://tenor.com/view/free-smiley-faces-de-emoji-sad-crying-cry-gif-16168301', 'https://tenor.com/view/free-smiley-faces-de-bleh-tongue-out-make-face-gif-16168745', 'https://tenor.com/view/free-smiley-faces-de-emoji-globe-smiley-ball-gif-16168322', 'https://tenor.com/view/free-smiley-faces-de-shades-on-sunglasses-swag-smile-gif-16168742', 'https://tenor.com/view/free-smiley-faces-de-emoji-worried-gif-16168282', 'https://tenor.com/view/free-smiley-faces-de-smile-dance-happy-emoji-gif-16168751'];
      var randomItem = smileygif[Math.floor(Math.random()*smileygif.length)];
      message.channel.send(randomItem);
    }

    if (commandName === 'axolotl') {
        rAxolotl = ['https://tenor.com/view/axolotl-smile-happy-cute-animal-smiling-gif-12642274', 'https://tenor.com/view/axolotl-gif-5505339', 'https://tenor.com/view/axolotl-smile-cute-gif-5239765', 'https://tenor.com/view/axolotl-swim-cute-excited-gif-9348060']
        var randomItem = rAxolotl[Math.floor(Math.random()*rAxolotl.length)];
        message.channel.send(randomItem);
        
    }

    //omega mart commands smh

    if (commandName === 'omegalemons') {
        message.delete();
        const omEmbed = new Discord.MessageEmbed()
            .setTitle("This is an important message for customers who have recently purchased Omega Mart Lemons.")
            .setDescription("Some customers have confused Omega Mart Lemons with lemons. Please return this product to Omega Mart immediately.\nOr for assistance, please call the number on your screen. For your safety, this product has been removed from our shelves and will be carefully disposed of.")
            .setFooter("Omega Mart thanks you for your continued trust.")
        message.channel.send(omEmbed);
        message.channel.send("https://cdn.discordapp.com/attachments/839313508700520451/839898220142395422/Omega-Mart-theme-high-quality-gJ.gif");
        
    }
    if (commandName === 'omegamart') {
        message.delete();
        message.channel.send("https://cdn.discordapp.com/attachments/839313508700520451/839898220142395422/Omega-Mart-theme-high-quality-gJ.gif");
        
    }
    //endofomega
    if (commandName === 'setbotnick') {
        const nick = args.slice().join(' ');
        message.guild.members.cache.get(client.user.id).setNickname(nick);
        console.log(`Changed bot's nick to ${nick}`);
        message.channel.send("Changed my nick to " + nick);
        
    }
    if (commandName === 'avatar') {
        const user = message.mentions.users.first() || message.author;
        const avatarEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(user.username)
            .setImage(user.avatarURL());
        message.channel.send(avatarEmbed);
        
    }
    if (commandName === 'embed') {
        message.delete();
        const title = args.slice().join(' ');
        const desc = args.slice().join(' ');
        const footer = args.slice().join(' ');
        const tEmbed = new Discord.MessageEmbed()
            .setTitle(title)
            .setFooter(footer)
            .setDescription(desc)
        message.channel.send(tEmbed);
        
    }
    if (commandName === 'suggest') {
        const sText = args.slice().join(' ');
        const sEmbed = new Discord.MessageEmbed()
            .setTitle("Suggestion from " + message.member.displayName)
            .setDescription(sText);
        message.delete();
        message.channel.send(sEmbed);
        
    }
    if (commandName === 'announce') {
        const aText = args.slice().join(' ');
        const aEmbed = new Discord.MessageEmbed()
            .setTitle("Announcement")
            .setDescription(aText + "\n\n~" + message.author.username)
        message.delete();
        message.channel.send(aEmbed);
        
    }
if (commandName === 'dani') {
  message.delete();
  message.channel.send("https://tenor.com/view/dani-dani-wow-that-was-really-cool-wow-that-was-really-cool-dani-meme-gif-18407105");
  
}


  if (commandName === 'potatofrie') {
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
    message.channel.send("<:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256><:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256> <:AngryStabbySirius:839699760637280256>");
  }
    
    /*

                     .__        
  _____  __ __  _____|__| ____  
 /     \|  |  \/  ___/  |/ ___\ 
|  Y Y  \  |  /\___ \|  \  \___ 
|__|_|  /____//____  >__|\___  >
      \/           \/        \/ 

*/



    const serverQueue = queue.get(message.guild.id);

    if (message.content.startsWith(`${prefix}play`)) {
      execute(message, serverQueue);
      
      return;
    } else if (message.content.startsWith(`${prefix}skip`)) {
      skip(message, serverQueue);
      
      return;
    } else if (message.content.startsWith(`${prefix}stop`)) {
      stop(message, serverQueue);
      
      return;
    }
});
  
async function execute(message, serverQueue) {
    const args = message.content.split(" ");
  
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }
  
    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
     };
  
    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
  
      queue.set(message.guild.id, queueContruct);
  
      queueContruct.songs.push(song);
  
      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  }
  
  function skip(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue)
      return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
  }
  
  function stop(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
      
    if (!serverQueue)
      return message.channel.send("There is no song that I could stop!");
      
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
  
  function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
  
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);

    }

  

client.login(token2);
