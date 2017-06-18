const Discord = require('discord.js');
const client = new Discord.Client();


const clientBotId = 'MzE1NzAzODM3MzMzNzgyNTI5.DAKo1g.h-tF69ExRFIzHnUwJcbnB9Lz-1I';
const guildId = '107926187082285056';
const applicationChannelId = '315720532794540052';
const officerChannelId = '315720554353262593';
const officerRoleId = '<@315732496635527170>';
const officerForForwardingId = '102380839358189568';
const applicationMessagedeleteTime = 3000;

let officerForForwarding;
let officerChannel;
let officerRole;

function pasteApplicationToOfficerChannel(message) {
  // Get the current user.
  let user = message.member.user;

  // Copy their message message into the officer channel using a rich text format for easy reading.
  const embed = new Discord.RichEmbed()
    .setTitle(`${user.username}#${user.discriminator}`)
    .setColor(0x00AE86)
    .setDescription(message.content);
  officerChannel.send({embed});

  // Notify the officers of the new message.
  officerChannel.send(officerRole.toString());

  // DM the applicant and let them know their message was received.
  user.createDM().then((channel) => {
    channel.send(`Thank you for your submission ${user.username}! An officer will be with you as soon as possible.`);
  }).catch((err) => {
    console.log(err);
  });

  // Delete the message after a set time.
  message.delete(applicationMessagedeleteTime);
}

function relayDMsToOfficer(message) {
  // Do not forward messages that the bot is sending out
  if (client.user.id === message.author.id) return;
  let user = message.author;
  // Forward the message to the officer in charge
  officerForForwarding.createDM().then((channel) => {
    // Copy their message message into the DM using a rich text format for easy reading.
    const embed = new Discord.RichEmbed()
      .setTitle(`${user.username}#${user.discriminator}`)
      .setColor(0x00AE86)
      .setDescription(message.content);
    channel.send({embed});
  }).catch((err) => {
    console.log(err);
  });
}

client.on('ready', () => {
  console.log('I am ready!');
  officerRole = Array.from(client.guilds.get(guildId).roles.filter(role => role.name == 'Officer'))[0][1];
  officerChannel = client.channels.get(officerChannelId);
  officerForForwarding = client.guilds.get(guildId).members.get(officerForForwardingId).user;
});

client.on('message', message => {
  if (!message.channel) return;
  if (message.channel.id === applicationChannelId) pasteApplicationToOfficerChannel(message);
  if (message.channel.type === 'dm') relayDMsToOfficer(message);
});

client.login(clientBotId);
