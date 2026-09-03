"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import FoodForecastChart from "./FoodForecastChart"
import UavSpectrogram from "./UavSpectrogram"

type Project = {
  id: number
  title: string
  description: string
  imageUrl: string
  category: string
  details: string[]
  github: string
  /** Renders a live component in place of the still image. */
  visual?: "uav-spectrogram" | "food-forecast"
}

const projects: Project[] = [
  {
    id: 1,
    title: "Movie Recommendation Website",
    description:
      "Engineered a scalable full-stack web application using React.js, Node.js, and Firebase, focusing on clean architecture and modular component design to ensure reusability and separation of concerns.",
    imageUrl: "/placeholder.svg",
    category: "Web Development",
    details: [
      "Optimized frontend performance by implementing code splitting, lazy loading, cookies and efficient state updates, reducing render time and improving load speed.",
      "Employed unit and integration testing using Jest and React Testing Library, achieving over 90% code coverage and ensuring stability across major feature releases.",
    ],
    github: "https://github.com/Vamshi-toramamidi/Movie-Recommendation-Website",
  },
  {
    id: 2,
    title: "Zero-shot Multilingual Sentiment Analysis",
    description:
      "Built the architecture of the model using transformers resulting in attention mechanism to capture the complex relationship between data.",
    imageUrl: "/projects/zero-shot-sentiment-telugu.jpg",
    category: "Machine Learning",
    details: [
      "Contributed 369 lines of code for pre-processing of the data, including tokenization using XLM-RoBERTa as a Tokenizer resulted in maintaining Integrity and capture nuanced sentiment effectively by 0.22.",
      "Collaborated with team members using version control systems such as Git to organize modifications and assign tasks, and for unit testing.",
    ],
    github: "",
  },
  {
    id: 3,
    title: "Food Forecasting with Tableau",
    description:
      "Developed a comprehensive food demand forecasting system using Tableau to predict inventory needs and optimize supply chain operations.",
    imageUrl: "/placeholder.svg",
    category: "Data Visualization",
    details: [
      "Analyzed historical sales data to identify seasonal patterns and trends in food consumption.",
      "Created interactive dashboards allowing stakeholders to visualize demand forecasts and make data-driven decisions.",
      "Implemented predictive models that improved inventory management and reduced waste by 15%.",
    ],
    github: "",
    visual: "food-forecast",
  },
  {
    id: 4,
    title: "UAV Audio Detection System",
    description:
      "Integrated YAMnet into Unmanned Aerial Vehicle's stereo-vision system for audio detection and classification.",
    imageUrl: "/placeholder.svg",
    category: "Machine Learning",
    details: [
      "Preprocessed audio samples by converting .mp3 files to .WAV format and extracting features using mel spectrograms.",
      "Improved classification performance from 0.89 to 0.94 through feature engineering and model optimization.",
      "Project was presented at YODHA Conference and secured 2nd position, resulting in deployment in red zones.",
    ],
    github: "",
    visual: "uav-spectrogram",
  },
  {
    id: 5,
    title: "Lung Cancer Detection using LGBM",
    description:
      "Developed a machine learning model to detect lung cancer based on patient data and lifestyle attributes, helping in early identification of lung cancer risks.",
    imageUrl: "/projects/lung-cancer-detection.jpg",
    category: "Machine Learning",
    details: [
      "Preprocessed medical data by removing duplicates, handling categorical features with LabelEncoder, and balancing the dataset using RandomOverSampler.",
      "Implemented LightGBM Classifier for training the predictive model, achieving strong accuracy with clear interpretability of results.",
      "Built a simple test interface for real-time predictions, allowing for practical application in clinical settings.",
    ],
    github: "https://github.com/Vamshi-toramamidi/Lung-Cancer-Detection",
  },
  {
    id: 6,
    title: "MEAN - Medium Website Replica",
    description:
      "Collaborated with a team of five to create a functional replica of the Medium publishing platform, named MEAN, with article publishing and user interaction features.",
    imageUrl: "/placeholder.svg",
    category: "Web Development",
    details: [
      "Implemented user authentication, article creation, editing, and publishing functionality.",
      "Developed responsive UI components that closely mimic Medium's reading experience and interaction patterns.",
      "Integrated a call scheduling system to facilitate communication between writers and editors.",
    ],
    github: "https://github.com/Vamshi-toramamidi/mean-call-scheduler",
  },
]

const categories = ["All", ...new Set(projects.map((project) => project.category))]

const EASE = [0.22, 1, 0.36, 1] as const

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [source, setSource] = useState(src)

  return (
    <Image
      src={source}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      onError={() => setSource("/placeholder.svg")}
    />
  )
}

export default function PortfolioGrid() {
  const [filter, setFilter] = useState("All")

  const filteredProjects = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  )

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-up text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Our Work</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A showcase of our minimalist designs and creative solutions.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((category) => {
            const isActive = filter === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={isActive}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isActive
                    ? "text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolio-filter-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            )
          })}
        </div>

        <motion.div
          layout
          transition={{ layout: { duration: 0.4, ease: EASE } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* initial={false}: cards render visible on first paint (no blank SSR),
              while filter changes still animate. */}
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                whileHover={{ y: -6 }}
                transition={{
                  duration: 0.3,
                  ease: EASE,
                  layout: { type: "spring", stiffness: 300, damping: 32 },
                }}
                className="group flex flex-col bg-card text-card-foreground border border-border hover:border-primary/40 rounded-3xl shadow-sm hover:shadow-xl transition-[box-shadow,border-color] duration-300 ease-in-out overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  {project.visual === "uav-spectrogram" ? (
                    <UavSpectrogram className="transition-transform duration-500 ease-out group-hover:scale-105" />
                  ) : project.visual === "food-forecast" ? (
                    <FoodForecastChart className="transition-transform duration-500 ease-out group-hover:scale-105" />
                  ) : (
                    <ProjectImage src={project.imageUrl || "/placeholder.svg"} alt={project.title} />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/80 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-within:opacity-100">
                    <div className="max-h-full overflow-y-auto px-5 py-4 text-background">
                      <ul className="list-disc list-inside text-left">
                        {project.details.map((detail, idx) => (
                          <li key={idx} className="text-sm mb-2 last:mb-0">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="text-sm font-medium text-primary mb-1">{project.category}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="mt-auto flex justify-between items-center">
                    <button
                      type="button"
                      className="text-primary hover:underline inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    >
                      View Details
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
                    </button>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} on GitHub`}
                        className="text-muted-foreground hover:text-primary transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
