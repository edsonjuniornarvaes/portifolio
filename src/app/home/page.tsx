import Hero from "@/components/home/hero";
import WorkScroller from "@/components/home/work-scroller";
import CodeSection from "@/components/home/code-section";
import Writing from "@/components/home/writing";
import Contact from "@/components/home/contact";
import Marquee from "@/components/ui/marquee";
import { SectionHead, Section, Wrap } from "@/components/ui/layout";
import { getAllPosts } from "@/lib/posts";
import { getLang } from "@/i18n/server";
import { ui } from "@/i18n/dict";

const TECH = ["React Native", "Next.js", "TypeScript", "Expo", "React", "Node.js", "Supabase", "Redux", "Auth0", "Jest", "Sentry", "Bitrise", "Docker", "Figma", "Git"];

export default async function Home() {
  const lang = await getLang();
  const t = ui[lang];
  const posts = (await getAllPosts(lang)).slice(0, 3).map(({ id, slug, title, excerpt, created_at }) => ({ id, slug, title, excerpt, created_at }));

  return (
    <>
      <Hero />
      <Marquee items={TECH} />

      <Wrap>
        <Section id="trabalhos" style={{ marginBottom: 0 }}>
          <SectionHead n="01" label={t.work.label} action={{ href: "/projects", label: t.work.seeAll }} />
        </Section>
      </Wrap>
      <WorkScroller />

      <Wrap>
        <Section id="faco">
          <SectionHead n="02" label={t.code.label} />
          <CodeSection />
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
