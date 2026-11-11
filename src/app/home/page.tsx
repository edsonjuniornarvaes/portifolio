import Hero from "@/components/home/hero";
import Showcase from "@/components/home/showcase";
import Process from "@/components/home/process";
import Numbers from "@/components/home/numbers";
import Services from "@/components/home/services";
import Writing from "@/components/home/writing";
import Contact from "@/components/home/contact";
import Marquee from "@/components/ui/marquee";
import { SectionHead, Section, Wrap } from "@/components/ui/layout";
import { getAllPosts } from "@/lib/posts";
import { getLang } from "@/i18n/server";
import { ui } from "@/i18n/dict";

export default async function Home() {
  const lang = await getLang();
  const t = ui[lang];
  const posts = (await getAllPosts(lang)).slice(0, 3).map(({ id, slug, title, excerpt, created_at }) => ({ id, slug, title, excerpt, created_at }));

  return (
    <>
      <Hero />
      <Marquee items={t.sectors} />

      <Wrap>
        <Section id="trabalhos" style={{ marginTop: 110 }}>
          <SectionHead n="01" label={t.work.label} action={{ href: "/projects", label: t.work.seeAll }} />
          <Showcase />
        </Section>

        <Section id="faco">
          <SectionHead n="02" label={t.services.label} />
          <Services />
        </Section>

        <Section>
          <SectionHead n="03" label={t.process.label} />
          <Process />
        </Section>

        <Section style={{ marginTop: 110 }}>
          <Numbers />
        </Section>

        <Section id="escrita">
          <SectionHead n="04" label={t.writing.label} action={{ href: "/blog", label: t.writing.all }} />
          <Writing posts={posts} />
        </Section>

        <Section id="contato">
          <SectionHead n="05" label={t.contact.label} />
          <Contact />
        </Section>
      </Wrap>
    </>
  );
}
