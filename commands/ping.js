exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send(`Ping?`);
  const emoji = client.emojis.find("name", "badtooth");
  console.log(`Emoji: ${emoji}`);
  //emoji = emoji.toString().replace('<:', '<a:');
  //console.log(`Emoji: ${emoji}`);
  //msg.react(`:thinking:`);
  //message.react(`437843671400972289`);
  msg.edit(`<a:loading:437843671400972289> Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  //message.react(`437843671400972289`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Miscellaneous",
  description: "It... like... pings. Then Pongs. And it\"s not Ping Pong.",
  usage: "ping"
};
