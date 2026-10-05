import { Briefcase, ExternalLink } from "lucide-react"
import ExperienceVideo from "./ExperienceVideo"
import ExperiencePrototype from "./ExperiencePrototype"
import ExperienceEvolution from "./ExperienceEvolution"

type Experience = {
  position: string
  company: string
  location: string
  period: string
  responsibilities: string[]
  /** Public deployment of the work built in this role. */
  liveUrl?: {
    href: string
    label: string
  }
  /** Field-test footage, expanded and played when the entry scrolls into view. */
  demo?: {
    src: string
    poster: string
    label: string
    caption: string
  }
  /** Design iterations shown as a step-by-step progression. */
  evolution?: {
    label: string
    summary: string[]
    stages: {
      src: string
      thumb: string
      title: string
      caption: string
    }[]
  }
  /** Interactive design prototype, embedded on demand. */
  prototype?: {
    href: string
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
        "Pitched an AI shopping assistant to the owners, vice president, and stakeholders as a way to keep pace with competitors, and got the go-ahead to build it.",
        "Worked closely with stakeholders and employees to gather customer FAQs, product knowledge, and the layout of every aisle and bay, then turned it into a mapped floor plan and a technical plan for the system.",
        "Built a Python search engine that understands transliterated spellings and maps each query to the right product and department, replacing the old SQL ranker: top-result accuracy rose from 61% to 100% on a 38-query benchmark, and searches dropped from ~70 ms to under 1 ms.",
        "Built the chat assistant on GPT-4.1-nano with function calling and streamed responses from FastAPI, grounding every answer in real catalog data. Aisle directions come from the floor-plan map, not the model, so it never invents a location.",
        "Added safety and quality checks: PII redaction, content moderation, polite refusal of off-topic questions, and automated relevance tests in CI so search quality can't quietly regress, all without slowing responses.",
        "Shipped the full system (FastAPI, Next.js/React, Postgres, Redis, Docker) with fast cold starts and a one-switch rollback to the old search that needs no redeploy.",
        "Kept it easy and cheap to run for a store without a technical team: simple for non-engineers to update, and hosted entirely on free tiers (Neon Postgres, Railway, 30 MB Redis, Vercel).",
      ],
      liveUrl: {
        href: "https://mayuribot.toramamidivamshi.com",
        label: "Try MayuriBot live - Beta Version",
      },
      prototype: {
        href: "https://www.figma.com/proto/FuNV82kHWQonSqYJ7bRR6k/AI-Chatbot---Mayuri?node-id=101-997&p=f&t=OcmyrHK2uuKcivQp-1&scaling=scale-down&content-scaling=fixed&page-id=101%3A996",
        label: "Stakeholder wireframes",
        caption:
          "Interactive wireframes presented to the store owners, chairman, and stakeholders before development.",
      },
      evolution: {
        label: "Store floor plan: sketch to system",
        summary: [
          "The floor plan is what makes the assistant's aisle directions trustworthy. Every product answer links to a numbered shelf zone on this map, so customers are sent to where an item actually sits instead of wherever a language model guesses it might be.",
          "We built it from the ground up: visiting the store to walk each aisle and record shelf by shelf what was stocked, talking with employees about where products really live and how customers ask for them, and reviewing each draft with the owners, chairman, and stakeholders until the layout matched the floor.",
        ],
        stages: [
          {
            src: "/demos/mayuri/floorplan-1-rough-sketch.jpg",
            thumb: "/demos/mayuri/floorplan-1-rough-sketch-thumb.jpg",
            title: "Rough sketch",
            caption: "First site walkthrough: core aisles, freezers, and counters.",
          },
          {
            src: "/demos/mayuri/floorplan-2-detailed-sketch.jpg",
            thumb: "/demos/mayuri/floorplan-2-detailed-sketch-thumb.jpg",
            title: "Detailed sketch",
            caption: "Every department mapped after talks with employees.",
          },
          {
            src: "/demos/mayuri/floorplan-3-digital.jpg",
            thumb: "/demos/mayuri/floorplan-3-digital-thumb.jpg",
            title: "Digital floor plan",
            caption: "Numbered shelf zones, reviewed with stakeholders.",
          },
        ],
      },
    },
    {
      position: "Data Engineer Intern",
      company: "Reinvision Labs Pvt. Ltd.",
      location: "Telangana, India",
      period: "May 2022 – Aug 2024",
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
      period: "May 2023 – July 2023",
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
                  {exp.liveUrl && (
                    <a
                      href={exp.liveUrl.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    >
                      {exp.liveUrl.label}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                  <ul className="mt-4 space-y-2">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.evolution && <ExperienceEvolution {...exp.evolution} />}
                  {exp.prototype && <ExperiencePrototype {...exp.prototype} />}
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
