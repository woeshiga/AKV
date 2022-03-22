const {Telegraf} = require("telegraf");
const axios = require('axios')

const bot = new Telegraf('1800427460:AAH6VZxxVpwPuv6MPMsNTV7aeUO0wwS2K9w')

bot.start((ctx) => ctx.reply('Welcome'))
bot.hears('/code', ctx => {
    axios.get('http://localhost:8000/api/settings/get_user/' + ctx.message.from.username)
        .then(res => {
            if (res.data) {
                ctx.reply(res.data.code)
            }
        })
        .catch(() => {
            ctx.reply("Незарегистрированный username!")
        })
})
bot.launch()
