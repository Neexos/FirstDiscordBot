const Discord = require('discord.js')
const bot = new Discord.Client()
const fs = require('fs')


//ID channel du bot : 592743416824201226

bot.on('ready', function () {
  console.log("Connected !")
  bot.user.setActivity('des aveugles traverser l\'autoroute', {type: "WATCHING"}).catch(console.error)
})

bot.on('message', message => {
  const botChannel = bot.channels.get('592743416824201226')

  if (message.channel.id === '592743416824201226'){

    /********** HELP **********/

    if (message.content === '!help') {
      const embed = new Discord.RichEmbed()
        .setTitle(':black_square_button::black_square_button:    :regional_indicator_b::regional_indicator_o::regional_indicator_t:   :regional_indicator_h::regional_indicator_e::regional_indicator_l::regional_indicator_p:   :black_square_button::black_square_button:')
        .setColor(0xFFFFFF)
        .attachFile('./img/bot_avatar.png')
        .setThumbnail('attachment://bot_avatar.png')

        .addField('`!help`',
        'Pour t\'aider à discuter avec moi :wink:', true)
        .addField('`!ping` :clock1:',
        'Temps de réponse de mon cerveau', true)
        .addField('`!status` :bar_chart:',
        'Etat de mon cerveau')

        .addField(':black_square_button::black_square_button:   :regional_indicator_w::regional_indicator_o::regional_indicator_w:   :black_square_button::black_square_button:', 'world of warcraft')
        .addField('`!herb [name]` :herb:',
        'Je te DM la carte possédant le plus d\'herbes "name"', true)
        .addField('`!mine [name]` :pick:',
        'Je te DM la carte possédant le plus de mine de "name"', true)
        .addField('`!fish [name]` :fish:',
        'Je te DM la carte possédant le plus de poissons "name"', true)

        .addField(':black_square_button::black_square_button:   :regional_indicator_l::regional_indicator_o::regional_indicator_l:   :black_square_button::black_square_button:', 'league of legends')
        .addField('`!runes [name]` :accept:',
        'Je te DM les runes pour le champion "name"', true)
        .addField('`!skills [name]` :cyclone:',
        'Je te DM les skills pour le champion "name"', true)
        .addField('`!lol [champ]` :crossed_swords:',
        'Je te DM les infos du champion "name"', true)

        .setFooter('All rights reserved © - Created by Nexos' ,'attachment://bot_avatar.png')
        .setTimestamp()
      botChannel.send(embed);
    }

    /********** PING **********/

    else if (message.content === '!ping') {
      botChannel.send('ping : ' + bot.pings + ' ms')
    }

    /********** STATUS **********/

    else if (message.content === '!status') {
      var status = bot.status
      switch (status) {
        case 0:
          botChannel.send('Je suis prêt ! Balance ta commande bro\'')
          break;
        case 1:
          botChannel.send('Je suis en train de se connecter...')
          break;
        case 2:
          botChannel.send('Je me reconnecte...')
          break;
        case 3:
          botChannel.send('Je suis inactif')
          break;
        case 4:
          botChannel.send('J\'y suis presque !')
          break;
        case 5:
          botChannel.send('Je suis déconnecté')
          break;
        default:
          botChannel.send('/!\\ ERROR /!\\')
      }
    }
                                                        /********** WORLD OF WARCRAFT **********/

    /********** HERB **********/
    else if (message.content.startsWith('!herb')) {
      let splitCommand = message.content.split(" ")
      let entity = message.content.substr(6).toLowerCase() // REMOVE CMD
      let reg = '^' + entity + '$'
      let search = new RegExp(reg, 'i')

      if (splitCommand.length < 2){
        botChannel.send('Pas assez d\'info dans ta commande mec ! T\'as besoin d\'aide ? Regarde `!help` pour plus d\'infos :wink:')
      }
      else{
        let contents = fs.readFileSync('herb_db.txt', 'utf8'); // DB ITEMS
        let newContents = JSON.parse(contents)
        let i = 0
        let objId
        while ( i < newContents.data.length){
          if (search.test(newContents.data[i].name)){
            objId = newContents.data[i].id
            break;
          }
          else {
            i++;
          }
        }
        if (i === newContents.data.length){
          botChannel.send('T\'es sûr que ça existe ton truc ??? :thinking:')
        }
        else {
          var url = getFinalPage(objId)
          wait()
        }
      }
      function wait(){
        setTimeout(function(){
          respond(url, entity)
        }, 4000)
      }   
      function respond(url, entity){ 
        const embed = new Discord.RichEmbed()
          .setTitle(entity)
          .setURL(url)
          .setDescription('clique sur le nom en bleu pour accéder à la page web :wink:')
          .setColor(0x2d8839)
          .attachFile('./img/MAP.png')
          .setImage('attachment://MAP.png')
        message.author.send(embed);
      }
    }
  
    /********** MINE **********/
    else if (message.content.startsWith('!mine')) {
      let splitCommand = message.content.split(" ")
      let entity = message.content.substr(6).toLowerCase() // REMOVE CMD
      let reg = '^' + entity + '$'
      let search = new RegExp(reg, 'i')

      if (splitCommand.length < 2){
        botChannel.send('Pas assez d\'info dans ta commande mec ! T\'as besoin d\'aide ? Regarde `!help` pour plus d\'infos :wink:')
      }
      else{
        let contents = fs.readFileSync('mine_db.txt', 'utf8'); // DB ITEMS
        let newContents = JSON.parse(contents)
        let i = 0
        let objId
        while ( i < newContents.data.length){
          if (search.test(newContents.data[i].name)){
            objId = newContents.data[i].id
            break;
          }
          else {
            i++;
          }
        }
        if (i === newContents.data.length){
          botChannel.send('T\'es sûr que ça existe ton truc ??? :thinking:')
        }
        else {
          var url = getFinalPage(objId)
          wait()
        }
      }
      function wait(){
        setTimeout(function(){
          respond(url, entity)
        }, 4000)
      }   
      function respond(url, entity){ 
        const embed = new Discord.RichEmbed()
          .setTitle(entity)
          .setURL(url)
          .setDescription('clique sur le nom en bleu pour accéder à la page web :wink:')
          .setColor(0x8a94a6)
          .attachFile('./img/MAP.png')
          .setImage('attachment://MAP.png')
        message.author.send(embed);
      }
    }

    /********** FISH **********/
    else if (message.content.startsWith('!fish')) {
      let splitCommand = message.content.split(" ")
      let entity = message.content.substr(6).toLowerCase() // REMOVE CMD
      let reg = '^' + entity + '$'
      let search = new RegExp(reg, 'i')

      if (splitCommand.length < 2){
        botChannel.send('Pas assez d\'info dans ta commande mec ! T\'as besoin d\'aide ? Regarde `!help` pour plus d\'infos :wink:')
      }
      else{
        let contents = fs.readFileSync('fish_db.txt', 'utf8'); // DB ITEMS
        let newContents = JSON.parse(contents)
        let i = 0
        let objId
        while ( i < newContents.data.length){
          if (search.test(newContents.data[i].name)){
            objId = newContents.data[i].id
            break;
          }
          else {
            i++;
          }
        }
        if (i === newContents.data.length){
          botChannel.send('T\'es sûr que ça existe ton truc ??? :thinking:')
        }
        else {
          var url = getFinalPage(objId)
          wait()
        }
      }
      function wait(){
        setTimeout(function(){
          respond(url, entity)
        }, 4000)
      }   
      function respond(url, entity){ 
        const embed = new Discord.RichEmbed()
          .setTitle(entity)
          .setURL(url)
          .setDescription('clique sur le nom en bleu pour accéder à la page web :wink:')
          .setColor(0x2a6ade)
          .attachFile('./img/MAP.png')
          .setImage('attachment://MAP.png')
        message.author.send(embed);
      }
    }

                                                        /********** LEAGUE OF LEGENDS **********/
    /********** RUNES **********/
    else if (message.content.startsWith('!runes')) {
      let splitCommand = message.content.split(" ")
      let champ = message.content.substr(7).toLowerCase() // REMOVE CMD
      let reg = '^' + champ + '$'
      let search = new RegExp(reg, 'i')

      if (splitCommand.length < 2){
        botChannel.send('Pas assez d\'info dans ta commande mec ! T\'as besoin d\'aide ? Regarde `!help` pour plus d\'infos :wink:')
      }
      else{
        let contents = fs.readFileSync('lol_db.txt', 'utf8'); // DB ITEMS
        let newContents = JSON.parse(contents)
        let i = 0
        let objId
        while ( i < newContents.data.length){
          if (search.test(newContents.data[i].name)){
            objId = newContents.data[i].id
            break;
          }
          else {
            i++;
          }
        }
        if (i === newContents.data.length){
          botChannel.send('T\'es sûr que ça existe ton truc ??? :thinking:')
        }
        else {
          var url = getLolRunes(objId)
          wait()
        }
      }
      function wait(){
        setTimeout(function(){
          respond(url, champ)
        }, 8500)
      }   
      function respond(url, champ){ 
        const embed = new Discord.RichEmbed()
          .setTitle(champ)
          .setURL(url)
          .setDescription('clique sur le nom en bleu pour accéder à la page web :wink:')
          .setColor(0x2a6ade)
          .attachFile('./img/LOL.png')
          .setImage('attachment://LOL.png')
        message.author.send(embed);
      }
    }

    /********** SKILLS **********/
    else if (message.content.startsWith('!skills')) {
      let splitCommand = message.content.split(" ")
      let champ = message.content.substr(8).toLowerCase() // REMOVE CMD
      let reg = '^' + champ + '$'
      let search = new RegExp(reg, 'i')

      if (splitCommand.length < 2){
        botChannel.send('Pas assez d\'info dans ta commande mec ! T\'as besoin d\'aide ? Regarde `!help` pour plus d\'infos :wink:')
      }
      else{
        let contents = fs.readFileSync('lol_db.txt', 'utf8'); // DB ITEMS
        let newContents = JSON.parse(contents)
        let i = 0
        let objId
        while ( i < newContents.data.length){
          if (search.test(newContents.data[i].name)){
            objId = newContents.data[i].id
            break;
          }
          else {
            i++;
          }
        }
        if (i === newContents.data.length){
          botChannel.send('T\'es sûr que ça existe ton truc ??? :thinking:')
        }
        else {
          var url = getLolSkills(objId)
          wait()
        }
      }
      function wait(){
        setTimeout(function(){
          respond(url, champ)
        }, 9000)
      }   
      function respond(url, champ){ 
        const embed = new Discord.RichEmbed()
          .setTitle(champ)
          .setURL(url)
          .setDescription('clique sur le nom en bleu pour accéder à la page web :wink:')
          .setColor(0x2a6ade)
          .attachFile('./img/LOL.png')
          .setImage('attachment://LOL.png')
        message.author.send(embed);
      }
    }

    /********** ALL **********/
    else if (message.content.startsWith('!lol')) {
      let splitCommand = message.content.split(" ")
      let champ = message.content.substr(5).toLowerCase() // REMOVE CMD
      let reg = '^' + champ + '$'
      let search = new RegExp(reg, 'i')

      if (splitCommand.length < 2){
        botChannel.send('Pas assez d\'info dans ta commande mec ! T\'as besoin d\'aide ? Regarde `!help` pour plus d\'infos :wink:')
      }
      else{
        let contents = fs.readFileSync('lol_db.txt', 'utf8'); // DB ITEMS
        let newContents = JSON.parse(contents)
        let i = 0
        let objId
        while ( i < newContents.data.length){
          if (search.test(newContents.data[i].name)){
            objId = newContents.data[i].id
            break;
          }
          else {
            i++;
          }
        }
        if (i === newContents.data.length){
          botChannel.send('T\'es sûr que ça existe ton truc ??? :thinking:')
        }
        else {
          var url = getLol(objId)
          wait()
        }
      }
      function wait(){
        setTimeout(function(){
          respond(url, champ)
        }, 9000)
      }   
      function respond(url, champ){ 
        const embed = new Discord.RichEmbed()
          .setTitle(champ)
          .setURL(url)
          .setDescription('clique sur le nom en bleu pour accéder à la page web :wink:')
          .setColor(0x2a6ade)
          .attachFile('./img/LOL.png')
          .setImage('attachment://LOL.png')
        message.author.send(embed);
      }
    }
  }  
})


  /********** FUNCTIONS **********/
function getFinalPage(id) {
  let url = 'https://www.nostalgeek-serveur.com/db/?object=' + id
  var webshot = require('C:\\Users\\Léo\\Desktop\\WOW_entities\\node_modules\\node-webshot\\lib\\webshot');
  var options = {
    phantomPath: "C:\\Users\\Léo\\Desktop\\WOW_entities\\node_modules\\phantomjs-prebuilt\\lib\\phantom\\bin\\phantomjs.exe",
    streamType :'png',
    siteType: 'url',
      windowSize: {
      width: 1024,
      height: 450,
    },
    shotSize: {
      width: 'window',
      height: 'window'
    },
    shotOffset: {
      left: 0,
      right: 0,
      top: 250,
      bottom: 0,
    },
    errorIfStatusIsNot200: true,
    errorIfJSException: true
  };
  webshot(url, './img/MAP.png', options, (err) => {
    if(err){
      console.log("An error ocurred ", err);
    }
  // screenshot now saved to ourcodeworld-image.png
  });
  return url
}

function getLolRunes(champ){
  let url = 'https://u.gg/lol/champions/' + champ + '/build'
  var webshot = require('C:\\Users\\Léo\\Desktop\\WOW_entities\\node_modules\\node-webshot\\lib\\webshot');
  var options = {
    phantomPath: "C:\\Users\\Léo\\Desktop\\WOW_entities\\node_modules\\phantomjs-prebuilt\\lib\\phantom\\bin\\phantomjs.exe",
    streamType :'png',
    siteType: 'url',
      windowSize: {
      width: 1024,
      height: 620,
    },
    shotSize: {
      width: 'window',
      height: 'window'
    },
    shotOffset: {
      left: 100,
      right: 0,
      top: 480,
      bottom: 0,
    },
    errorIfStatusIsNot200: true,
    errorIfJSException: true
  };
  webshot(url, './img/LOL.png', options, (err) => {
    if(err){
      console.log("An error ocurred ", err);
    }
  // screenshot now saved to ourcodeworld-image.png
  });
  return url
}

function getLolSkills(champ){
  let url = 'https://u.gg/lol/champions/' + champ + '/build'
  var webshot = require('C:\\Users\\Léo\\Desktop\\WOW_entities\\node_modules\\node-webshot\\lib\\webshot');
  var options = {
    phantomPath: "C:\\Users\\Léo\\Desktop\\WOW_entities\\node_modules\\phantomjs-prebuilt\\lib\\phantom\\bin\\phantomjs.exe",
    streamType :'png',
    siteType: 'url',
    windowSize: {
      width: 950,
      height: 380,
    },
    shotSize: {
      width: 'window',
      height: 'window'
    },
    shotOffset: {
      left: 0,
      right: 0,
      top: 1300,
      bottom: 0,
    },
    errorIfStatusIsNot200: true,
    errorIfJSException: true
  };
  webshot(url, './img/LOL.png', options, (err) => {
    if(err){
      console.log("An error ocurred ", err);
    }
  // screenshot now saved to ourcodeworld-image.png
  });
  return url
}

function getLol(champ){
  let url = 'https://u.gg/lol/champions/' + champ + '/build'
  var webshot = require('C:\\Users\\Léo\\Desktop\\WOW_entities\\node_modules\\node-webshot\\lib\\webshot');
  var options = {
    phantomPath: "C:\\Users\\Léo\\Desktop\\WOW_entities\\node_modules\\phantomjs-prebuilt\\lib\\phantom\\bin\\phantomjs.exe",
    streamType :'png',
    siteType: 'url',
    windowSize: {
      width: 1024,
      height: 1300,
    },
    shotSize: {
      width: 'window',
      height: 'window'
    },
    shotOffset: {
      left: 0,
      right: 0,
      top: 480,
      bottom: 0,
    },
    errorIfStatusIsNot200: true,
    errorIfJSException: true
  };
  webshot(url, './img/LOL.png', options, (err) => {
    if(err){
      console.log("An error ocurred ", err);
    }
  // screenshot now saved to ourcodeworld-image.png
  });
  return url
}
bot.login('NTkyNzA5NjU2MTQ1NjkwNjI0.XRDSwA.nKHpa8gKW6UHrAT_3j0OUHiyXJc')
