import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "./lib/supabaseServer";

export  async function  proxy (request: NextRequest) {

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|png|jpg|jpeg|svg|ico)).*)",
    "/(api|trpc)(.*)",
  ],
};
