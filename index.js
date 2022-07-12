const { url } = require('inspector')
const TelegramApi = require('node-telegram-bot-api')
const { send } = require('process')
const token = "5544309056:AAGsvRQp2Ol_70N8syBOcrpTXgcEP1LGQs8"

const bot = new TelegramApi(token, {polling:true})

bot.setMyCommands([
    {command: "/start", description: "magazine"},
    {command: "/info", description: "info"},
    {command: "/catalog", description: "catalog"}
])

const keyboard = [
    [{ text: 'Каталог', callback_data: "1" }],
    [{ text: 'Корзина', callback_data: "2" }],
]
 
let options = {
    reply_markup: JSON.stringify({
        inline_keyboard: keyboard,
    })
};

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Добрый день, чего хотите?', options);
    
    bot.on('callback_query', (query) => {
        
        let img = '';
      
        if (query.data === "1") { 
            img = 'calm-2315559_640.jpg';
            options['caption'] = "Вот вам вода, ";
        }
        
        if (query.data === "2") { 
            img = 'pancakes-2020863_640.jpg';
            options['caption'] = "Вот вам еда, ";
        }
        
        options['caption'] += "ещё что нибудь хотите?";
        
        if (img) {
            bot.sendPhoto(chatId, img, options);
        }
    });
});
