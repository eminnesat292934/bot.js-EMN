const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.on('message', async msg => {
    if (msg.content.toLowerCase() === 'sa') {
      await msg.react('🇦');
      msg.react('🇸');
    }
    });



client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});








client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
  
    let command = message.content.split(' ')[0];
    command = command.slice(prefix.length);
  
    let args = message.content.split(' ').slice(1);
  
    if (command === 'tavsiyeni-gönder' || command === 'tavsiye') {
      let str = '<@432239481534414848>';//@silmeyin!
      let id = str.replace(/[<@!>]/g, '');
      let mesaj = args.slice(0).join(' ');
      if (mesaj.length < 1) return message.reply(` ⚠ tavsiyeni yazmayı unuttun. ⚠ `);
      message.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(''));
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Tavsiye bilgileri;')
      .addField('Tavsiye:', mesaj, true)
      .addField('Kullanıcı adı:', message.author.tag, true)
      .addField('Kullanıcı kimliği:', message.author.id, true)
      .addField('Sunucu adı:', message.guild.name, true)
      .addField('Sunucu kimliği:', message.guild.id, true)
      client.fetchUser(id)
      .then(user => {user.send({embed})})
    }
  });


  client.on('message', message => {
    if (message.content.toLowerCase() === prefix + "zekam") {
        var sans = ["11", "15", "20", "24", "28", "31", "39", "45", "49", "54", "58", "63", "67", "77", "73", "84", "80", "83", "96", "94", "99", "Albert Einstein mısın krdşm"];
        var sonuc = sans[Math.floor((Math.random() * sans.length))];
        const embed = new Discord.RichEmbed()
        .addField(`***___Zekan___***`, `${sonuc}`)
        return message.channel.sendEmbed(embed);
    }
    });



    client.on('message', message => {
        if (message.content.toLowerCase() === prefix + "espriyap") {
            var sans = ["Geçen gün geçmiş günlerimi aradım ama meşguldü.", "Yağmur yağmış kar peynir", "Dünya dönermiş ay da köfte…", "Bu erikson başka erik yok.", "Yıkanan Ton a ne denir Washington", "Hadi oyun oynayalım. Vazgeçtim oymadan oynayalım!", "Geçen gün kamyonu sürdüm Leonardo da Vinci.", "Doğumdan sonra çok kilo aldım. Doğduğumda 2 kiloydum şimdi 62.", "Adam 7 gün boyunca nezle olmuş. Sıkılmış bugün de Petek le olayım demiş.", "Yarasa yararlı bir hayvandır. Yararlı bir hayvan olmasaydı yaramasa derlerdi.", " Benim neden kardeşim yok baba  Seni görünce ikincisine cesaret edemedik.", "Osmanlıda kimseye borç takamıyordun mesela sikke sikke ödüyodun…", "Tatlı yiyip, tatlı konuşuluyorsa bundan sonra mantı yiyip mantıklı konuşacağız.", "Babamı sahura kaldırmayı unuttuk anneme masada ne eksik diyorum tuzluk mu diyor.", "+Okeyde kıza elin nasıl dedim. Ojeli dedi. Ben Şoka girdim. O Migrosa.", "Canım sıkkın kanka sonra gel"];
            var sonuc = sans[Math.floor((Math.random() * sans.length))];
            const embed = new Discord.RichEmbed()
            .addField(`***___Espri___***`, `${sonuc}`)
            return message.channel.sendEmbed(embed);
        }
        });



        client.on('message', msg => {
            if (msg.content.toLowerCase() === prefix + "sigara") {
            msg.channel.send(':smoking: :cloud::cloud::cloud:')
            .then(nmsg => nmsg.edit(':smoking: :cloud::cloud::cloud:'))
            .then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
            .then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
            .then(nmsg => nmsg.edit(':smoking: :cloud:'))
            .then(nmsg => nmsg.edit(':smoking: :cloud:'))
            .then(nmsg => nmsg.edit('**Sigaram bitti** | **Sigara İçmeyiniz.** :no_smoking: **Sigara Sağlığa Zararlıdır**'));
            }
            });


            client.on("message", msg => {
                const kufur = ["amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "meme"];
                if (kufur.some(word => msg.content.includes(word)) ) {
                    msg.delete()
                    msg.reply("BU SUNUCU EMN TARAFINDA KÜFÜRLERE KAPALIDIR")
                }
            });


           

            client.on('message', msg => {
                if (msg.content.startsWith(prefix + "çekiliş")) {
                  msg.channel.send(`Çekilişi Kazanan: ${msg.guild.members.random().displayName}`);
                  }
                  });

                  


                  client.on("message", message => {
                    const dmchannel = client.channels.find("name", "dm-log");
                    if (message.channel.type === "dm") {
                        if (message.author.bot) return;
                        dmchannel.sendMessage("", {embed: {
                            color: 3447003,
                            title: `Gönderen: ${message.author.tag}`,
                            description: `Bota Özelden Gönderilen DM: ${message.content}`
                        }})
                    }
                });


                
                
                


                
client.login(ayarlar.token);
