import type { IconType } from "react-icons";
import {
  SiReact, SiExpo, SiIos, SiAndroid, SiTypescript, SiJavascript, SiNextdotjs, SiNodedotjs, SiRedux,
  SiReduxsaga, SiMongodb, SiSupabase, SiJest, SiSentry, SiDatadog, SiMixpanel, SiBitrise, SiGithubactions,
  SiDocker, SiGit, SiAuth0, SiFigma, SiPhp, SiLaravel, SiAppstore, SiGoogleplay, SiKibana, SiStyledcomponents,
} from "react-icons/si";

type Entry = { Icon: IconType; color?: string };

const MAP: Record<string, Entry> = {
  "react native": { Icon: SiReact, color: "#61DAFB" },
  "react.js": { Icon: SiReact, color: "#61DAFB" },
  react: { Icon: SiReact, color: "#61DAFB" },
  expo: { Icon: SiExpo },
  ios: { Icon: SiIos },
  android: { Icon: SiAndroid, color: "#3DDC84" },
  typescript: { Icon: SiTypescript, color: "#3B82F6" },
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  "next.js": { Icon: SiNextdotjs },
  "node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  redux: { Icon: SiRedux, color: "#9B6BDF" },
  "redux saga": { Icon: SiReduxsaga, color: "#A3A3A3" },
  mongodb: { Icon: SiMongodb, color: "#47A248" },
  supabase: { Icon: SiSupabase, color: "#3FCF8E" },
  jest: { Icon: SiJest, color: "#E5484D" },
  sentry: { Icon: SiSentry, color: "#FB4226" },
  datadog: { Icon: SiDatadog, color: "#A06BE0" },
  mixpanel: { Icon: SiMixpanel, color: "#7856FF" },
  bitrise: { Icon: SiBitrise, color: "#A66FD6" },
  "github actions": { Icon: SiGithubactions, color: "#2088FF" },
  docker: { Icon: SiDocker, color: "#2496ED" },
  git: { Icon: SiGit, color: "#F05032" },
  auth0: { Icon: SiAuth0, color: "#EB5424" },
  figma: { Icon: SiFigma, color: "#F24E1E" },
  php: { Icon: SiPhp, color: "#8993BE" },
  laravel: { Icon: SiLaravel, color: "#FF2D20" },
  "app store / play store": { Icon: SiAppstore, color: "#0D96F6" },
  "app store": { Icon: SiAppstore, color: "#0D96F6" },
  "play store": { Icon: SiGoogleplay, color: "#34A853" },
  kibana: { Icon: SiKibana, color: "#00BFB3" },
  "styled-components": { Icon: SiStyledcomponents, color: "#DB7093" },
};

export function hasTechIcon(name: string) {
  return !!MAP[name.trim().toLowerCase()];
}

/** Ícone da tecnologia (cor da marca). Sem ícone conhecido, não renderiza nada. */
export default function TechIcon({ name, size = 15 }: { name: string; size?: number }) {
  const e = MAP[name.trim().toLowerCase()];
  if (!e) return null;
  const { Icon, color } = e;
  return <Icon size={size} color={color} aria-hidden style={{ flexShrink: 0 }} />;
}
