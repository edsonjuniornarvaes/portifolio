"use client";

import Container from "../components/container";
import PageTitle from "../components/title";

import * as S from "./styles";

const stackData = [
  {
    title: "Newsletter Filipe Deschamps",
    description: "Newsletter",
    link: "https://filipedeschamps.com.br/newsletter",
    image: "https://filipedeschamps.com.br/avatar-big.png",
    alt: "",
  },
  {
    title: "TabNews",
    description: "Fórum",
    link: "https://www.tabnews.com.br/",
    image: "https://www.tabnews.com.br/brand/rounded-dark-transparent.svg",
    alt: "",
  },
  {
    title: "VS Code Themes",
    description: "Portal",
    link: "https://vscodethemes.com/",
    image: "https://avatars.githubusercontent.com/u/93441381?s=48&v=4",
    alt: "",
  },
  {
    title: "Beekeeper",
    description: "Database",
    link: "https://www.beekeeperstudio.io/",
    image:
      "https://res.cloudinary.com/dzp6uwf2o/image/upload/v1692640947/stack/nnqiceny90nnrgqwni60.png",
    alt: "",
  },
  {
    title: "MongoDB",
    description: "Database",
    link: "",
    image:
      "https://cdn.sanity.io/images/34ent8ly/production/b19d0329cd6ef87b71397762db06b2c181656ceb-824x824.png",
    alt: "",
  },
  {
    title: "Kap",
    description: "Ferramenta",
    link: "https://getkap.co/",
    image:
      "https://res.cloudinary.com/dzp6uwf2o/image/upload/v1692640947/stack/im3k2krnpawndvkjondr.png",
    alt: "",
  },
  {
    title: "Hidden Bar",
    description: "Ferramenta",
    link: "https://superbits.co/hidden/",
    image:
      "https://res.cloudinary.com/dzp6uwf2o/image/upload/v1692640947/stack/crg9ui6gqskvwnryisej.png",
    alt: "",
  },
  {
    title: "Rectangle",
    description: "Ferramenta",
    link: "https://rectangleapp.com/",
    image:
      "https://res.cloudinary.com/dzp6uwf2o/image/upload/v1692640948/stack/vboq5yjjkay0scyiguf3.png",
    alt: "",
  },
  {
    title: "Flameshot",
    description: "Ferramenta",
    link: "https://flameshot.org/",
    image:
      "https://res.cloudinary.com/dzp6uwf2o/image/upload/v1692640948/stack/csyg1n7s5uai7kz7eg8y.png",
    alt: "",
  },
  {
    title: "Figma",
    description: "Design",
    link: "https://www.figma.com",
    image:
      "https://res.cloudinary.com/dzp6uwf2o/image/upload/v1692640948/stack/s8u9k35gl1oqebobhjdj.png",
    alt: "",
  },
  {
    title: "ChatGPT",
    description: "IA Assistente",
    link: "https://chatgpt.com/",
    image:
      "https://res.cloudinary.com/dzp6uwf2o/image/upload/v1692640948/stack/ka9hz9dwltxmn5quui07.png",
    alt: "",
  },
  {
    title: "VS Code",
    description: "Código",
    link: "https://code.visualstudio.com/",
    image:
      "https://res.cloudinary.com/dzp6uwf2o/image/upload/v1692640949/stack/h2vgwnxcyg8ied4w8yat.png",
    alt: "",
  },
  {
    title: "Android Studio",
    description: "Código",
    link: "",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Android_Studio_Logo_%282023%29.svg/800px-Android_Studio_Logo_%282023%29.svg.png",
    alt: "",
  },
  {
    title: "Xcode",
    description: "Código",
    link: "",
    image:
      "https://developer.apple.com/assets/elements/icons/xcode-12/xcode-12-96x96_2x.png",
    alt: "",
  },
  {
    title: "Postman",
    description: "API Client",
    link: "",
    image:
      "https://media.dev.to/cdn-cgi/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Forganization%2Fprofile_image%2F5035%2F6b8f298c-c09b-48a5-9f70-a811376e63af.png",
    alt: "",
  },
  {
    title: "Insomnia",
    description: "API Client",
    link: "",
    image:
      "https://s3.amazonaws.com/s3.roaringapps.com/assets/icons/1561251841927-Insomnia.png",
    alt: "",
  },
  {
    title: "Notion",
    description: "Produtividade",
    link: "https://www.notion.so/pt",
    image:
      "https://res.cloudinary.com/dzp6uwf2o/image/upload/v1692640948/stack/iqs1tlr800gghwrzc8ux.png",
    alt: "",
  },
  {
    title: "Arc",
    description: "Navegador",
    link: "https://arc.net/",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Arc_%28browser%29_logo.svg/1200px-Arc_%28browser%29_logo.svg.png",
    alt: "",
  },
  {
    title: "Brave",
    description: "Navegador",
    link: "",
    image: "https://brave.com/static-assets/images/brave-logo-sans-text.svg",
    alt: "",
  },
  {
    title: "Warp",
    description: "Terminal",
    link: "",
    image:
      "https://img.stackshare.io/service/40636/default_832a31a1f4d780cc94fa435aaba04d9892a7b893.png",
    alt: "",
  },
  {
    title: "Hyper",
    description: "Terminal",
    link: "",
    image:
      "https://seeklogo.com/images/H/hyper-logo-C3FD37FA76-seeklogo.com.png",
    alt: "",
  },
  {
    title: "Reactotron",
    description: "Debug",
    link: "",
    image:
      "https://raw.githubusercontent.com/infinitered/reactotron/master/docs/plugins/images/readme/Reactotron-128.png",
    alt: "",
  },
];

const Stack = () => {
  return (
    <Container>
      <PageTitle title="Stack" />
      <S.Container>
        {stackData.map((item) => (
          <S.Card key={item.title}>
            <S.StyledImage src={item.image} alt={item.alt} />
            <S.Title>{item.title}</S.Title>
            <S.Description>{item.description}</S.Description>
          </S.Card>
        ))}
      </S.Container>
    </Container>
  );
};

export default Stack;
