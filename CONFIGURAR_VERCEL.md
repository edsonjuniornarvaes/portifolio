# 🚀 Configurar Variáveis de Ambiente no Vercel (Produção)

## ⚠️ Por que isso é necessário?

O arquivo `.env` funciona apenas **localmente**. Em produção no Vercel, você precisa configurar as variáveis de ambiente no painel do Vercel.

## ✅ Passo a Passo

### 1. Acesse o Painel do Vercel

1. Acesse: https://vercel.com/dashboard
2. Faça login na sua conta
3. Selecione o projeto **portifolio**

### 2. Configure as Variáveis de Ambiente

1. No projeto, vá em **Settings** (⚙️)
2. No menu lateral, clique em **Environment Variables**
3. Adicione as seguintes variáveis:

#### Variável 1:

- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://uqcvfbsavwglmcrnmmpc.supabase.co`
- **Environments:** Marque todas (Production, Preview, Development)

#### Variável 2:

- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxY3ZmYnNhdndnbG1jcm5tbXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MzQyMDEsImV4cCI6MjA4NTAxMDIwMX0._8I5f1tGbBl8sAxg77zcj_RY0UIwox1F1_XMdcXX1P4`
- **Environments:** Marque todas (Production, Preview, Development)

#### Variável 3:

- **Name:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxY3ZmYnNhdndnbG1jcm5tbXBjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTQzNDIwMSwiZXhwIjoyMDg1MDEwMjAxfQ.gsPAowRo1gtKj81xAHol4xCQmis9YJcsXHTMryUpCC0`
- **Environments:** Marque todas (Production, Preview, Development)

### 3. Salvar e Fazer Redeploy

1. Clique em **Save** para cada variável
2. Vá na aba **Deployments**
3. Clique nos **3 pontinhos** (⋯) do último deployment
4. Selecione **Redeploy**
5. Aguarde o deploy terminar

### 4. Verificar

Após o redeploy, acesse:

```
https://portifolio-wheat-omega-16.vercel.app/adminaccess/dashboard
```

O erro deve desaparecer e o dashboard deve funcionar normalmente.

## 📝 Notas Importantes

- ⚠️ A `SUPABASE_SERVICE_ROLE_KEY` é sensível - não compartilhe publicamente
- ✅ As variáveis com `NEXT_PUBLIC_` são expostas ao cliente (necessário para o rastreamento)
- ✅ A `SUPABASE_SERVICE_ROLE_KEY` é apenas server-side (segura)
- 🔄 Após adicionar variáveis, é necessário fazer um **redeploy** para que tenham efeito

## 🐛 Se Ainda Não Funcionar

1. Verifique se todas as 3 variáveis foram adicionadas
2. Verifique se marcou todos os ambientes (Production, Preview, Development)
3. Verifique se fez o redeploy após adicionar as variáveis
4. Verifique os logs do deployment no Vercel para erros
