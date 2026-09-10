import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import washer_dryer_repair from "@/content/services/washer-dryer-repair";

export const metadata: Metadata = washer_dryer_repair.seo;

export default function WasherDryerRepairPage() {
  return <ServiceDetailPage service={washer_dryer_repair} />;
}
