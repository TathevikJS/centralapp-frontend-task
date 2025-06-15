import { shadowColors } from "@/styles/global";

export const getRandomShadowColor = (id: string) => {
    const index = parseInt(id.toString().slice(-1)) % shadowColors.length;
    return shadowColors[index];
  };