/** Traduções (EN) dos artigos que vivem no código, indexadas pelo slug. */
export const STATIC_POSTS_EN: Record<string, { title: string; excerpt: string; body_markdown: string }> = {
  "mvvm-na-pratica-react-native": {
    title: "MVVM explained: what it is, when to use it and how to apply it in React Native",
    excerpt:
      "Model, View and ViewModel: each layer's responsibility, why separate the interface from business logic and when the pattern is not worth it.",
    body_markdown: `**MVVM** (Model-View-ViewModel) is a pattern that separates the interface from business logic.

## The organization challenge

When UI code and business rules are mixed together, the same problems show up:

- Hard to test and maintain
- Coupling between screen and logic
- Rework when the interface changes
- Code duplication across screens

## The three components

Each one with a clear responsibility:

| Layer | Responsibility |
|---|---|
| **View** | Displays data and captures user interactions |
| **ViewModel** | Prepares data and commands for the screen |
| **Model** | Domain data and business rules |

The flow is View ↔ ViewModel ↔ Model. The Model does not know the View.

### Model

The data and business rules layer.

- Data structures and domain entities
- Validations, calculations and business rules
- Does not know the View or the ViewModel

### View

The user interface: what they see and touch.

- Screens and components (React Native, Flutter, Swift/Kotlin etc.)
- Displays data exposed by the ViewModel
- No business logic, only presentation and events

### ViewModel

The bridge between View and Model: screen state and logic.

- Transforms Model data for the View
- Exposes properties and commands (*binding*)
- Presentation logic, independent of the UI

## What it looks like in React Native

Each screen becomes a small folder, with one file per role:

\`\`\`text
features/cart/
  index.tsx        // View: only renders
  viewModel.ts     // ViewModel: state and handlers
  models.ts        // Model: types and rules
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

The View does not know how the total is calculated. The ViewModel can be tested without rendering anything.

## Why use MVVM

- Test screen logic without depending on the interface
- Redesign the UI without breaking business rules
- Design and backend evolve in parallel
- More reusable code and simpler maintenance

## Where to use it

The pattern fits mobile, web with complex state and desktop:

- **Mobile:** Swift, Kotlin, React Native, Flutter
- **Web:** Vue, React, Angular
- **Desktop:** WPF, .NET MAUI, SwiftUI

## Does my project need it?

Consider MVVM when:

- Several screens share logic and state
- You want to test logic without depending on the UI
- Design and backend evolve at different paces
- The app is likely to grow, and so is the team

Simple, static screens can do without the pattern.

## Summary

**Model** = data and rules. **View** = what the user sees. **ViewModel** = bridge and screen state. Clear separation, easier testing and maintenance.`,
  },
  "auth0-em-apps-sso-mfa-tokens": {
    title: "Auth0 explained: modern authentication without building everything from scratch",
    excerpt: "What Auth0 is, how the login flow works, the three essential tokens and when an identity platform is worth it.",
    body_markdown: `Modern authentication, simplified. This is a summary of what Auth0 solves and when it makes sense to use it.

## The authentication challenge

Implementing secure login from scratch is complex:

- Storing passwords securely (*hashing*, *salting*)
- Managing tokens and sessions
- Implementing OAuth 2.0 / OIDC
- Handling MFA and account recovery
- Staying compliant with LGPD/GDPR

## Auth0: Identity as a Service

A complete identity platform that handles the complexity of authentication for you:

- **Authentication:** ready-to-use login with several providers
- **Authorization:** granular control of permissions and *roles*
- **Robust APIs:** complete, documented REST APIs
- **SDKs:** libraries for every platform

## Main features

| Feature | Benefit |
|---|---|
| **Universal Login** | Ready-made, customizable login screen |
| **Social Login** | Google, Apple and Facebook in 1 click |
| **MFA** | Native two-factor authentication |
| **SSO** | Single Sign-On across applications |
| **JWT Tokens** | Secure Access + ID tokens |

## How it works

1. The user taps "Sign in" in your app.
2. The app redirects to Auth0.
3. The user logs in (email, social etc.).
4. Auth0 validates and returns the tokens.
5. The app receives the tokens and authenticates the user.

## The 3 essential tokens

- **Access Token:** authorization to call protected APIs. Short-lived.
- **ID Token:** user information in JWT format (name, email etc.).
- **Refresh Token:** lets you renew expired tokens without a new login.

> On the server, always validate the token's signature, \`issuer\` and \`audience\` before trusting it.

## SDKs for any platform

React Native, React / Next.js, Swift (iOS), Kotlin (Android), Node.js, Python, Java / Spring, Ruby, Go and Rust.

## When to use Auth0

It is ideal for:

- Apps that need secure login quickly
- Startups that want to focus on the product, not on infrastructure
- Teams without a security specialist
- Projects that need to scale
- Apps with multiple login providers

The free plan covers up to 7,000 users (as in the original post; check the current limits on the website) and setup takes minutes. To get started: **auth0.com**.`,
  },
  "atualizacoes-ota-sem-passar-pela-loja": {
    title: "React Native Stallion: update your app without going through the App Store or Play Store",
    excerpt:
      "What OTA is, what you can (and can't) update, why the end of CodePush opened a gap and how Stallion delivers patches, gradual rollout and automatic rollback.",
    body_markdown: `**React Native Stallion** is a modern alternative to CodePush for updating React Native apps without going through store review.

## The problem

Shipping a fix takes **days**:

- **Store review.** Apple and Google take 1 to 3 days to approve any update.
- **CodePush shut down.** Microsoft discontinued the service in March 2025; anyone still using it is without support.
- **Heavy bundles.** Traditional OTA resends the entire file on every update.

## What OTA is

OTA (*over-the-air*) updates your app's **JavaScript** code.

**What can be updated:** screens, business logic, texts, styles, navigation, APIs.

**What can't:** native code (Java/Kotlin/Swift), permissions, the app icon, dependencies with a native bridge.

> If you need \`pod install\` or a Gradle sync, you need a new build on the store.

## What Stallion is

An OTA platform for React Native.

| Feature | What it does |
|---|---|
| **Patch diff** | Sends only what changed, up to 98% smaller than the full bundle |
| **Auto rollback** | Detects a native crash and automatically reverts to the previous bundle |
| **Phased rollout** | Releases to 5%, 50% and 100% of users gradually |
| **Analytics** | Tracks adoption, downloads and rollbacks in real time |

## How it works: from code to user in minutes

1. Install the SDK in your React Native project.
2. Publish the bundle via CLI:

\`\`\`bash
npx stallion publish-bundle
\`\`\`

3. Test internally with the SDK modal before releasing.
4. Promote to production in the console, with gradual rollout.
5. Users receive the update in the background, without going through the store.

## Stallion vs CodePush

CodePush was shut down. Now what?

| | CodePush | Stallion |
|---|---|---|
| Status | Shut down | Active |
| Update | Full bundle | Patch diff |
| Size | 100% | up to −98% |
| Rollback | Manual | Automatic |
| Analytics | Limited | Complete |
| Free tier | Shut down | Free up to 10k users/month |

The API is compatible with CodePush's and the migration is documented.

## Is it for you?

It makes sense if your team needs agility:

- **Urgent hotfixes.** Fix JS in production without waiting for store review.
- **Migrating from CodePush.** Compatible API, migration documented on their website.
- **Rollout safety.** Automatic rollback on crash, plus gradual rollout by percentage.

Free up to 10 thousand monthly active users. More at **stalliontech.io**.

## In short

OTA is a **fast-response** tool: with small patches, gradual rollout and automatic rollback, "waiting for the store" becomes "fixing in minutes". The limit remains native code, which still requires a new store release.`,
  },
  "cobrancas-em-apps-com-stripe": {
    title: "Stripe explained: what it is, when to use it and how to integrate",
    excerpt:
      "A practical guide to know if Stripe makes sense for your project: the Checkout Session and webhook flow, when to use it and the alternatives in Brazil.",
    body_markdown: `A practical guide to understand whether Stripe makes sense for your project. No fluff.

## What it is

Stripe is a **payments API**. You don't need to build a billing system from scratch. It takes care of:

- **Processing payments:** card, boleto, Pix
- **Managing subscriptions:** recurring charges, upgrades, cancellations
- **Detecting fraud:** with machine learning, automatically
- **Handling compliance:** PCI, 3D Secure, all under the hood

In short: you focus on your product, Stripe focuses on getting the money in.

## How it works

The flow is simple:

1. **You create a Checkout Session.** One API call with what you're charging and the amount.
2. **The customer is redirected** to Stripe's form. Secure, ready, responsive.
3. **They pay.** Card, Pix, boleto. Stripe accepts and processes it.
4. **You receive a webhook.** Stripe tells your backend that the payment was confirmed.

No storing cards. No dealing with PCI. No reinventing the wheel.

## In practice: creating a charge

\`\`\`ts
const session = await stripe.checkout.sessions.create({
  line_items: [{
    price: 'price_abc123',
    quantity: 1,
  }],
  mode: 'payment',
  success_url: 'https://yourapp.com/ok',
  cancel_url: 'https://yourapp.com/canceled',
})

// redirect the customer to session.url
\`\`\`

You create the \`price\` in the Stripe dashboard or via API. It can be a fixed or a recurring amount.

## Webhooks: how to know the payment went through

Stripe sends an event to your server. You just need to listen:

\`\`\`ts
app.post('/webhook', (req, res) => {
  const event = stripe.webhooks
    .constructEvent(req.body, sig, secret)

  if (event.type === 'checkout.session.completed') {
    // grant access, send email, etc
    fulfillOrder(event.data.object)
  }

  res.json({ received: true })
})
\`\`\`

No polling or cron jobs. Paid? The event arrives. You handle it.

> Two cautions: signature verification (\`constructEvent\`) needs the request's **raw body**, not the already-parsed JSON; and the price must be set on the server, never come from the app.

## When to use it

It makes sense when you need:

- Subscriptions with plans, trials, upgrades and downgrades
- A ready-made checkout without building a card form
- A marketplace where you pass payments on to third parties
- A robust API that scales with your product
- A dashboard to track revenue, churn and metrics

If your app charges someone on a recurring basis, Stripe is probably a good choice.

## When not to use it

You may not need Stripe if:

- **You only need Pix and boleto.** Mercado Pago or Asaas solve it with less setup.
- **You sell info-products.** Hotmart, Kiwify and similar already deliver everything ready.
- **You have no recurring billing.** For a simple one-off sale, Stripe can be over-engineering.

## Alternatives in Brazil

| Option | Highlight |
|---|---|
| **Mercado Pago** | Pix, boleto and card. Simple SDK, strong in Brazil |
| **Asaas** | Recurring billing + automatic invoicing |
| **Pagarme** | Complete gateway with good local support |
| **Abacatepay** | Pix-focused, lightweight and built for devs |

It's not about which is better. It's about which solves your problem with less friction. Every project has a context: pick the one that fits yours.`,
  },
  "gastar-menos-tokens-com-agentes-de-ia": {
    title: "Cut your AI agent's cost: 5 tactics to stop burning tokens",
    excerpt:
      "Filtering terminal output with RTK, minding the 5-minute cache, using /compact and /clear, adopting Pony Tail and choosing the right model.",
    body_markdown: `You use AI to code every day, but do you know what you're really paying for? Here are five tactics to stop burning tokens.

## The problem: the model reads everything, and you pay

A command like \`git diff\` or \`npm test\` spits out thousands of lines of logs. The agent processes all that junk and charges for every character:

\`\`\`text
Raw terminal output (e.g. 5,000 tokens)
> error: undefined method 'map'...
> at line 42... (2000 lines of stacktrace omitted)
\`\`\`

## 1. RTK: the surgical filter

The **Rust Token Killer** intercepts your commands and cleans the output before the text reaches the agent.

\`\`\`bash
# Without RTK (default): ~4,200 tokens sent to the model
git diff

# With RTK: ~450 tokens sent to the model
rtk git diff
\`\`\`

## 2. Watch out for the coffee break

Claude's cache expires after **5 minutes** of inactivity. If you take a while to reply, the next message forces the model to rewrite the **entire history** of the conversation.

> Long session + 5-minute pause generates a massive \`cache_write\` of everything accumulated. Your cost explodes when you come back.

## 3. Compact before you pause

In Claude Code, don't let the session expire with a full cache:

- **About to pause?** Run \`/compact\`. It compresses the history and reduces the volume of tokens that will be rewritten when you return.
- **Switched tasks?** Run \`/clear\`. Short, focused sessions always cost less than a long, fragmented one.

## 4. Productive laziness: Pony Tail

A plugin that teaches the agent "productive laziness": it forces the model to think before spitting out new code.

1. **Reuses what already exists.** Avoids recreating functions already in the project.
2. **Prefers native resources.** Uses the stdlib before installing new dependencies.

**Warning:** use the *lite* or *full* modes. The *ultra* mode can compress too much and remove essential error handling.

## 5. Pick the right model

Smart architecture beats brute force. Smaller models cost a fraction of a cent and solve most daily tasks.

- **Fast models** (like Haiku or 4o-mini): extracting data, validating JSON, formatting logs.
- **Heavy models** (like the Sonnet line): only for refactoring and complex architecture.

## In short

Filter what goes into the context, don't let the cache expire full, compact or clear the session, make the agent reuse what exists and use the right model for each task.`,
  },
};
