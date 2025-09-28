import { NextResponse } from "next/server";

async function subscribeWithMailchimp(email: string) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const serverPrefix = apiKey?.split("-")?.[1];
  if (!apiKey || !audienceId || !serverPrefix) return false;

  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apikey ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: email, status: "subscribed" }),
  });
  return res.ok;
}

async function subscribeWithConvertKit(email: string) {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;
  if (!apiKey || !formId) return false;

  const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey, email }),
  });
  return res.ok;
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const provider = process.env.NEWSLETTER_PROVIDER || "mock"; // "mailchimp" | "convertkit" | "mock"
    let ok = false;

    if (provider === "mailchimp") {
      ok = await subscribeWithMailchimp(email);
    } else if (provider === "convertkit") {
      ok = await subscribeWithConvertKit(email);
    } else {
      // Mock success for local/testing
      ok = true;
    }

    if (!ok) {
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Thanks for subscribing!" }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unexpected error" }, { status: 500 });
  }
}
