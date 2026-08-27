const env = import.meta.env;

export const siteConfig = {
  brand: "Ginkgo AI Systems",
  tagline: "Infraestrutura de inteligência operacional.",
  whatsappNumber: env.VITE_WHATSAPP_NUMBER ?? "",
  contactEmail: env.VITE_CONTACT_EMAIL ?? "",
  linkedin: env.VITE_LINKEDIN_URL ?? "",
  instagram: env.VITE_INSTAGRAM_URL ?? "",
  github: env.VITE_GITHUB_URL ?? "https://github.com/ginkgoai/ginkgo-landing",
  twitter: env.VITE_X_URL ?? "",
  stripeProjectMeetingUrl: env.VITE_STRIPE_PROJECT_MEETING_URL ?? "",
  projectMeetingPrice: env.VITE_PROJECT_MEETING_PRICE ?? "Valor simbólico",
  setupPrice: env.VITE_SETUP_PRICE ?? "Sob consulta",
  monthlyMaintenancePrice: env.VITE_MONTHLY_MAINTENANCE_PRICE ?? "Sob consulta",
  includedUsageLimits: env.VITE_INCLUDED_USAGE_LIMITS ?? "Definidos conforme escopo",
  configuratorWebhookUrl: env.VITE_CONFIGURATOR_WEBHOOK_URL ?? "",
} as const;

export const primaryCtas = {
  map: "#configurador",
  whatsapp: "#contato",
  meeting: "#reuniao",
} as const;
