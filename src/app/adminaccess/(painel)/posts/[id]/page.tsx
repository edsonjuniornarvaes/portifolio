"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostEditor, { type PostData } from "@/components/admin/post-editor";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params?.id || "");
  const [post, setPost] = useState<PostData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const t = sessionStorage.getItem("admin_token");
    if (!t) {
      router.push("/adminaccess/login");
      return;
    }
    fetch(`/api/admin/posts/${id}`, { headers: { Authorization: `Bearer ${t}` } })
      .then((r) => {
        if (r.status === 401) {
          sessionStorage.removeItem("admin_token");
          router.push("/adminaccess/login");
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (!d) return;
        if (!d.post) setError(d.error || "Artigo não encontrado.");
        else setPost({ ...d.post });
      })
      .catch(() => setError("Falha de rede ao carregar o artigo."));
  }, [id, router]);

  if (error) return <p style={{ padding: "2rem", color: "#fca5a5" }}>{error}</p>;
  if (!post) return <p style={{ padding: "2rem", color: "var(--text-muted)" }}>Carregando…</p>;
  return <PostEditor key={post.id} initial={post} />;
}
