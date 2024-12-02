import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";

export const avatar = createAvatar(adventurer, {
  seed: "Aneka",
  backgroundColor: ["b6e3f4"],
  backgroundRotation: [0, 360],
});
