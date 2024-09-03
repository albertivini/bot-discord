import { Event } from "#base";
import { db } from "#database";

new Event({
  name: "Logs de entrada",
  event: "voiceStateUpdate",
  async run(oldState, newState) {

    if (oldState.channelId === "847248441196675123") {
        const member = oldState.member;

        const memberId = member?.id;
  
        const memberInDatabase = await db.members
          .get(`${memberId}`);

        memberInDatabase.
    }

    if (newState.channelId === "847248441196675123") {
      console.log("oldState", oldState.channel?.members);
      console.log("newState", newState.channel?.members);

      const member = newState.member;

      const memberId = member?.id;

      const memberInDatabase = await db.members
        .get(`${memberId}`);

      if (!memberInDatabase) {
        const bodyToSave = {
          username: member?.user.username,
          nickanme: member?.nickname,
        };

        db.members.set(`${memberId}`, bodyToSave);
      }

      db.members.add(`${memberId}.horarioDeEntrada`, Date.now());
    }
  },
});
