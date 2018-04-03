// This command stores any string/username [value] for with the user's id [key]
// Anyone can recall another user's key if they wish
// The main purpose is to store the your username for swgoh.gg so that anyone
// can easily access quick information

const swgoh = require("swgoh").swgoh;
const { RichEmbed } = require("discord.js");

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars


    let id = client.profileTable.get(message.author.id);

    /**
    if (args[0] === "add" || args[0] === "edit") {
        const swName = args.slice(1).join(" ");

        if (!swName || swName.size < 1) return message.reply("You entered nothing for me to save.").then(client.cmdError(message, cmd));

        if (!id) {
            client.profileTable.set(message.author.id, swName);
            return message.reply(`I've added **${swName}** to your record.`);
        } else {
            client.profileTable.set(message.author.id, swName);
            return message.reply(`I've changed your record from **${id}** to **${swName}**.`);
        }
    }
    */

    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;

    const characters = settings.hasCommand.split(",");
    // const profileMessage = await message.channel.send("Checking... One moment. :eyes:");
    // const profileMessage = await message.channel.startTyping();
  
    const user = message.mentions.users.first();
    if (user) id = client.profileTable.get(user.id);
    // if (!user && args[0].toLowerCase().startsWith("https")) id = args[0].replace(/https\:\/\/swgoh\.gg\/u\//, "").replace("/","");
    if (!user && args[0]) id = args.join(" ");

    // client.log("log", `Looking up profile: ${id}`, "...");

    // Here we pull the profile data from swgoh.gg
    const profile = await swgoh.profile(id);
    // const mods = await swgoh.mods(id);
    // const guild = {id:9145}; // or {id:232}
    // const units = await swgoh.units(guild);
    client.log("log", `Looking up profile: https://swgoh.gg/u/${id}/`, "...");

  
    if (!profile.username) {
      message.channel.send(`Did you enter a user id? :thinking:`);
      client.cmdError(message, cmd);
      // profileMessage.stopTyping(true);
      return;
    }
    const collection = await swgoh.collection(id);
    if (!id || collection.length < 1) {
      message.channel.send(`${message.author}, Did you enter a user id? :thinking:`);
      client.cmdError(message, cmd);
      // profileMessage.stopTyping(true);
      return;
    }

    // client.log("log", `${profile.username}\'s Collection\n${JSON.stringify(collection)}`, "...");
  
    // Some user's don't submit their profile codes on swgoh.gg, if that's the
    // case, lets not display (undefined) next to their name
    let title = `${profile.username}'s Profile (${profile.allyCode})`;
    if (profile.allyCode === undefined) title = profile.username;

    const embed = new RichEmbed()
        .setTitle(title)
        .setColor(0x268BD2)
        //.addField("Collection", ${profile.collection.toLocaleString()})
        //.setThumbnail("https://swgoh.gg/static/img/swgohgg-nav-orange-2x.png")
        .setURL(`https://swgoh.gg/u/${id.toLowerCase()}/`)
        .setDescription(`**Galactic Power:** ${profile.galacticPower.toLocaleString()}
**Characters Galactic Power:** ${profile.charactersGalacticPower.toLocaleString()}
**Ships Galactic Power:** ${profile.shipsGalacticPower.toLocaleString()}
**Arena Rank:** ${profile.arenaRank}
**7☆ Characters:** ${profile.characters7}
**Gear 12 Characters:** ${profile.gearXII}
**Gear 11 Characters:** ${profile.gearXI}
**Gear 10 Characters:** ${profile.gearX}`)
        .setFooter(`https://swgoh.gg/u/${id.toLowerCase()}/`, "https://swgoh.gg/static/logos/swgohgg-logo-twitter-profile.png")

    for (let i = 0; i < characters.length; i++) {

        const character = collection.find(c => c.code === characters[i].trim());

        if (character) {
            const title = `${client.checkClones(character.description)}`;
            const description = `・${character.star}☆\n・Level ${character.level}\n・Gear level ${character.gearLevel}\n・Galactic Power ${character.galacticPower}`;

            embed.addField(title, description, true);
        } else {
            const title = `${client.checkClones(characters[i].replace(/-/g, " "))}`;
            const description = ":x:";

            embed.addField(title, description, true);
        }

    }

    message.channel.send({ embed });

    // profileMessage.stopTyping(true);

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["swgoh", "swgoh.gg", "swgohgg"],
    permLevel: "User"
};

exports.help = {
    name: "lfg",
    category: "Star Wars",
    description: "Returns swgoh.gg stats of specified user",
    usage: "lfg [swgoh.gg_username] https://swgoh.gg/u/<username>",
    examples: ["lfg hansolo", "lfg @Necavit0540"]
};
