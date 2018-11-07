const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("EMN + YETKİLİ KOMUTLARI")
  .setDescription('')
  .setColor("RANDOM")
  .addField("**» Yetkili** ", `
  \n ** +uyar = İstediğiniz kişiyi uyarır. **
  \n **+unban = İstediğiniz kişinin banını kaldırır. **
  \n **+sustur = İstediğiniz kişiyi  susturur. **
  \n ** +kilit  = Kanalı istediğiniz kadar süreyle kitler.**
  \n ** +kick   = İstediğiniz kişiyi sunucudan atar.**
  \n ** +ban     = İstediğiniz kişiyi banlar** 
  \n **slow-mode [1-10] = çeti yazmasını yavaşlaştırıır**`)
  .setFooter('❯ Yeni Arayüz.')
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('asciidoc', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['',],
  permLevel: 0
};

exports.help = {
  name: 'yetkili',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [kategori]'
};
