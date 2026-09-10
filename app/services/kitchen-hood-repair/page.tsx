import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import kitchen_hood_repair from "@/content/services/kitchen-hood-repair";

export const metadata: Metadata = kitchen_hood_repair.seo;

export default function KitchenHoodRepairPage() {
  return <ServiceDetailPage service={kitchen_hood_repair} />;
}
