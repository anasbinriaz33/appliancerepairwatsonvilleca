import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import cooking_range_repair from "@/content/services/cooking-range-repair";

export const metadata: Metadata = cooking_range_repair.seo;

export default function CookingRangeRepairPage() {
  return <ServiceDetailPage service={cooking_range_repair} />;
}
