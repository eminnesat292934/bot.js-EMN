const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("EMN + GNEL KOMUTLARI")
  .setDescription('')
  .setColor("RANDOM")
  .addField("**» Genel** ", `
  \n **+sunucubilgi = Sunucu hakkında bilgi verir. **
  \n **+temizle = Belirlenen miktar mesajı siler. **
  \n **+kullanıcıbilgim = Komutu kullanan kişi hakkında bilgi verir. **
  \n ** +istatistik  = Botun istatistik gösterir.**
  \n ** +bilgi = Bot ile ilgili bilgi verir.**
  \n ** +tavsiye = istediklerinizi bot sahibine gonderiri`)
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
  aliases: ['genel',],
  permLevel: 0
};

exports.help = {
  name: 'genel',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [kategori]'
};
