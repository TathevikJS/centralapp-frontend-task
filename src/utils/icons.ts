import { IconType } from 'react-icons';
import { 
  FaPizzaSlice, 
  FaFish, 
  FaLeaf, 
  FaHamburger, 
  FaCoffee, 
  FaDrumstickBite, 
  FaCarrot, 
  FaCheese, 
  FaIceCream, 
  FaUtensils 
} from 'react-icons/fa';

export function getFoodIcon(name: string): IconType {
  const lower = name.toLowerCase();
  if (lower.includes('pizza')) return FaPizzaSlice;
  if (lower.includes('sushi')) return FaFish;
  if (lower.includes('cafe') || lower.includes('perk')) return FaCoffee;
  if (lower.includes('bistro')) return FaCheese;
  if (lower.includes('burger')) return FaHamburger;
  if (lower.includes('vegan') || lower.includes('garden')) return FaLeaf;
  if (lower.includes('grill') || lower.includes('mariachi')) return FaDrumstickBite;
  if (lower.includes('wok') || lower.includes('dragon')) return FaCarrot;
  if (lower.includes('seafood') || lower.includes('ocean')) return FaFish;
  if (lower.includes('french')) return FaCheese;
  if (lower.includes('table')) return FaUtensils;
  if (lower.includes('ice')) return FaIceCream;
  return FaUtensils;
} 