const Discord = require('discord.js')

const slots = require('./Structures/slots')

const Database = require('./Structures/Database')

const penv = require("./Structures/penv").config()

const ms = require("./Structures/ms")

const db = new Database()

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]})

client.on("ready", () =>{

    console.log(`Logged In As ${client.user.username}`)

})


client.on('messageCreate', async(message) =>{

    const prefix = "sb!"

    if(message.author.bot || !message.content.toLowerCase().startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(" ")

    const command = args.shift().toLowerCase()

    if(command === "slots"){

        const money = db.get(`money_${message.author.id}`) || 0

        if(!args[0]) return message.channel.send({"content": "Try again but, this time follow this `sb!slots <slot amount>`"})

        const amount = parseInt(args[0])

        if(isNaN(amount)) return message.channel.send({"content": "Enter A Valid Number"})

        console.log(amount)

        let mode = args[1] || "easy"

        mode = mode.toLowerCase()
        
        console.log(amount > money)

        if(amount > money) return await message.channel.send({"content": "You Cant bet more money than you have"})

        console.log(mode)

        if(mode !== undefined && !mode.includes("easy", "medium")) mode = "easy"

        const slot = slots(mode)

        if(slot.jackpot){

        const embed = new Discord.MessageEmbed()

        .setTitle("Jackpot")

        .setColor("GOLD")

        .setDescription(slot.result)

        .addField("Mode", `${mode}`)

        .addField("Multiplier", `${slot.multiplier}`)

        .addField("Bet Amount", `${amount}`)

        .addField("Won Amount", `${amount * slot.multiplier}`)

        db.add(`money_${message.author.id}`, amount * slot.multiplier)

        await message.channel.send({"embeds": [embed]})

        }else if(slot.won){

            const embed = new Discord.MessageEmbed()

            .setColor("GREEN")

            .setTitle("You Won")
    
            .setDescription(slot.result)
    
            .addField("Mode", `${mode}`)
    
            .addField("Multiplier", `${slot.multiplier}`)
    
            .addField("Bet Amount", `${amount}`)
    
            .addField("Won Amount", `${amount * slot.multiplier}`)

            await message.channel.send({"embeds": [embed]})
    
            db.add(`money_${message.author.id}`, amount * slot.multiplier)

        }else{

            const embed = new Discord.MessageEmbed()

            .setColor("RED")

            .setTitle("You Lost")
    
            .setDescription(slot.result)
    
            .addField("Mode", `${mode}`)
    
            .addField("Bet Amount", `${amount}`)
    
            .addField("Losing Amount", `${amount}`)

            await message.channel.send({"embeds": [embed]})

            db.subtract(`money_${message.author.id}`, amount)

        }

        }
        if(command === "daily"){

        const amount = 1000;
      
        const daily = await db.get(`daily_${message.author.id}`);
      
        if (daily !== null && 86400000 - (Date.now() - daily) > 0) {

          const t = ms(86400000 - (Date.now() - daily));
        
          const embed = new Discord.MessageEmbed()

          .setColor("RED")

          .setDescription(`You have already collected your daily reward\nCollect it again in ${t.hours}h ${t.minutes}m ${t.seconds}s `);

          message.channel.send({embeds:[embed]})

        } else {

          const embed = new Discord.MessageEmbed()

            .setColor("GREEN")

            .setDescription(` You've collected your daily reward of ${amount} coins`);

            message.channel.send({embeds: [embed]})
        
            db.add(`money_${message.author.id}`, amount)

            db.set(`daily_${message.author.id}`, Date.now())
      
        }
    }

    if(command === "beg") {

        const amount = Math.floor(Math.random() * 200);
      
        const daily = await db.get(`beg_${message.author.id}`);
      
        if (daily !== null && 1000 * 60 - (Date.now() - daily) > 0) {

          const t = ms(1000 * 60 - (Date.now() - daily));
        
          const embed = new Discord.MessageEmbed()

          .setColor("#FFFFFF")

          .setDescription(`You have already Begged\nCollect it again in ${t.seconds}s `);

          message.channel.send({embeds:[embed]})

        } else {

          const embed = new Discord.MessageEmbed()

            .setColor("GREEN")

            .setDescription(` You've Begged ${amount} coins`);

            message.channel.send({embeds: [embed]})
        
            db.add(`money_${message.author.id}`, amount)

            db.set(`beg_${message.author.id}`, Date.now())
      
        }

    }

    if(command === "balance"){

        const balanceEmbed = new Discord.MessageEmbed()

        .setColor("DARK_NAVY")

        .setTitle("Balance")

        .setDescription(`Balance: ${db.get(`money_${message.author.id}`) || 0}`)

        message.channel.send({embeds: [balanceEmbed]})

    }
    
})

client.login(penv[1])