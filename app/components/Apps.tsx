import { ExternalLink, Smartphone } from "lucide-react"

type App = {
  name: string
  tagline: string
  stack: string[]
  highlights: string[]
  /** Public store listing for the shipped app. */
  storeUrl?: {
    href: string
    label: string
  }
}

export default function Apps() {
  const apps: App[] = [
    {
      name: "Tabula: Philosophical Wisdom",
      tagline: "AI-Powered Self-Reflection Mobile App",
      storeUrl: {
        href: "https://apps.apple.com/us/app/tabula-philosophical-wisdom/id6751429391",
        label: "Download on the App Store",
      },
      stack: [
        "React Native (Expo)",
        "TypeScript",
        "AWS Lambda",
        "API Gateway",
        "DynamoDB",
        "Cognito",
        "IAM",
        "CloudWatch",
        "OpenAI",
      ],
      highlights: [
        "Built a serverless backend of 25+ Node.js Lambda functions behind a 27-endpoint API Gateway REST API, covering auth, journaling, quizzes, relationship tracking, AI chat, and subscriptions.",
        "Implemented Cognito authentication (sign-up, email verification, token refresh, account deletion), with routes protected by an API Gateway Cognito authorizer and a shared JWT-validation helper.",
        "Designed a single-table DynamoDB model with composite PK/SK keys (USER#, QUIZ#, CONNECTION#) so each screen loads with one begins_with query, using conditional writes for concurrency safety and TTL for automatic expiry.",
        "Integrated OpenAI GPT-4 / GPT-3.5 through Lambda for philosopher chat, daily guidance, and journal prompts, keeping API keys server-side and enforcing per-user daily limits in DynamoDB to control AI cost across free and premium plans.",
        "Built subscription billing with Lambda-verified Apple StoreKit receipts and an App Store notification webhook (renewals, expirations, refunds, grace periods) that keeps entitlements current in DynamoDB, plus a Stripe webhook for web payments.",
        "Scoped each Lambda role with least-privilege IAM policies to specific DynamoDB tables and indexes, Cognito actions, and CloudWatch Logs, with CloudWatch used for production monitoring and debugging.",
        "Automated deployments with AWS SDK scripts that package and update many Lambda functions in one run, replacing manual console uploads.",
        "Shipped a cross-platform React Native (Expo) app in TypeScript with a typed API client, persistent sessions, automatic token refresh, and feature flags for gradual rollouts.",
      ],
    },
  ]

  return (
    <section id="apps" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        <h2 className="animate-fade-up text-3xl sm:text-4xl font-bold mb-12 text-center text-foreground">Apps</h2>
        <div className="space-y-12">
          {apps.map((app, index) => (
            <div
              key={app.name}
              className="animate-fade-up bg-card text-card-foreground border border-border p-5 sm:p-6 rounded-lg shadow-md"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="w-fit shrink-0 rounded-full bg-primary/20 p-3">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold">{app.name}</h3>
                  <p className="text-primary font-medium">{app.tagline}</p>
                  {app.storeUrl && (
                    <a
                      href={app.storeUrl.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    >
                      {app.storeUrl.label}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack">
                    {app.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-4 space-y-2">
                    {app.highlights.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
