import Hero from "@/components/home/hero";
import Wave from "@/components/ui/wave";
import Reveal from "@/components/ui/reveal";
import ProjectsSlider from "@/components/home/projects-slider";
import WhereWorked from "@/components/home/where-worked";
import Services from "@/components/home/services";
import Radar from "@/components/home/radar";
import Process from "@/components/home/process";
import Contact from "@/components/home/contact";
import { SectionHead, Section, Wrap } from "@/components/ui/layout";
import { getLang } from "@/i18n/server";
import { ui } from "@/i18n/dict";

export default async function Home() {
  const lang = await getLang();
  const t = ui[lang];

  return (
    <>
      <Hero />
      <Wave id="a" />
      <Wrap>
        <Section id="trabalhos" style={{ marginTop: 60 }}>
          <Reveal y={28} from={1}><SectionHead n="01" label={t.work.portfolio} action={{ href: "/projects", label: t.work.seeAll }} /></Reveal>
          <Reveal><ProjectsSlider /></Reveal>
        </Section>

        <Wave id="b" />
        <Section id="faco" style={{ marginTop: 40 }}>
          <Reveal y={28} from={1}><SectionHead n="02" label={t.services.label} /></Reveal>
          <Reveal><Services /></Reveal>
        </Section>

        <Section id="processo" style={{ marginTop: 90 }}>
          <Reveal y={28} from={1}><SectionHead n="03" label={t.process.label} /></Reveal>
          <Reveal><Process /></Reveal>
        </Section>

        <Section id="onde" style={{ marginTop: 90 }}>
          <Reveal y={28} from={1}><SectionHead n="04" label={t.worked.label} /></Reveal>
          <Reveal><WhereWorked /></Reveal>
        </Section>

        <Section id="contato" style={{ marginTop: 90 }}>
          <Reveal y={28} from={1}><SectionHead n="05" label={t.contact.label} /></Reveal>
          <Reveal><Radar /></Reveal>
          <Reveal y={36} style={{ marginTop: 22 }}><Contact /></Reveal>
        </Section>
      </Wrap>
    </>
  );
}
