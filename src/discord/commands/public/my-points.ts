import { Command } from "#base";
import { db } from "#database";
import { ApplicationCommandType } from "discord.js";

new Command({
  name: "my-points",
  description: "Member Points",
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {
    const memberInDatabase = await db.members.get(`${interaction.user.id}`);

    interaction.reply({
      content: `Olá ${interaction.user.displayName}, você tem ${memberInDatabase?.pontos} pontos.`,
    });
  },
});
