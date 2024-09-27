import { Command } from "#base";
import { db } from "#database";
import { ApplicationCommandType } from "discord.js";

new Command({
  name: "points",
  description: "Ranking Points",
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {
    const members = await db.members.all();

    const ranked = members.sort((a, b) => b.value.pontos - a.value.pontos);

    const mapped = ranked.map((member, index) => {
      return {
        Posição: index + 1,
        Usuário: member.value.username,
        Apelido: member.value.nickname,
        Pontuação: member.value.pontos,
      };
    });

    const medalEmojis = ["🥇", "🥈", "🥉"]; 
    const lastPlaceEmoji = "🐛"; 
    const emptySpace = "⠀"; 
    const lastIndex = mapped.length - 1; 

    const rankingMessage = mapped
      .map((member, index) => {
        const medal =
          medalEmojis[index] ||
          (index === lastIndex ? lastPlaceEmoji : emptySpace);
        return `${medal} **#${member.Posição}** | **Usuário**: *${
          member.Usuário
        }* | **Apelido**: *${member.Apelido || "N/A"}* | **Pontuação**: \`${
          member.Pontuação
        }\``;
      })
      .join("\n");

    interaction.reply({
      content: `✍️ **Ranking de Pontuação** ✍️:\n\n${rankingMessage}`,
    });
  },
});
