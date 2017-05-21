using Discord;
using Discord.Commands;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiscordBot
{
	class MyBot
	{
		DiscordClient discord;

		public MyBot()
		{
			discord = new DiscordClient(x =>
			{
				x.LogLevel = LogSeverity.Info;
				x.LogHandler = Log;
			});

			discord.UsingCommands(x =>
			{
				x.PrefixChar = "!";
				x.AllowMentionPrefix = true;
			});

			var commands = discord.GetService<CommandService>();

			commands.CreateCommand("hello")
				.Do(async (e) =>
				{
					await e.Channel.SendMessage("Hi!");
				});
									
			discord.ExecuteAndWait(async () =>
			{
				await discord.Connect("MzE1NjU3OTg4NTI4NTM3NjEw.DAKVEg.rq1L_V2-IUV096_wpm5aty4chmw", TokenType.Bot);
			});
		}

		private void Log(object sender, LogMessageEventArgs e)
		{
			Console.WriteLine(e.Message);
		}
	}
}
