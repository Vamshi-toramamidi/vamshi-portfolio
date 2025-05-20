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
                  <button className="text-primary hover:underline inline-flex items-center">
                    View Details
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
