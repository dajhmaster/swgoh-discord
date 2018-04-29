exports.run = async (client, message, cmd, args, level) => {
  let guild = await message.guild.fetchMembers();
  console.log("Guild object : " +guild);
  let isAuthed = guild.members.find( "id", args[0] ).hasPermission("MANAGE_GUILD") ? "You can manage this server." : "You do not have permissions to manage this server.";
  message.channel.send("You are " +isAuthed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rights"],
  permLevel: "User"
};

exports.help = {
  name: "perms",
  category: "Miscellaneous",
  description: "Tells you your permission level for the current guild location.",
  usage: "%CMD%perms"
};
