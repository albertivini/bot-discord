import { Command } from "#base";
import { db } from "#database";
import { ApplicationCommandType } from "discord.js";

new Command({
  name: "products",
  description: "Produtos",
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {
    const products = await db.products.all();

    const response = products
      .map((product) => {
        return `**Produto**: ${product.value.nomeDoProduto} | **Valor**: *${product.value.valor}* | **Quantidade disponível**: *${product.value.quantidadeDisponivel}* `;
      })
      .join("\n");

    interaction.reply({
      content: `💰 **Produtos disponíveis:** 💰:\n\n${response}`,
    });
  },
});
