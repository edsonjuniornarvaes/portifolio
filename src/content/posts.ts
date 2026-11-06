export type StaticPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  body_markdown: string;
  created_at: string;
};

/**
 * Artigos que vivem no código. Aparecem mesmo sem Supabase; um artigo do painel admin com o
 * mesmo slug sobrescreve o daqui. Para editar um deles pelo painel, crie um artigo com o mesmo slug.
 */
export const STATIC_POSTS: StaticPost[] = [
  {
    id: "static-mvvm-na-pratica-react-native",
    slug: "mvvm-na-pratica-react-native",
    title: "MVVM na prática em React Native",
    excerpt: "Como separar tela, estado e regras de negócio num app React Native para que ele continue fácil de mudar e de testar.",
    cover_image_url: null,
    created_at: "2026-02-10T12:00:00.000Z",
    body_markdown: `Quando um app React Native cresce, o primeiro sintoma quase sempre é o mesmo: componentes com **200 linhas** que misturam layout, chamadas de API, estado, formatação e regra de negócio. Mudar uma coisa quebra três. Testar vira um sacrifício.

O **MVVM** (Model, View, ViewModel) é uma forma simples de colocar cada coisa no seu lugar.

## As três camadas

- **View**: só desenha. Recebe dados prontos e dispara ações. Não sabe de onde os dados vêm.
- **ViewModel**: guarda o estado da tela, reage às ações e conversa com serviços. No React, costuma ser um *hook*.
- **Model**: tipos, constantes e regras puras (sem React).

## Estrutura de pastas

\`\`\`text
features/
  extrato/
    index.tsx        # View
    viewModel.ts     # estado e ações
    models.ts        # tipos e constantes
    styles.ts        # estilos
\`\`\`

Cada tela tem a mesma forma. Quem chega no projeto sabe onde procurar.

## Um exemplo

O ViewModel fica com o estado e as regras:

\`\`\`ts
// viewModel.ts
export function useExtratoViewModel() {
  const [periodo, setPeriodo] = useState<Periodo>("30d");
  const { data, isLoading, error } = useExtrato(periodo);

  const total = useMemo(
    () => (data ?? []).reduce((soma, item) => soma + item.valor, 0),
    [data],
  );

  return { periodo, setPeriodo, itens: data ?? [], total, isLoading, error };
}
\`\`\`

E a View só consome:

\`\`\`tsx
// index.tsx
export default function Extrato() {
  const vm = useExtratoViewModel();

  if (vm.isLoading) return <Carregando />;
  if (vm.error) return <Erro onRetry={() => vm.setPeriodo(vm.periodo)} />;

  return (
    <Tela>
      <Filtro valor={vm.periodo} onChange={vm.setPeriodo} />
      <Lista itens={vm.itens} />
      <Total valor={vm.total} />
    </Tela>
  );
}
\`\`\`

## O que se ganha

1. **Testes mais baratos.** O ViewModel é só um hook: dá para testar a regra sem renderizar tela nenhuma.
2. **Telas mais leves.** A View vira praticamente um template.
3. **Padrão do time.** Todo mundo organiza do mesmo jeito, e a revisão de código fica mais rápida.
4. **Troca de UI sem medo.** Dá para redesenhar a tela sem mexer na regra.

## Cuidados

- Não faça do ViewModel um "depósito de tudo". Se uma regra é pura, ela pertence ao Model.
- Evite que a View chame serviços direto. O caminho é View → ViewModel → serviço.
- Não exagere em telas pequenas: um componente simples não precisa de ViewModel.

## Em resumo

MVVM não é sobre seguir um diagrama; é sobre **ter um lugar certo para cada coisa**. Em apps financeiros, onde uma regra errada custa caro, essa separação paga a conta rápido.`,
  },
  {
    id: "static-auth0-em-apps-sso-mfa-tokens",
    slug: "auth0-em-apps-sso-mfa-tokens",
    title: "Auth0 em apps: SSO, MFA, login social e o caminho dos tokens",
    excerpt: "Um mapa do fluxo de autenticação em apps móveis: Authorization Code com PKCE, tipos de token e onde guardá-los.",
    cover_image_url: null,
    created_at: "2026-01-20T12:00:00.000Z",
    body_markdown: `Autenticação é uma daquelas partes que **ninguém quer escrever do zero** e que todo mundo erra quando escreve. Usar um provedor como o Auth0 tira muito peso, mas ainda é preciso entender o fluxo para não montar algo inseguro por cima.

## O fluxo recomendado para apps

Em apps móveis, o padrão é o **Authorization Code Flow com PKCE**:

1. O app abre o navegador do sistema na tela de login (Universal Login).
2. A pessoa se autentica (senha, login social, MFA...).
3. O Auth0 devolve um **código** de uso único para o app.
4. O app troca o código por tokens, provando que é quem iniciou o fluxo (o PKCE).

Nunca coloque o formulário de login dentro do app: o navegador do sistema permite SSO, gerenciadores de senha e reduz o risco de captura de credenciais.

## Os três tipos de token

| Token | Para quê | Vida |
|---|---|---|
| **ID token** | Dizer *quem* é a pessoa (perfil) | curta |
| **Access token** | Chamar a sua API | curta |
| **Refresh token** | Pedir novos access tokens | longa |

O access token é o que viaja a cada requisição. Por isso ele vive pouco: se vazar, o estrago é limitado.

## Onde guardar

- Use o armazenamento seguro do sistema: **Keychain** (iOS) e **Keystore** (Android).
- Nunca guarde tokens em \`AsyncStorage\` ou em logs.
- Ative a **rotação de refresh tokens**: cada uso gera um novo e invalida o anterior.

## SSO, MFA e login social

- **SSO**: com o Universal Login, quem já está logado no navegador entra sem digitar de novo.
- **MFA**: configurado no provedor, sem mudar o código do app. Dá para exigir só em ações sensíveis (step-up).
- **Login social**: Google, Apple e outros entram como conexões. O app continua falando só com o Auth0.

## Validação no backend

O backend **sempre** valida o access token: assinatura, emissor, público (\`audience\`) e validade. O app nunca decide sozinho o que alguém pode fazer.

\`\`\`ts
// exemplo conceitual de verificação
const payload = await verificarJwt(token, {
  issuer: "https://SEU-TENANT.auth0.com/",
  audience: "https://api.seuapp.com",
});
\`\`\`

## Checklist rápido

- [x] Authorization Code + PKCE
- [x] Tokens em Keychain/Keystore
- [x] Refresh token com rotação
- [x] Validação de \`audience\` e \`issuer\` no servidor
- [x] Logout que também encerra a sessão no provedor

Autenticação bem feita é invisível para o usuário e chata para o atacante. É exatamente o que se quer.`,
  },
  {
    id: "static-atualizacoes-ota-sem-passar-pela-loja",
    slug: "atualizacoes-ota-sem-passar-pela-loja",
    title: "Atualizações OTA: corrigir o app sem passar pela loja",
    excerpt: "O que são atualizações over-the-air em React Native, o que elas podem e não podem mudar, e como usá-las com segurança.",
    cover_image_url: null,
    created_at: "2026-07-14T12:00:00.000Z",
    body_markdown: `Publicar uma correção na App Store ou no Google Play pode levar de horas a dias. Quando o bug está em produção, isso é uma eternidade. As atualizações **OTA** (*over-the-air*) permitem entregar mudanças direto ao app instalado, sem uma nova versão na loja.

## Como funciona

Um app React Native é, em grande parte, um **bundle de JavaScript** rodando dentro de um binário nativo. A atualização OTA troca só esse bundle (e os assets), deixando o binário como está.

Ferramentas como o **React Native Stallion** e o EAS Update cuidam de empacotar, distribuir e aplicar o novo bundle.

## O que dá para atualizar

- Telas, textos e estilos
- Lógica em JavaScript/TypeScript
- Correção de bugs de regra de negócio
- Imagens e outros assets

## O que **não** dá

- Qualquer código **nativo** novo (Swift, Kotlin, módulos nativos)
- Novas permissões
- Atualização de bibliotecas que têm parte nativa

Mudou algo nativo? Aí é versão nova na loja.

## Boas práticas

1. **Compatibilidade de runtime.** Um bundle só pode ser entregue a binários que sabem executá-lo. Amarre cada atualização à versão do app.
2. **Rollout gradual.** Envie para 5%, depois 25%, depois todos, acompanhando erros.
3. **Rollback pronto.** Se o novo bundle falhar, o app precisa voltar sozinho ao anterior.
4. **Observabilidade.** Registre qual versão do bundle cada pessoa está rodando; sem isso, não dá para investigar bugs.
5. **Respeite as regras das lojas.** OTA é para corrigir e ajustar; não para mudar o propósito do app depois da revisão.

## Onde costuma dar errado

- Mudar um tipo de dado que o backend ainda não aceita.
- Esquecer de testar o bundle no binário mais antigo ainda em uso.
- Tratar OTA como desculpa para pular testes.

## Em resumo

OTA é uma ferramenta de **resposta rápida**, não um atalho para tudo. Usada com rollout gradual e rollback, ela transforma "esperar a loja" em "corrigir em minutos".`,
  },
  {
    id: "static-cobrancas-em-apps-com-stripe",
    slug: "cobrancas-em-apps-com-stripe",
    title: "Cobranças em apps com Stripe: o que o app faz e o que o servidor faz",
    excerpt: "A divisão de responsabilidades que mantém pagamentos seguros: o app coleta, o servidor decide, o webhook confirma.",
    cover_image_url: null,
    created_at: "2026-04-08T12:00:00.000Z",
    body_markdown: `Receber dentro de um app parece simples até a primeira cobrança duplicada. O segredo é **dividir bem as responsabilidades**.

## Antes: a regra das lojas

Para **bens e serviços digitais** consumidos dentro do app, Apple e Google exigem a compra pelo sistema deles (In-App Purchase). Já para **produtos físicos, serviços do mundo real e pagamentos entre pessoas**, dá para usar um processador como o Stripe. Confira sempre a política vigente antes de decidir.

## Quem faz o quê

| Quem | Responsabilidade |
|---|---|
| **App** | Coletar o meio de pagamento com segurança e mostrar o resultado |
| **Servidor** | Definir **valor, moeda e cliente**, e criar a cobrança |
| **Stripe** | Processar, autenticar (3D Secure) e guardar os dados do cartão |
| **Webhook** | Confirmar o resultado de forma confiável |

A regra de ouro: **o valor nunca vem do app**. Quem calcula o preço é o servidor, a partir do banco de dados.

## O fluxo

1. O app pede ao seu servidor para iniciar um pagamento.
2. O servidor cria um \`PaymentIntent\` com o valor correto e devolve o \`client_secret\`.
3. O app apresenta a *Payment Sheet* do Stripe e confirma o pagamento.
4. O Stripe avisa o servidor por **webhook**.
5. O servidor marca o pedido como pago.

\`\`\`ts
// servidor: criando a cobrança
const intent = await stripe.paymentIntents.create(
  {
    amount: totalEmCentavos(pedido), // calculado no servidor
    currency: "brl",
    customer: clienteId,
    metadata: { pedidoId: pedido.id },
  },
  { idempotencyKey: \`pedido-\${pedido.id}\` },
);
\`\`\`

## Detalhes que evitam dor de cabeça

- **Idempotência**: a mesma chave de idempotência impede cobrança em dobro se a requisição for repetida.
- **Webhook como fonte da verdade**: a tela do app pode fechar no meio; o webhook não.
- **Verifique a assinatura** de cada webhook antes de confiar nele.
- **Trate estados intermediários**: pagamento pendente, em análise e recusado precisam de mensagens diferentes.
- **Valores em centavos**, sempre inteiros.

## Em resumo

O app **pede e mostra**; o servidor **decide**; o webhook **confirma**. Quando cada parte faz só o seu papel, pagamentos ficam previsíveis.`,
  },
  {
    id: "static-gastar-menos-tokens-com-agentes-de-ia",
    slug: "gastar-menos-tokens-com-agentes-de-ia",
    title: "Como gastar menos tokens com agentes de IA no dia a dia",
    excerpt: "Hábitos simples para reduzir custo e ruído ao usar Claude Code e outros agentes: contexto enxuto, tarefas focadas e a ferramenta certa.",
    cover_image_url: null,
    created_at: "2026-09-12T12:00:00.000Z",
    body_markdown: `Agentes de IA cobram (em tokens e em atenção) por tudo que entra no contexto. A boa notícia: a maior parte do desperdício vem de **hábitos**, não de limitação da ferramenta.

## 1. Contexto é custo

Cada mensagem, arquivo lido e saída de comando fica no contexto e é reprocessado a cada passo. Contexto grande custa mais e, pior, **distrai o modelo**.

- Comece uma conversa nova quando mudar de assunto.
- Peça respostas curtas quando não precisar de explicação.
- Evite colar arquivos inteiros quando um trecho resolve.

## 2. Instruções fixas, enxutas

Arquivos como \`CLAUDE.md\` são lidos em toda sessão. Mantenha só o que realmente muda o comportamento: comandos do projeto, convenções e armadilhas conhecidas. Texto longo ali é custo fixo.

## 3. Tarefas pequenas e bem definidas

"Refatore tudo" gasta muito e entrega pouco. "Extraia a regra X do arquivo Y para uma função pura e adicione testes" é barato e verificável.

## 4. Deixe o repositório trabalhar por você

- Mensagens de erro e testes que falham dão ao agente um alvo claro.
- Scripts de lint, tipos e testes valem mais do que explicar o que está errado.

## 5. Escolha o modelo pela tarefa

Tarefas mecânicas (renomear, formatar, gerar boilerplate) não precisam do modelo mais capaz. Reserve-o para decisões de arquitetura e bugs difíceis.

## 6. Delegue a busca

Buscas amplas no código geram muita saída. Delegar para um sub-agente devolve só a conclusão, mantendo o seu contexto limpo.

## 7. Meça

Se você não sabe onde o custo está indo, não dá para reduzi-lo. Acompanhe o consumo por sessão e observe quais tarefas são as mais caras.

## Em resumo

Menos contexto, instruções curtas, tarefas focadas e o modelo certo para cada trabalho. Quase sempre dá para gastar bem menos **sem perder qualidade**, só com disciplina.`,
  },
];
