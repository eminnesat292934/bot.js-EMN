const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

const girismesaj = [
 'BOTUN DAVET LİNKİ:https://discordapp.com/oauth2/authorize?client_id=503493805350322178&scope=bot&permissions=805314622',
'BOTUN DESTEK SUNUCUSU:https://discord.gg/gfaUAxN',
'BOTU YAPAN KİŞİLER:╲⎝⧹_grs_⧸⎠╱#1551',
'BOTUN SİTESİ:daha site yapılmamıştır',
'BENİM BOTUMU SEÇTİĞİNİZ İÇİN TEŞEKKÜR EDERİM'
]


client.on('guildCreate', guild => {
    const generalChannel = guild.defaultChannel
    generalChannel.sendMessage(girismesaj)
	client.user.setGame(prefix + 'yardım | ' + client.guilds.size + ' sunucu | ' + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ' kullanıcı');
})