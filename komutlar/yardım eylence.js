const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("EMN + EYLENCE KOMUTLARI")
  .setDescription('')
  .setColor("RANDOM")
  .addField("**» Eğlence** ", `
   \n **+yaz = DEDİĞİNİS ŞEYİ BOTA YAZDIRIR**
   \n **+yazıtura = YAZI-TURA ATAR**
   \n **+sor  = SORU SORMAYA YARAR**
   \n **+stresçarkı = SİZİN İÇİN SİTRES ÇARKI CEVİRİR**
   \n ** +zeka = zekenazı ölcer
   \n ** +espiri = espiri yapar
   \n +sigara = sigara içir
   \n +çekiliş = çekiliş yapar
   \n +anket <soru> = zizin için anket yapar`)
   
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
  aliases: ['eylence',],
  permLevel: 0
};

exports.help = {
  name: 'eylence',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [kategori]'
};
