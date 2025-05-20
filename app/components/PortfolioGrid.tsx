"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Movie Recommendation Website",
    description:
      "Engineered a scalable full-stack web application using React.js, Node.js, and Firebase, focusing on clean architecture and modular component design to ensure reusability and separation of concerns.",
    imageUrl: "/placeholder.svg?height=600&width=800",
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
    imageUrl: "/placeholder.svg?height=800&width=600",
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
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Data Visualization",
    details: [
      "Analyzed historical sales data to identify seasonal patterns and trends in food consumption.",
      "Created interactive dashboards allowing stakeholders to visualize demand forecasts and make data-driven decisions.",
      "Implemented predictive models that improved inventory management and reduced waste by 15%.",
    ],
    github: "",
  },
  {
    id: 4,
    title: "UAV Audio Detection System",
    description:
      "Integrated YAMnet into Unmanned Aerial Vehicle's stereo-vision system for audio detection and classification.",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "Machine Learning",
    details: [
      "Preprocessed audio samples by converting .mp3 files to .WAV format and extracting features using mel spectrograms.",
      "Improved classification performance from 0.89 to 0.94 through feature engineering and model optimization.",
      "Project was presented at YODHA Conference and secured 2nd position, resulting in deployment in red zones.",
    ],
    github: "",
  },
  {
    id: 5,
    title: "Lung Cancer Detection using LGBM",
    description:
      "Developed a machine learning model to detect lung cancer based on patient data and lifestyle attributes, helping in early identification of lung cancer risks.",
    imageUrl: "/placeholder.svg?height=600&width=800",
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
    imageUrl: "/placeholder.svg?height=800&width=600",
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

export default function PortfolioGrid() {
  const [filter, setFilter] = useState("All")

  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Our Work</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A showcase of our minimalist designs and creative solutions.
          </p>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-3xl shadow-lg overflow-hidden hover-lift transition-all duration-300 ease-in-out border-2 border-transparent hover:border-primary/10"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="text-white text-center px-4">
                      <ul className="list-disc list-inside">
                        {project.details.map((detail, idx) => (
                          <li key={idx} className="text-sm mb-2">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="text-sm font-medium text-primary mb-1">{project.category}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <button className="text-primary hover:underline inline-flex items-center">
                      View Details
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
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
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
