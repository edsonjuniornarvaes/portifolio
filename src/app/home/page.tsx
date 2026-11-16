import Hero from "@/components/home/hero";
import Wave from "@/components/ui/wave";
import WorkList from "@/components/home/work-list";
import DevicesStrip from "@/components/home/devices-strip";
import Services from "@/components/home/services";
import Writing from "@/components/home/writing";
import Contact from "@/components/home/contact";
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
      <Wave id="a" />
      <Wrap>
        <Section id="trabalhos" style={{ marginTop: 80 }}>
          <SectionHead n="01" label={t.work.label} action={{ href: "/projects", label: t.work.seeAll }} />
          <WorkList />
        </Section>

        <Section style={{ marginTop: 90 }}>
          <DevicesStrip />
        </Section>

        <Wave id="b" />
        <Section id="faco" style={{ marginTop: 40 }}>
          <SectionHead n="02" label={t.services.label} />
          <Services />
        </Section>

        <Section id="escrita">
          <SectionHead n="03" label={t.writing.label} action={{ href: "/blog", label: t.writing.all }} />
          <Writing posts={posts} />
        </Section>

        <Section id="contato">
          <SectionHead n="04" label={t.contact.label} />
          <Contact />
        </Section>
      </Wrap>
    </>
  );
}
