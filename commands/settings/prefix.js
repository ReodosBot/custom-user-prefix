const db = require('quick.db')

module.exports = {
    commands: ['prefix', 'setprefix'],
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<new prefix>",
    // permissionError: "Error: Must have \`\`ADMINISTRATOR\`\` or \`\`MANAGE_SERVER\`\` permissions.",
    // permissions: ['ADMINISTRATOR', 'MANAGE_GUILD'],
    callback: (message, arguments, text) => {
        const userPrefix = db.get(`${message.author.id}_prefix`)
        if(userPrefix == null) {
            message.reply('no prefix set')
            db.set(`${message.author.id}_prefix`, "?")
        } else {
            db.set(`${message.author.id}_prefix`, arguments[0].toLowerCase())
            let a = userPrefix
            message.reply(a)
        }
    }
}
