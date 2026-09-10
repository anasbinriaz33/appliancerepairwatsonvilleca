import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import washing_machine_repair from "@/content/services/washing-machine-repair";

export const metadata: Metadata = washing_machine_repair.seo;

export default function WashingMachineRepairPage() {
  return <ServiceDetailPage service={washing_machine_repair} />;
}
