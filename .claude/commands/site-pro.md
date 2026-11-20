---
description: Melhora um site que já está pronto usando as skills de design (taste, impeccable, emil) + Figma + teste no navegador, com backup e sem quebrar o que funciona
argument-hint: "[o que melhorar, ex.: home | página de produto | cabeçalho | mobile]"
---

Tarefa: $ARGUMENTS

Este site **já está pronto e no ar**. O objetivo é melhorar a camada visual e a qualidade, sem quebrar o que funciona.

0. **Backup primeiro.** Confirme que existe a branch `backup/pre-redesign` (cópia exata da `main` de antes). Trabalhe SÓ na branch `redesign/skills`. Nunca faça commit direto na `main`, nem merge sem o dono mandar.
1. **Contexto.** Leia `CLAUDE.md` e o `README.md` se existirem. Respeite as decisões já registradas ali.
2. **Diagnóstico: `/impeccable critique`** na tela pedida: nota e lista de problemas por prioridade. Mostre antes de mudar.
3. **Estrutura e regras: skill `design-taste-frontend`** (se instalada localmente): tipografia, grade, hierarquia, foto real em destaque, um só estilo de botão, sem gradiente à toa, nada com cara de template.
4. **Acabamento: `/impeccable polish` e `/impeccable typeset`.** Corrija tudo que for prioridade alta.
5. **Interação: `/emil-design-eng`, `/animate`, `/mobile-native`.** Só movimento com função; respeitar "reduzir movimento".
6. **Figma (se conectado na conta dev.edsonjr@gmail.com):** desenhe a mudança antes de codar; implemente com `get_design_context`.
7. **Teste no navegador (Playwright MCP):** suba o servidor local e confira 1440, 768 e 390: seções, links, formulários, nada quebrado. Compare com o site atual.
8. **Entrega:** `build` e testes passando. Commits pequenos (conventional commits, em inglês) na branch `redesign/skills`. Envie o link do preview da Vercel dessa branch.

Regras fixas:
- **Só camada visual** (layout, tipografia, espaçamento, componentes, movimento). Não mexer em pagamento, Supabase, migrations, painel admin, rotas de API nem variáveis de ambiente.
- Se a mudança não ficou melhor que o original, diga e reverta.
- Como voltar atrás: Vercel → Deployments → deploy anterior → Promote to Production; ou não fazer o merge; em último caso a branch `backup/pre-redesign`.
