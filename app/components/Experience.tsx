import { Briefcase } from "lucide-react"
import ExperienceVideo from "./ExperienceVideo"

type Experience = {
  position: string
  company: string
  location: string
  period: string
  responsibilities: string[]
  /** Field-test footage, expanded and played when the entry scrolls into view. */
  demo?: {
    src: string
    poster: string
    label: string
    caption: string
  }
}

export default function Experience() {
  const experiences: Experience[] = [
        {
      position: "Software Engineer (AIML) Intern",
      company: "Mayuri International Foods",
      location: "Seattle, Washington",
      period: "Feb 2026 – June 2026",
      responsibilities: [
        "Architected a concept-based catalog search engine in Python, replacing a Postgres ts_rank/trigram SQL ranker with an intent model that resolves transliterated spelling variants to canonical concepts and maps each to a product kind and store department, scored by a 13-feature additive ranking function over an in-memory index of 4,000+ SKUs  raising Precision@1 from 0.61 to 1.00 and NDCG@5 from 0.63 to 1.00 on a 38-query graded benchmark while cutting query latency from ~70 ms to under 1 ms.",
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
        "Integrated an external ADC and SEN-14262 audio board into a UAV stereo-vision system, designing the complete microphone-to-inference signal path and bringing acoustic sensing onto a platform that previously supported vision only.",
        "Specified and validated the analog front end and digitization stage, covering gain staging, anti-aliasing ahead of the ADC, quantization and dynamic range budgeting, and SNR under continuous propeller noise and airframe vibration.",
        "Implemented real-time audio capture and buffering on the embedded processor, sizing ring buffers and frame handling to sustain uninterrupted streaming into the inference loop without overruns or dropped samples.",
        "Deployed YAMNet on resource-constrained onboard hardware using TensorFlow Lite, running log-Mel feature extraction and inference in-line with the existing vision workload under shared CPU, memory, power, and thermal budgets.",
        "Debugged hardware integration issues spanning clipping and noise floor characterization, EMI and ground-loop coupling from motors and ESCs, and timing alignment between the audio subsystem and the vision pipeline.",
        "Improved classification performance from 0.89 to 0.94 through a rebuilt preprocessing chain (MP3 to WAV/PCM, normalization, long Mel spectrogram extraction) applied identically in training and on-device inference.",
        "Presented at the YODHA Conference, securing 2nd place; the resulting system was deployed on UAVs in red-zone operations.",
      ],
      demo: {
        src: "/demos/uav-audio-detection.mp4",
        poster: "/demos/uav-audio-detection-poster.jpg",
        label: "Field demo",
        caption:
          "UAV autonomous avoidance and landing trials, alongside the live stereo-vision and detection stack.",
      },
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
                  {exp.demo && <ExperienceVideo {...exp.demo} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
