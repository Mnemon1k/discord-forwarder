const { Client, SnowflakeUtil} = require('discord.js-selfbot-v13');
const client = new Client({}); // https://discordjs-self-v13.netlify.app/#/docs/docs/main/typedef/ClientOptions
require('dotenv').config()

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);

  await getAllGuilds();
})

client.login(process.env.DS_TOKEN);


async function getAllGuilds() {
  const guilds = await client.guilds.fetch();

  // const guild = client.guilds.cache.get('id');
  // console.log(guild)

  // guilds.forEach(async (guild) => {
  //   console.log(`${guild.name} - ${guild.id}`);
  //   console.log(guild.channels);
    // console.log(await guild.fetch());
  // })

  for (let [id, guild] of guilds) {
    // console.log(guild);
    console.log(`${guild.name} - ${id}`);
    guild = await guild.fetch();
    const channel = await guild.channels.fetch("436636285008871434");
    const messages = await channel.messages.fetch({
        after: SnowflakeUtil.generate(new Date(1680087104000))
    });

      for (let [id, message] of messages) {
          console.log(new Date(message.createdTimestamp));
      }

    break;
  }

  return guilds;
}