import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
interface ClerkUserCreatedEvent {
  type: "user.created";
  data: {
    id: string;
    email_addresses?: { email_address: string }[];
    first_name?: string;
    last_name?: string;
    profile_image_url?: string;
  };
}

type ClerkWebhookEvent = ClerkUserCreatedEvent; // يمكن إضافة أنواع أخرى لاحقاً

export async function POST(req: Request) {
  const payload = await req.text();
  const headerList = await headers();

  const svixHeaders = {
    "svix-id": headerList.get("svix-id")!,
    "svix-timestamp": headerList.get("svix-timestamp")!,
    "svix-signature": headerList.get("svix-signature")!,
  };

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  let evt: ClerkWebhookEvent;

  try {
    evt = wh.verify(payload, svixHeaders) as ClerkWebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (evt.type === "user.created") {
    const user = evt.data;
    console.log("user123" , user)
    await supabaseServer.from("profiles").insert({
      id: user.id,
      email: user.email_addresses?.[0]?.email_address ?? null,
      name: [user.first_name, user.last_name].filter(Boolean).join(" "),
      image_url: user.profile_image_url,
    });
  }

  return NextResponse.json({ status: "ok" });
}
