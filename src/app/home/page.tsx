import Hero from "@/components/home/hero";
import WorkIndex from "@/components/home/work-index";
import Services from "@/components/home/services";
import Writing from "@/components/home/writing";
import Contact from "@/components/home/contact";
import { SectionHead, Section, Wrap } from "@/components/ui/layout";
import { SELECTED_IDS } from "@/data/work";
import { getAllPosts } from "@/lib/posts";
import { getLang } from "@/i18n/server";
import { ui } from "@/i18n/dict";

export const dynamic = "force-dynamic";

export default async function Home() {
  const lang = await getLang();
  const t = ui[lang];
  const posts = (await getAllPosts(lang)).slice(0, 3).map(({ id, slug, title, excerpt, created_at }) => ({ id, slug, title, excerpt, created_at }));

  return (
    <>
      <Hero />
      <Wrap>
        <Section id="trabalhos">
          <SectionHead n="01" label={t.work.selected} action={{ href: "/projects", label: `${t.work.seeAll} →` }} />
          <WorkIndex ids={SELECTED_IDS} />
        </Section>

        <Section id="faco">
          <SectionHead n="02" label={t.services.label} />
          <Services />
        </Section>

        <Section id="escrita">
          <SectionHead n="03" label={t.writing.label} action={{ href: "/blog", label: `${t.writing.all} →` }} />
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
