import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// This route accepts booking submissions and appends them to a local log
// file (data/bookings.log) so nothing is lost even before email/SMS is
// wired up. For production, replace the fs.appendFileSync call below with
// a real integration — e.g. Resend, Nodemailer + your SMTP provider, or a
// database insert — since a file on Hostinger's Node hosting is not a
// reliable long-term store. The validation and shape of the data stay the
// same either way.
// ---------------------------------------------------------------------------

type BookingPayload = {
  name: string;
  phone: string;
  address: string;
  applianceType: string;
  issue: string;
  preferredDate?: string;
};

function isValidPayload(data: unknown): data is BookingPayload {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.name === "string" &&
    d.name.trim().length > 0 &&
    typeof d.phone === "string" &&
    d.phone.trim().length >= 7 &&
    typeof d.address === "string" &&
    d.address.trim().length > 0 &&
    typeof d.applianceType === "string" &&
    d.applianceType.trim().length > 0 &&
    typeof d.issue === "string" &&
    d.issue.trim().length > 0
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { ok: false, error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  const entry = {
    ...body,
    receivedAt: new Date().toISOString(),
  };

  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(dataDir, "bookings.log"),
      JSON.stringify(entry) + "\n",
      "utf8"
    );
  } catch (err) {
    console.error("Failed to persist booking:", err);
    // Don't fail the request just because logging failed — the customer
    // still submitted valid info. Swap in a real notification method
    // (email/SMS) so a logging failure never means a lost lead.
  }

  return NextResponse.json({ ok: true });
}
