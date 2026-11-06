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
    title: "MVVM explicado: o que é, quando usar e como aplicar em React Native",
    excerpt: "Model, View e ViewModel: a responsabilidade de cada camada, por que separar a interface da lógica de negócio e quando o padrão não vale a pena.",
    cover_image_url: null,
    created_at: "2026-02-10T12:00:00.000Z",
    body_markdown: `**MVVM** (Model-View-ViewModel) é um padrão que separa a interface da lógica de negócio.

## O desafio da organização

Quando código de UI e regras de negócio ficam misturados, aparecem os mesmos problemas:

- Dificuldade para testar e manter
- Acoplamento entre tela e lógica
- Retrabalho ao mudar a interface
- Duplicação de código entre telas

## Os três componentes

Cada um com uma responsabilidade clara:

| Camada | Responsabilidade |
|---|---|
| **View** | Exibe dados e captura interações do usuário |
| **ViewModel** | Prepara dados e comandos para a tela |
| **Model** | Dados e regras de negócio do domínio |

O fluxo é View ↔ ViewModel ↔ Model. O Model não conhece a View.

### Model

A camada de dados e regras de negócio.

- Estruturas de dados e entidades do domínio
- Validações, cálculos e regras de negócio
- Não conhece View nem ViewModel

### View

A interface do usuário: o que ele vê e toca.

- Telas e componentes (React Native, Flutter, Swift/Kotlin etc.)
- Exibe dados expostos pelo ViewModel
- Sem lógica de negócio, só apresentação e eventos

### ViewModel

A ponte entre View e Model: estado e lógica da tela.

- Transforma dados do Model para a View
- Expõe propriedades e comandos (*binding*)
- Lógica de apresentação, sem depender da UI

## Como fica em React Native

Cada tela vira uma pasta pequena, com um arquivo para cada papel:

\`\`\`text
features/cart/
  index.tsx        // View: só renderiza
  viewModel.ts     // ViewModel: estado e handlers
  models.ts        // Model: tipos e regras
\`\`\`

\`\`\`ts
// models.ts
export type CartItem = { id: string; name: string; price: number; qty: number }

export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0)
\`\`\`

\`\`\`ts
// viewModel.ts
import { useState } from 'react'
import { cartTotal, type CartItem } from './models'

export function useCartViewModel(initial: CartItem[]) {
  const [items, setItems] = useState(initial)

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id))

  return { items, total: cartTotal(items), remove }
}
\`\`\`

\`\`\`tsx
// index.tsx
export default function CartScreen() {
  const { items, total, remove } = useCartViewModel(initialItems)
  return <CartList items={items} total={total} onRemove={remove} />
}
\`\`\`

A View não sabe como o total é calculado. O ViewModel pode ser testado sem renderizar nada.

## Por que usar MVVM

- Testar a lógica de tela sem depender da interface
- Redesenhar a UI sem quebrar regras de negócio
- Design e backend evoluem em paralelo
- Código mais reutilizável e manutenção mais simples

## Onde usar

O padrão serve para mobile, web com estado complexo e desktop:

- **Mobile:** Swift, Kotlin, React Native, Flutter
- **Web:** Vue, React, Angular
- **Desktop:** WPF, .NET MAUI, SwiftUI

## Meu projeto precisa?

Considere MVVM quando:

- Várias telas compartilham lógica e estado
- Você quer testar lógica sem depender da UI
- Design e backend evoluem em ritmos diferentes
- O app tende a crescer, e a equipe também

Telas simples e estáticas podem dispensar o padrão.

## Resumo

**Model** = dados e regras. **View** = o que o usuário vê. **ViewModel** = ponte e estado da tela. Separação clara, testes e manutenção mais fáceis.`,
  },
  {
    id: "static-auth0-em-apps-sso-mfa-tokens",
    slug: "auth0-em-apps-sso-mfa-tokens",
    title: "Auth0 explicado: autenticação moderna sem montar tudo do zero",
    excerpt: "O que é o Auth0, como o fluxo de login funciona, os três tokens essenciais e quando vale a pena usar uma plataforma de identidade.",
    cover_image_url: null,
    created_at: "2026-01-20T12:00:00.000Z",
    body_markdown: `Autenticação moderna, simplificada. Este é um resumo do que o Auth0 resolve e de quando faz sentido usá-lo.

## O desafio da autenticação

Implementar login seguro do zero é complexo:

- Armazenar senhas com segurança (*hashing*, *salting*)
- Gerenciar tokens e sessões
- Implementar OAuth 2.0 / OIDC
- Lidar com MFA e recuperação de conta
- Manter compliance com LGPD/GDPR

## Auth0: Identity as a Service

É uma plataforma completa de identidade que cuida da complexidade da autenticação para você:

- **Autenticação:** login pronto para usar com diversos providers
- **Autorização:** controle granular de permissões e *roles*
- **APIs robustas:** REST APIs completas e documentadas
- **SDKs:** bibliotecas para todas as plataformas

## Principais features

| Feature | Benefício |
|---|---|
| **Universal Login** | Tela de login pronta e customizável |
| **Social Login** | Google, Apple e Facebook em 1 clique |
| **MFA** | Autenticação em 2 fatores nativa |
| **SSO** | Single Sign-On entre aplicações |
| **JWT Tokens** | Access + ID tokens seguros |

## Como funciona

1. O usuário clica em "Entrar" no seu app.
2. O app redireciona para o Auth0.
3. O usuário faz login (e-mail, social etc.).
4. O Auth0 valida e retorna os tokens.
5. O app recebe os tokens e autentica o usuário.

## Os 3 tokens essenciais

- **Access Token:** autorização para acessar APIs protegidas. Curta duração.
- **ID Token:** informações do usuário em formato JWT (nome, e-mail etc.).
- **Refresh Token:** permite renovar tokens expirados sem novo login.

> No servidor, valide sempre a assinatura, o \`issuer\` e o \`audience\` do token antes de confiar nele.

## SDKs para qualquer plataforma

React Native, React / Next.js, Swift (iOS), Kotlin (Android), Node.js, Python, Java / Spring, Ruby, Go e Rust.

## Quando usar o Auth0

Ele é ideal para:

- Apps que precisam de login seguro rapidamente
- Startups que querem focar no produto, não em infra
- Times sem especialista em segurança
- Projetos que precisam escalar
- Apps com múltiplos providers de login

O plano gratuito cobre até 7.000 usuários (conforme o post original; confira os limites atuais no site) e o setup leva minutos. Para começar: **auth0.com**.`,
  },
  {
    id: "static-atualizacoes-ota-sem-passar-pela-loja",
    slug: "atualizacoes-ota-sem-passar-pela-loja",
    title: "React Native Stallion: atualize seu app sem passar pela App Store ou Play Store",
    excerpt: "O que é OTA, o que dá (e o que não dá) para atualizar, por que o fim do CodePush abriu espaço e como o Stallion entrega patches, rollout gradual e rollback automático.",
    cover_image_url: null,
    created_at: "2026-07-14T12:00:00.000Z",
    body_markdown: `O **React Native Stallion** é uma alternativa moderna ao CodePush para atualizar apps React Native sem passar pela revisão das lojas.

## O problema

Publicar uma correção demora **dias**:

- **Revisão da store.** Apple e Google levam de 1 a 3 dias para aprovar qualquer atualização.
- **CodePush encerrado.** A Microsoft descontinuou o serviço em março de 2025; quem usa está sem suporte.
- **Bundle pesado.** O OTA tradicional reenvia o arquivo inteiro a cada atualização.

## O que é OTA

OTA (*over-the-air*) atualiza o código **JavaScript** do seu app.

**O que pode ser atualizado:** telas, lógica de negócio, textos, estilos, navegação, APIs.

**O que não pode:** código nativo (Java/Kotlin/Swift), permissões, ícone do app, dependências com *bridge* nativa.

> Se precisa de \`pod install\` ou Gradle sync, precisa de novo build na store.

## O que é o Stallion

Uma plataforma de OTA para React Native.

| Recurso | O que faz |
|---|---|
| **Patch diff** | Envia só o que mudou, até 98% menor que o bundle completo |
| **Auto rollback** | Detecta crash nativo e reverte automaticamente para o bundle anterior |
| **Rollout faseado** | Libera para 5%, 50% e 100% dos usuários gradualmente |
| **Analytics** | Acompanha adoção, downloads e rollbacks em tempo real |

## Como funciona: do código ao usuário em minutos

1. Instale o SDK no projeto React Native.
2. Publique o bundle via CLI:

\`\`\`bash
npx stallion publish-bundle
\`\`\`

3. Teste internamente com o modal do SDK antes de liberar.
4. Promova para produção no console, com rollout gradual.
5. O usuário recebe a atualização em background, sem passar pela store.

## Stallion vs CodePush

O CodePush foi encerrado. E agora?

| | CodePush | Stallion |
|---|---|---|
| Status | Encerrado | Ativo |
| Update | Bundle completo | Patch diff |
| Tamanho | 100% | até −98% |
| Rollback | Manual | Automático |
| Analytics | Limitado | Completo |
| Free tier | Encerrado | Grátis até 10 mil usuários/mês |

A API é compatível com a do CodePush e a migração está documentada.

## Vale para você?

Faz sentido se o seu time precisa de agilidade:

- **Hotfixes urgentes.** Correção de JS em produção sem esperar a revisão da store.
- **Migração do CodePush.** API compatível, migração documentada no site deles.
- **Segurança de rollout.** Rollback automático em caso de crash, mais rollout gradual por porcentagem.

Grátis até 10 mil usuários ativos por mês. Mais em **stalliontech.io**.

## Em resumo

OTA é uma ferramenta de **resposta rápida**: com patches pequenos, rollout gradual e rollback automático, "esperar a loja" vira "corrigir em minutos". O limite continua sendo o código nativo, que ainda exige uma versão nova na loja.`,
  },
  {
    id: "static-cobrancas-em-apps-com-stripe",
    slug: "cobrancas-em-apps-com-stripe",
    title: "Stripe explicado: o que é, quando usar e como integrar",
    excerpt: "Um guia prático para entender se o Stripe faz sentido no seu projeto: o fluxo com Checkout Session e webhook, quando usar e as alternativas no Brasil.",
    cover_image_url: null,
    created_at: "2026-04-08T12:00:00.000Z",
    body_markdown: `Um guia prático para você entender se o Stripe faz sentido para o seu projeto. Sem enrolação.

## O que é

O Stripe é uma **API de pagamentos**. Você não precisa montar um sistema de cobrança do zero. Ele cuida de:

- **Processar pagamentos:** cartão, boleto, Pix
- **Gerenciar assinaturas:** cobranças recorrentes, upgrades, cancelamentos
- **Detectar fraude:** com machine learning, automático
- **Cuidar do compliance:** PCI, 3D Secure, tudo por baixo dos panos

Resumindo: você foca no seu produto, o Stripe foca no dinheiro entrar.

## Como funciona

O fluxo é simples:

1. **Você cria uma Checkout Session.** Uma chamada na API com o que vai cobrar e o valor.
2. **O cliente é redirecionado** para o formulário do Stripe. Seguro, pronto, responsivo.
3. **Ele paga.** Cartão, Pix, boleto. O Stripe aceita e processa.
4. **Você recebe um webhook.** O Stripe avisa no seu backend que o pagamento foi confirmado.

Sem armazenar cartão. Sem lidar com PCI. Sem inventar roda.

## Na prática: criar uma cobrança

\`\`\`ts
const session = await stripe.checkout.sessions.create({
  line_items: [{
    price: 'price_abc123',
    quantity: 1,
  }],
  mode: 'payment',
  success_url: 'https://seuapp.com/ok',
  cancel_url: 'https://seuapp.com/cancelou',
})

// redireciona o cliente pra session.url
\`\`\`

O \`price\` você cria no dashboard do Stripe ou via API. Pode ser valor fixo ou recorrente.

## Webhooks: como saber que o pagamento caiu

O Stripe manda um evento para o seu servidor. Você só precisa ouvir:

\`\`\`ts
app.post('/webhook', (req, res) => {
  const event = stripe.webhooks
    .constructEvent(req.body, sig, secret)

  if (event.type === 'checkout.session.completed') {
    // libera acesso, envia email, etc
    fulfillOrder(event.data.object)
  }

  res.json({ received: true })
})
\`\`\`

Nada de polling ou cron job. Pagou? O evento chega. Você trata.

> Dois cuidados: a verificação da assinatura (\`constructEvent\`) precisa do **corpo bruto** da requisição, não do JSON já interpretado; e o preço deve ser definido no servidor, nunca vir do app.

## Quando usar

Faz sentido quando você precisa de:

- Assinaturas com planos, trial, upgrade e downgrade
- Checkout pronto, sem montar formulário de cartão
- Marketplace onde você repassa pagamento para terceiros
- API robusta que escala junto com seu produto
- Dashboard para acompanhar receita, churn e métricas

Se o seu app cobra alguém de forma recorrente, o Stripe provavelmente é uma boa escolha.

## Quando não usar

Talvez você não precise do Stripe se:

- **Só precisa de Pix e boleto.** Mercado Pago ou Asaas resolvem com menos setup.
- **Vende infoproduto.** Hotmart, Kiwify e similares já entregam tudo pronto.
- **Não tem cobrança recorrente.** Para venda pontual e simples, o Stripe pode ser *over-engineering*.

## Alternativas no Brasil

| Opção | Destaque |
|---|---|
| **Mercado Pago** | Pix, boleto e cartão. SDK simples, forte no Brasil |
| **Asaas** | Cobranças recorrentes + nota fiscal automática |
| **Pagarme** | Gateway completo com bom suporte local |
| **Abacatepay** | Focado em Pix, leve e feito para dev |

Não é sobre qual é melhor. É sobre qual resolve o seu problema com menos atrito. Cada projeto tem um contexto: escolha o que encaixa no seu.`,
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
