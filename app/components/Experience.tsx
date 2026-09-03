import { Briefcase } from "lucide-react"

export default function Experience() {
  const experiences = [
        {
      position: "Software Engineer (AIML) Intern",
      company: "Mayuri International Foods",
      location: "Seattle, Washington",
      period: "feb 2026 – June 2026",
      responsibilities: [
        "Architected a concept-based catalog search engine in Python, replacing a Postgres ts_rank/trigram SQL ranker with an intent model that resolves transliterated spelling variants (arhar/toor/tur/tuvar) to canonical concepts and maps each to a product kind and store department, scored by a 13-feature additive ranking function over an in-memory index of 4,000+ SKUs  raising Precision@1 from 0.61 to 1.00 and NDCG@5 from 0.63 to 1.00 on a 38-query graded benchmark while cutting query latency from ~70 ms to under 1 ms.",
        "Built the LLM-powered store assistant on the OpenAI API (GPT-4.1-nano) using strict JSON-schema function calling over three tools, streamed to the client as Server-Sent Events from FastAPI with Redis-backed sessions and tiktoken token-budget trimming grounding every answer in retrieved catalog rows and eliminating hallucinated aisle directions by emitting floor-plan links from system-held zone codes withheld from the model.",
        "Engineered the guardrail and evaluation layer, combining Unicode sanitization, Luhn-validated PII redaction, OpenAI moderation executed concurrently on a thread pool behind LLM latency, and a model-invoked decline tool for off-topic and prompt-probing input, alongside a 38-query graded relevance harness with CI-enforced metric floors and 22 pytest cases  making relevance regressions blocking rather than anecdotal, at zero added user-facing latency.",
        "Integrated and deployed the end-to-end system FastAPI backend, Next.js/React frontend, Neon Postgres, Redis, and Cloudflare R2 with concurrent dependency and index warmup at startup that removed multi-second cold-start latency, off-request-path analytics writes, and an environment-flag rollback to the legacy ranker requiring no redeploy; containerized with Docker and shipped to Railway and Vercel.",
      ],
    },
    {
      position: "Data Engineer Intern",
      company: "Reinvision Labs Pvt. Ltd.",
      location: "Telangana, India",
      period: "May 2024 – Aug 2024",
      responsibilities: [
        "Extracted ERP data (Customers, AR, GL) from Oracle EBS using SQL queries based on company-defined criteria, optimizing query performance, resulting in 99% data accuracy during migration.",
        "Preprocessed and formatted extracted data into FBDI format by automating scripts for date adjustments, reducing manual effort by 30% and ensuring data readiness.",
        "Troubleshot and resolved data import errors by analyzing error logs and collaborating with technical teams, cutting resolution time by 40% and ensuring smooth migration.",
      ],
    },
    {
      position: "Machine Learning Research Intern",
      company: "Research Centre Imarat (RCI), Defense Research and Development Organization (DRDO)",
      location: "Telangana, India",
      period: "June 2023 – Aug 2023",
      responsibilities: [
        "Integrated advanced YAMnet into UA Vehicle's Stereo-vision system through SEN-14262 board using external ADC which resulted in Unmanned Aerial Vehicles audio detection and classification.",
        "Created and preprocessed audio samples by converting .mp3 files to .WAV format, Normalizing and Extracting features by long mel Spectrogram resulting in improved classification performance of the Model from 0.89 to 0.94.",
        "Presented the Project at YODHA Conference and secured 2nd position resulting in deployment of the UAV's at red zones.",
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-section">
      <div className="mx-auto max-w-7xl">
        <h2 className="animate-fade-up text-3xl sm:text-4xl font-bold mb-12 text-center text-foreground">
          Professional Experience
        </h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="animate-fade-up bg-card text-card-foreground border border-border p-5 sm:p-6 rounded-lg shadow-md"
              style={{ animationDelay: `${index * 0.2}s` }}
              >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="w-fit shrink-0 rounded-full bg-primary/20 p-3">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold">{exp.position}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <div className="flex flex-col sm:flex-row sm:justify-between mt-1">
                    <p className="text-muted-foreground">{exp.location}</p>
                    <p className="text-muted-foreground">{exp.period}</p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{resp}</span>
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
