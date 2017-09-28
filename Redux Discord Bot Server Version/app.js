const { Client } = require('discord.js');
const bot = new Client();
const cfg = require('./config.json');
const version = '0.2 Pre-Alpha'
const Oldversion = '0.2 Pre-Alpha'
const Update = '28.09.2017'

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag} (${bot.user.id}) on ${bot.guilds.size} servers`);
    bot.user.setActivity(`${cfg.prefix}help | ${bot.guilds.size} Servers`);
    
});

bot.on('disconnect', () => {
    console.log('An error cause that the bot go offline!')
});



bot.on('message', msg => {
    if (msg.author.bot || !msg.content.startsWith(cfg.prefix)) return;
    const args = msg.content.slice(cfg.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const username = msg.author.username.toLowerCase();

    if (command === 'version' || command === 'Version') {
        if (version === Oldversion) return msg.reply (`\n Version: ${Oldversion} \n Last Update: ${Update}`)
        msg.reply(`\n Version: ${version} \n Last Update: ${Update}`)
    }

    if (command === 'help' || command === 'Help') {
        if (!msg.member.permissions.has('ADMINISTARTOR')) return msg.reply('\n \n Commands: \n !version \n !help')
        msg.reply(' \n \n Commands: \n !version \n !help \n \n Admin Commands: \n !ban \n !kick')
    }


    if (command === 'ban') {
        if (!msg.member.permissions.has('ADMINISTARTOR')) return msg.reply('You dont have Acces for that Command!')

       const member = msg.mentions.members.first();
       if (!member) return msg.reply('Invalid Usage, please do !ban @User#0123')
       member.ban({
           reason: `Got Banned by ${msg.author.tag}`
       });
    }


       if (command === 'kick') {
        if (!msg.member.permissions.has('ADMINISTARTOR') || !msg.member.permissions.has('OWNER') || !msg.member.permissions.has('ADMIN')) return msg.reply('You dont have Acces for that Command!')

       const member = msg.mentions.members.first();
       if (!member) return msg.reply('Invalid Usage, please do !kick @User#0123')
       member.kick(`Got Kicked by ${msg.author.tag}`);
    
       
    }

    console.log(`From User: ${username}, Command: ${command} `);



});

bot.login(cfg.token);