import { Sk } from "@/components/ui/skeleton";
import { Wrap } from "@/components/ui/layout";

export default function Loading() {
  return (
    <Wrap>
      <div aria-busy="true" aria-label="Carregando" style={{ display: "grid", gap: 18, padding: "72px 0" }}>
        <Sk $w="220px" $h="0.9em" />
        <Sk $w="min(420px, 80%)" $h="clamp(3rem, 8vw, 6rem)" $r="14px" />
        <Sk $w="min(300px, 70%)" $h="clamp(3rem, 8vw, 6rem)" $r="14px" />
        <Sk $w="min(460px, 90%)" $h="1.2em" style={{ marginTop: 18 }} />
        <Sk $w="min(380px, 80%)" $h="1.2em" />
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <Sk $w="230px" $h="52px" $r="8px" />
          <Sk $w="170px" $h="52px" $r="8px" />
        </div>
      </div>
    </Wrap>
  );
}
