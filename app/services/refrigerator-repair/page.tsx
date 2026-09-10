import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import refrigerator_repair from "@/content/services/refrigerator-repair";

export const metadata: Metadata = refrigerator_repair.seo;

export default function RefrigeratorRepairPage() {
  return <ServiceDetailPage service={refrigerator_repair} />;
}
