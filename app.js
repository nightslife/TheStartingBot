const Discord = require('discord.js');
const client = new Discord.Client();


const clientBotId = '';
const applicationChannelId = '315720532794540052';
const officerChannelId = '315720554353262593';
const officerRoleId = '<@315732496635527170>';
const applicationMessagedeleteTime = 3000;

let officerChannel;

client.on('ready', () => {
  console.log('I am ready!');
  officerChannel = client.channels.get(officerChannelId);
});

client.on('message', message => {
  if (!message.channel || !message.channel.name || message.channel.id !== applicationChannelId) return;

  // Get the current user.
  let user = message.member.user;

  // Copy their message message into the officer channel using a rich text format for easy reading.
  const embed = new Discord.RichEmbed()
    .setTitle(`${user.username}#${user.discriminator}`)
    .setColor(0x00AE86)
    .setDescription(message.content);
  officerChannel.send({embed});

  // Notify the officers of the new message.
  officerChannel.send(officerRoleId);

  // DM the applicant and let them know their message was received.
  user.createDM().then((channel) => {
    channel.send(`Thank you for your submission ${user.username}! An officer will be with you as soon as possible.`);
  });

  // Delete the message after a set time.
  message.delete(applicationMessagedeleteTime);
});

client.login(clientBotId);
