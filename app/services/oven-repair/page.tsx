import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import oven_repair from "@/content/services/oven-repair";

export const metadata: Metadata = oven_repair.seo;

export default function OvenRepairPage() {
  return <ServiceDetailPage service={oven_repair} />;
}
