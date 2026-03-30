import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { createServerClient } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/verify-admin";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "Arquivo ausente" }, { status: 400 });
    }

    const type = file.type || "";
    if (!ALLOWED.has(type)) {
      return NextResponse.json({ error: "Use JPEG, PNG, WebP ou GIF" }, { status: 400 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    if (buf.length > MAX_BYTES) {
      return NextResponse.json({ error: "Máximo 5 MB" }, { status: 400 });
    }

    const ext = type === "image/jpeg" ? "jpg" : type.replace("image/", "") || "bin";
    const name = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;

    const supabase = createServerClient();
    const { error } = await supabase.storage.from("blog-covers").upload(name, buf, {
      contentType: type,
      upsert: false,
    });

    if (error) {
      console.error("storage upload", error);
      return NextResponse.json(
        {
          error:
            "Falha no upload. Crie o bucket público `blog-covers` no Supabase (veja supabase-cms-schema.sql).",
        },
        { status: 500 },
      );
    }

    const { data: pub } = supabase.storage.from("blog-covers").getPublicUrl(name);
    return NextResponse.json({ url: pub.publicUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erro ao enviar arquivo" }, { status: 500 });
  }
}
