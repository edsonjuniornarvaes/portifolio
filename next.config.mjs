/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Evita chunks quebrados do react-icons no App Router (vendor-chunks/*.js ausente). */
  transpilePackages: ["react-icons", "@uiw/react-md-editor", "@uiw/react-markdown-preview"],
  async redirects() {
    // endereços antigos dos projetos que foram reunidos
    const merged = {
      "mont-b2b": "mont-capital", "mont-b2c": "mont-capital",
      "consorcio-gazin": "gazin", "gazin-b2b-b2c": "gazin", "venda-direta-gazin": "gazin",
      "lojas-manao": "erp-sistemas", "agiliza-ai": "erp-sistemas", "mix-telecom": "erp-sistemas", "gerenciador-senhas": "erp-sistemas",
    };
    return [
      ...Object.entries(merged).map(([from, to]) => ({ source: `/projects/${from}`, destination: `/projects/${to}`, permanent: true })),
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/trajetoria",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
