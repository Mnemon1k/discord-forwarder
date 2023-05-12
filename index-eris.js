    const Eris = require("eris");
    require('dotenv').config()

    const client = new Eris(process.env.DS_TOKEN, {
        intents: ["guildMessages"]
    });

    client.on("ready", async () => {
        console.log("Ready!");
    });

    client.on("error", async (err) => {
      console.error(err);
    });


    client.on("messageCreate", async (msg) => {
        console.log(`Server: ${msg.channel.guild.name}`);
        console.log(`Channel: ${msg.channel.name}`);
        console.log(msg.content);
        msg.channel.messages.forEach((entry)=>{
            console.log(entry.content)
        });
    });

    client.connect();
