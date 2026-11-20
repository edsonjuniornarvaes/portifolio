# Skills de design (branch redesign/skills)

| Skill | Origem | Licença |
|---|---|---|
| `emil-design-eng`, `animate`, `review-animations`, `break-ui`, `mobile-native` e as demais | https://github.com/emilkowalski/skill | MIT |
| `impeccable` (`/impeccable critique`, `polish`, `typeset`, `audit`…) | https://github.com/pbakaus/impeccable | Apache 2.0 |

A skill **taste** (`design-taste-frontend`, https://github.com/Leonxlnx/taste-skill, MIT) pesa ~40 MB e roda um verificador a cada resposta:
**não está no git**. Para usar, instale localmente sem versionar:
`git clone --depth 1 https://github.com/Leonxlnx/taste-skill /tmp/taste && cp -r /tmp/taste/skills/taste-skill .claude/skills/design-taste-frontend && echo ".claude/skills/design-taste-frontend/" >> .git/info/exclude`

Comando de uso: `/site-pro <o que melhorar>` (ver `.claude/commands/site-pro.md`).
As skills só carregam ao reiniciar a sessão.
