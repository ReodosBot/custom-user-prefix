const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('quick.db')

const config = require('./config.json')

client.on('ready', async () => {
    console.log('Bot is ready for use')

    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }

    readCommands('commands')
})

client.on('message', async (message) => {
    const userPrefix = db.get(`${message.author.id}_prefix`)
    if (userPrefix === null) {
        let embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.tag}`)
        .setDescription(`Need help? Run **?**help!`)
        .addFields(
            { name: "Forgot your prefix?", value: `Here it is! **?**`, inline: false },
            { name: "Bug? Feature request?", value: `Join the Discord! [Click Here](https://discord.gg/k2EkZ8sGXJ)`, inline: false },
            { name: "Discord.JS Version", value: `${Discord.version}`, inline: true }
        )
        .setColor(Math.floor(Math.random()*16777215).toString(16))

        if(message.mentions.has(client.user)) {message.reply(embed)}
        // console.log(`${message.author.username} == ${userPrefix}`)
    } else {
        let a = userPrefix.toLowerCase()
        let embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.tag}`)
        .setDescription(`Need help? Run **${a}**help!`)
        .addFields(
            { name: "Forgot your prefix?", value: `Here it is! **${a}**`, inline: false },
            { name: "Bug? Feature request?", value: `Join the Discord! [Click Here](https://discord.gg/k2EkZ8sGXJ)`, inline: false },
            { name: "Discord.JS Version", value: `${Discord.version}`, inline: true }
        )
        .setColor(Math.floor(Math.random()*16777215).toString(16))

        if(message.mentions.has(client.user)) {message.reply(embed)}
        // console.log(`${message.author.username} == ${userPrefix}`)
    }



})

client.login(config.token)
