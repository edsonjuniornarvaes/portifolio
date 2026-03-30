import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/verify-admin";
import { getAllProjectsBrief } from "@/app/projects/helper";

export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  return NextResponse.json({ projects: getAllProjectsBrief() });
}
