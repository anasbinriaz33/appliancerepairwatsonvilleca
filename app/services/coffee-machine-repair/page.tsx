import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import coffee_machine_repair from "@/content/services/coffee-machine-repair";

export const metadata: Metadata = coffee_machine_repair.seo;

export default function CoffeeMachineRepairPage() {
  return <ServiceDetailPage service={coffee_machine_repair} />;
}
