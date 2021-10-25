const Discord = require('discord.js');
const { prefix, token, deepL } = require('./config.json');
const client = new Discord.Client();
const translate = require('deepl');

client.on('ready', () => {
    console.log(`Logged in ass ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.A);
console.log(process.env.B);
client.login(token);
console.log('Apple');
console.log(prefix);
client.on('message', message => {

    const splitText = message.content.split(' ');
    console.log(splitText);


    if (splitText[0] === '%%translate') {
        splitText[1].toUpperCase();
        const targetLanguage = splitText[1].toUpperCase();
        String(targetLanguage);
            let theSentence = '';
            for (let x = 2; x < splitText.length; x++) {
                theSentence += splitText[x];
                theSentence += ' ';
            }
            theSentence = theSentence.trim();
            String(theSentence);
            console.log('Sentence to be translated is ' + theSentence);
            translate({
                text: theSentence,
                target_lang: targetLanguage,
                free_api: true,
                auth_key: deepL,
                // All optional parameters available in the official documentation can be defined here as well.
              })
              .then(result => {
                  console.log(result.data.translations[0].text);
                  message.channel.send('Changing to ' + targetLanguage + ' ' + result.data.translations[0].text);

              })
              .catch(error => {
                  message.channel.send('The target language of ' + targetLanguage + ' does not exist.');
                  console.log(error);
                  console.error('Oopsie');
              });
    }

    if (splitText[0] === '%%help') {
        message.channel.send('To translate, include your language to translate to and the sentence. Ex. %%translate JP Hello. To get a list of languages use %%languages');
    }

    if (splitText[0] === '%%languages') {
        message.channel.send('Currently supported languages are: ' +
        `
"BG" - Bulgarian
"CS" - Czech
"DA" - Danish
"DE" - German
"EL" - Greek
"EN-GB" - English (British)
"EN-US" - English (American)
"EN" - English (unspecified variant for backward compatibility; please select EN-GB or EN-US instead)
"ES" - Spanish
"ET" - Estonian
"FI" - Finnish
"FR" - French
"HU" - Hungarian
"IT" - Italian
"JA" - Japanese
"LT" - Lithuanian
"LV" - Latvian
"NL" - Dutch
"PL" - Polish
"PT-PT" - Portuguese (all Portuguese varieties excluding Brazilian Portuguese)
"PT-BR" - Portuguese (Brazilian)
"PT" - Portuguese (unspecified variant for backward compatibility; please select PT-PT or PT-BR instead)
"RO" - Romanian
"RU" - Russian
"SK" - Slovak
"SL" - Slovenian
"SV" - Swedish
"ZH" - Chinese
    `);
    }

});
