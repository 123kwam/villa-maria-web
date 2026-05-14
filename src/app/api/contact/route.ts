import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const ContactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(5).max(30),
  message: z.string().trim().max(2000).optional().default(""),
  // honeypot — bots fill hidden inputs; humans don't see this one
  website: z.string().max(0).optional().default(""),
});

const TO_ADDRESS = process.env.RESEND_TO ?? "info@restaurantvillamaria.nl";
const FROM_ADDRESS =
  process.env.RESEND_FROM ?? "Villa Maria Website <onboarding@resend.dev>";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, phone, message, website } = parsed.data;

  if (website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  const fullName = `${firstName} ${lastName}`;
  const lines = [
    `From:    ${fullName}`,
    `Email:   ${email}`,
    `Phone:   ${phone}`,
    "",
    message ? "Message:" : "(no message)",
    message,
  ].filter(Boolean);

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: email,
      subject: `Website contact form — ${fullName}`,
      text: lines.join("\n"),
    });

    if (result.error) {
      console.error("[contact] resend send error", result.error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
