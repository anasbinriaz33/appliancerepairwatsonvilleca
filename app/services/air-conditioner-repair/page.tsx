import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import air_conditioner_repair from "@/content/services/air-conditioner-repair";

export const metadata: Metadata = air_conditioner_repair.seo;

export default function AirConditionerRepairPage() {
  return <ServiceDetailPage service={air_conditioner_repair} />;
}
