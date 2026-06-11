import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";

// Vercel serverless: /tmp is the only writable area across invocations.
// We persist subscribers to /tmp and also notify via Telegram bot.
const SUBSCRIBERS_FILE = "/tmp/ath-subscribers.json";

type Subscriber = {
  email: string;
  subscribedAt: string;
  source: string;
  userAgent?: string;
};

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeSubscribers(subs: Subscriber[]): Promise<void> {
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subs, null, 2), "utf-8");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function notifyTelegram(email: string, source: string, totalCount: number) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_NEWSLETTER_CHAT_ID;
  if (!botToken || !chatId) return;
  try {
    const text = [
      "📬 *New newsletter subscriber*",
      `Email: \`${email}\``,
      `Source: ${source}`,
      `Total list: ${totalCount}`,
    ].join("\n");
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.error("[subscribe] telegram notify failed:", err);
  }
}

export async function POST(req: NextRequest) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const source = (body.source ?? "newsletter").trim();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  const subs = await readSubscribers();

  // Dedup
  if (subs.some((s) => s.email === email)) {
    return NextResponse.json({
      ok: true,
      message: "You're already subscribed.",
      alreadyMember: true,
      subscriberCount: subs.length,
    });
  }

  const subscriber: Subscriber = {
    email,
    subscribedAt: new Date().toISOString(),
    source,
    userAgent: req.headers.get("user-agent") ?? undefined,
  };
  subs.push(subscriber);
  await writeSubscribers(subs);

  // Fire-and-forget Telegram notification (don't block the response)
  notifyTelegram(email, source, subs.length).catch(() => {});

  return NextResponse.json({
    ok: true,
    message: "Subscribed successfully. Check your inbox tomorrow at 7 AM ET.",
    alreadyMember: false,
    subscriberCount: subs.length,
  });
}

export async function GET() {
  const subs = await readSubscribers();
  return NextResponse.json({
    count: subs.length,
    subscribers: subs.map((s) => ({
      email: s.email,
      subscribedAt: s.subscribedAt,
      source: s.source,
    })),
  });
}
