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
    title: "Atualizações OTA em React Native com o Stallion: da correção ao usuário em minutos",
    excerpt: "Por que corrigir um app leva dias, o que mudou com o fim do CodePush e como o Stallion entrega patches, rollout gradual e rollback automático.",
    cover_image_url: null,
    created_at: "2026-07-14T12:00:00.000Z",
    body_markdown: `Publicar uma correção demora **dias**. Em app React Native, boa parte do problema é de processo, não de código.

## O problema

- **Revisão da loja.** Apple e Google levam de 1 a 3 dias para aprovar qualquer atualização.
- **CodePush encerrado.** A Microsoft descontinuou o serviço em março de 2025; quem ainda usa está sem suporte.
- **Bundle pesado.** O OTA tradicional reenvia o arquivo inteiro a cada atualização.

## O que é o Stallion

O **Stallion** é uma plataforma de OTA (*over-the-air*) para React Native. Em vez de esperar a loja, o app recebe um novo bundle JavaScript em background. Os recursos que mais pesam na decisão:

| Recurso | O que faz |
|---|---|
| **Patch diff** | Envia só o que mudou, até 98% menor que o bundle completo |
| **Auto rollback** | Detecta crash nativo e volta sozinho ao bundle anterior |
| **Rollout faseado** | Libera para 5%, 50% e 100% dos usuários, gradualmente |
| **Analytics** | Acompanha adoção, downloads e rollbacks em tempo real |

## Do código ao usuário

1. Instale o SDK no projeto React Native.
2. Publique o bundle pela CLI:

\`\`\`bash
npx stallion publish-bundle
\`\`\`

3. Teste internamente com o modal do SDK antes de liberar.
4. Promova para produção no console, com rollout gradual.
5. O usuário recebe a atualização em background, sem passar pela loja.

## Vale para você?

Faz sentido se o seu time precisa de agilidade:

- **Hotfixes urgentes.** Correção de JS em produção sem esperar a revisão da loja.
- **Migração do CodePush.** A API é compatível e a migração está documentada no site deles.
- **Segurança de rollout.** Rollback automático em caso de crash, mais liberação gradual por porcentagem.

O plano é gratuito até 10 mil usuários ativos por mês (veja os detalhes em stalliontech.io).

## O limite que continua valendo

OTA troca **JavaScript e assets**. Código nativo novo, novas permissões e bibliotecas com parte nativa ainda exigem uma versão na loja. E amarre cada bundle à versão do binário que sabe executá-lo.

## Em resumo

OTA é uma ferramenta de **resposta rápida**. Com patches pequenos, rollout gradual e rollback automático, "esperar a loja" vira "corrigir em minutos".`,
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
    title: "Corte o custo do seu agente de IA: 5 táticas para parar de queimar tokens",
    excerpt: "Filtrar a saída do terminal com o RTK, cuidar do cache de 5 minutos, usar /compact e /clear, adotar o Pony Tail e escolher o modelo certo.",
    cover_image_url: null,
    created_at: "2026-09-12T12:00:00.000Z",
    body_markdown: `Você usa IA para programar todos os dias, mas sabe o que realmente está pagando? Estas são cinco táticas para parar de queimar tokens.

## O problema: o modelo lê tudo, e você paga

Um comando como \`git diff\` ou \`npm test\` cospe milhares de linhas de log. O agente processa esse lixo e cobra por cada caractere:

\`\`\`text
Output do terminal bruto (ex.: 5.000 tokens)
> error: undefined method 'map'...
> at line 42... (2000 linhas de stacktrace omitidas)
\`\`\`

## 1. RTK: o filtro cirúrgico

O **Rust Token Killer** intercepta seus comandos e limpa a saída antes de o texto chegar ao agente.

\`\`\`bash
# Sem RTK (padrão): ~4.200 tokens enviados ao modelo
git diff

# Com RTK: ~450 tokens enviados ao modelo
rtk git diff
\`\`\`

## 2. Cuidado com a pausa para o café

O cache do Claude expira após **5 minutos** de inatividade. Se você demorar para responder, a próxima mensagem força o modelo a reescrever **todo o histórico** da conversa.

> Sessão longa + pausa de 5 minutos gera um \`cache_write\` massivo de tudo que estava acumulado. O custo explode na volta.

## 3. Comprima antes de pausar

No Claude Code, não deixe a sessão expirar com o cache cheio:

- **Vai pausar?** Rode \`/compact\`. Ele comprime o histórico e reduz o volume de tokens que será regravado quando você voltar.
- **Mudou de tarefa?** Rode \`/clear\`. Sessões curtas e focadas sempre custam menos do que uma sessão longa e fragmentada.

## 4. Preguiça produtiva: Pony Tail

Um plugin que ensina o agente a ter "preguiça produtiva": força o modelo a pensar antes de sair cuspindo código novo.

1. **Reaproveita o que já existe.** Evita recriar funções que já estão no projeto.
2. **Prioriza recursos nativos.** Usa a stdlib antes de instalar novas dependências.

**Atenção:** use os modos *lite* ou *full*. O modo *ultra* pode comprimir demais e remover tratamentos de erro essenciais.

## 5. Escolha o modelo certo

Arquitetura inteligente bate força bruta. Modelos menores custam frações de centavos e resolvem a maior parte das tarefas diárias.

- **Modelos rápidos** (como Haiku ou 4o-mini): extrair dados, validar JSON, formatar logs.
- **Modelos pesados** (como a linha Sonnet): apenas para refatorações e arquitetura complexa.

## Em resumo

Filtre o que entra no contexto, não deixe o cache expirar cheio, comprima ou limpe a sessão, faça o agente reaproveitar o que existe e use o modelo certo para cada tarefa.`,
  },
];
