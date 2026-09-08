"use client"

import { motion } from "framer-motion"
import Image from "next/image"

type Certification = {
  id: number
  title: string
  issuer: string
  date: string
  /** Preview image of the certificate. */
  imageUrl: string
  /** The certificate PDF, served from /public. */
  certificateUrl: string
  /** Coursera share/verification link for the course. */
  courseUrl: string
}

const certifications: Certification[] = [
  {
    id: 1,
    title: "Building Smart Business Assistants with IBM Watson",
    issuer: "Coursera Project Network",
    date: "Nov 2021",
    imageUrl: "/certificates/ibm-watson-business-assistants.jpg",
    certificateUrl: "/certificates/ibm-watson-business-assistants.pdf",
    courseUrl: "https://coursera.org/share/b6dd2d810f9aaae493f9c07e94b6c757",
  },
  {
    id: 2,
    title: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
    issuer: "DeepLearning.AI",
    date: "Nov 2023",
    imageUrl: "/certificates/improving-deep-neural-networks.jpg",
    certificateUrl: "/certificates/improving-deep-neural-networks.pdf",
    courseUrl: "https://coursera.org/share/939ffc29bdd62391fbf3f3976c35be7b",
  },
  {
    id: 3,
    title: "AI, Business & the Future of Work",
    issuer: "Lund University",
    date: "Feb 2022",
    imageUrl: "/certificates/ai-business-future-of-work.jpg",
    certificateUrl: "/certificates/ai-business-future-of-work.pdf",
    courseUrl: "https://coursera.org/share/dbad3206f58da788773188b81cf402a3",
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-up text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Certifications</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Coursework I completed outside the classroom, spanning conversational AI, deep learning, and the
            business impact of AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((certification) => (
            /* initial={false}: cards render visible on first paint (no blank SSR). */
            <motion.article
              key={certification.id}
              initial={false}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="group flex flex-col bg-card text-card-foreground border border-border hover:border-primary/40 rounded-3xl shadow-sm hover:shadow-xl transition-[box-shadow,border-color] duration-300 ease-in-out overflow-hidden"
            >
              <a
                href={certification.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the ${certification.title} certificate (PDF) in a new tab`}
                /* The box matches the certificate's own aspect ratio, so object-cover
                   fills it edge to edge without cropping the certificate. */
                className="relative aspect-[1166/886] overflow-hidden bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              >
                <Image
                  src={certification.imageUrl}
                  alt={`${certification.title} certificate`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/80 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-within:opacity-100">
                  <span className="text-sm font-medium text-background">View certificate (PDF)</span>
                </div>
              </a>

              <div className="flex flex-col flex-1 p-6">
                <div className="text-sm font-medium text-primary mb-1">{certification.issuer}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{certification.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">Completed {certification.date}</p>
                <div className="mt-auto">
                  <a
                    href={certification.courseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open the ${certification.title} course page in a new tab`}
                    className="text-primary hover:underline inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    View Course
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
