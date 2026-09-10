import type { Service } from "@/content/services/types";
import air_conditioner_repair from "@/content/services/air-conditioner-repair";
import coffee_machine_repair from "@/content/services/coffee-machine-repair";
import cooking_range_repair from "@/content/services/cooking-range-repair";
import dishwasher_repair from "@/content/services/dishwasher-repair";
import kitchen_hood_repair from "@/content/services/kitchen-hood-repair";
import oven_repair from "@/content/services/oven-repair";
import refrigerator_repair from "@/content/services/refrigerator-repair";
import washer_dryer_repair from "@/content/services/washer-dryer-repair";
import washing_machine_repair from "@/content/services/washing-machine-repair";

export type { Service } from "@/content/services/types";

export const services: Service[] = [
  air_conditioner_repair,
  coffee_machine_repair,
  cooking_range_repair,
  dishwasher_repair,
  kitchen_hood_repair,
  oven_repair,
  refrigerator_repair,
  washer_dryer_repair,
  washing_machine_repair,
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
