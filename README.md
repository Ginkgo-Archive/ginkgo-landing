# Ginkgo AI Systems — Landing

Landing institucional e comercial da **Ginkgo AI Systems**, focada em automações n8n sob medida, agentes de IA, Skills, integrações e infraestrutura operacional.

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Express apenas para servir o build estático em ambientes Node

## Execução local

Requisitos: Node.js 22+ e pnpm 10+.

```bash
pnpm install
pnpm dev
```

## Validação e build

```bash
pnpm check
pnpm build
pnpm start
```

O build do frontend é gerado em `dist/public`.

## Configuração comercial

Copie `.env.example` para `.env` e preencha os dados disponíveis. Nenhum contato, preço ou link de pagamento é inventado no código.

Variáveis principais:

- `VITE_WHATSAPP_NUMBER`
- `VITE_CONTACT_EMAIL`
- `VITE_LINKEDIN_URL`
- `VITE_INSTAGRAM_URL`
- `VITE_GITHUB_URL`
- `VITE_X_URL`
- `VITE_STRIPE_PROJECT_MEETING_URL`
- `VITE_PROJECT_MEETING_PRICE`
- `VITE_SETUP_PRICE`
- `VITE_MONTHLY_MAINTENANCE_PRICE`
- `VITE_CONFIGURATOR_WEBHOOK_URL`

## Assets oficiais

Os assets usados pela landing ficam em `client/public/brand/`:

- `ginkgo-tree-gold.png` — marca principal
- `ginkgo-tree-blue.png` — variante técnica
- `ginkgo-leaf-gold.png` — elemento secundário

A aplicação é autossuficiente e não depende de URLs privadas do ambiente Manus.

## Estrutura principal

- `client/src/pages/Home.tsx` — landing e experiências interativas
- `client/src/config/site.ts` — configuração comercial central
- `client/src/index.css` — tokens, tipografia e motion
- `client/public/brand/` — assets oficiais
- `server/index.ts` — servidor estático opcional para produção Node

## Pendências antes de publicação comercial

1. preencher WhatsApp/e-mail/redes sociais;
2. conectar o link Stripe da reunião de projeto;
3. definir valor simbólico da reunião;
4. definir preços/limites do plano de manutenção, se desejado;
5. conectar o configurador a n8n/webhook quando a captação automatizada for ativada.
