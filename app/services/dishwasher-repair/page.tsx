import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import dishwasher_repair from "@/content/services/dishwasher-repair";

export const metadata: Metadata = dishwasher_repair.seo;

export default function DishwasherRepairPage() {
  return <ServiceDetailPage service={dishwasher_repair} />;
}
