import { Event } from "#base";
import { db } from "#database";
import { CONFIG } from "../../constants/config.js";

new Event({
  name: "Logs de entrada",
  event: "voiceStateUpdate",
  async run(oldState, newState) {

    if (oldState.channelId === "805121174416654336") {
      const member = oldState.member;

      const memberId = member?.id;

      const memberInDatabase = await db.members.get(`${memberId}`);

      if (!memberInDatabase) {
        const bodyToSave = {
          username: member?.user.username,
          nickname: member?.nickname,
          pontos: 0,
          tempoEmSegundos: 0,
        };

        db.members.set(`${memberId}`, bodyToSave);
      }

      const horarioSaida = Date.now();

      if (memberInDatabase?.horarioDeEntrada) {
        const tempoMs = Math.abs(memberInDatabase?.horarioDeEntrada - horarioSaida);

        const tempoSegundos = Math.round(tempoMs / 1000);

        const pontos = Math.floor(tempoSegundos * CONFIG.POINT_RATE);

        memberInDatabase.horarioDeEntrada = undefined;

        memberInDatabase.pontos += pontos;
        memberInDatabase.tempoEmSegundos += tempoSegundos;
      }

      db.members.set(`${memberId}`, memberInDatabase);
    }

    if (newState.channelId === "805121174416654336") {
      const member = newState.member;

      const memberId = member?.id;

      const memberInDatabase = await db.members.get(`${memberId}`);

      if (!memberInDatabase) {
        const bodyToSave = {
          username: member?.user.username,
          nickname: member?.nickname,
          pontos: 0,
          tempoEmSegundos: 0,
          horarioDeEntrada: Date.now()
        };

        db.members.set(`${memberId}`, bodyToSave);
      } else {
        memberInDatabase.horarioDeEntrada = Date.now();

        db.members.set(`${memberId}`, memberInDatabase);
      }
    }
  },
});
