exports.run = (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    const [time, day] = client.getTime();
    message.channel.send(`<a:spinner:437843766708142102> The time is ${time} and the day is ${day}.`);
    // <a:download:437843741181476864>

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "time",
    category: "Miscellaneous",
    description: "Tells time (24-hour) and numbered day of the week",
    usage: "time",
    examples: ["time"]
};
