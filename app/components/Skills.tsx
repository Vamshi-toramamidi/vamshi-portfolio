"use client"

import { motion } from "framer-motion"

export default function Skills() {
  const skillCategories = [
    {
      category: "Languages",
      skills: ["Python", "Java", "C++", "R", "SQL", "HTML/CSS"],
    },
    {
      category: "Libraries",
      skills: [
        "Pandas",
        "Numpy",
        "Matlab",
        "Scikit-learn",
        "Tensorflow",
        "SpaCy",
        "PySeries",
        "Pytorch",
        "Opencv",
        "NLTK",
        "Pydub",
        "Librosa",
      ],
    },
    {
      category: "Data Visualization",
      skills: ["MS Excel", "Tableau", "PowerBI"],
    },
    {
      category: "Developer Tools",
      skills: ["VS Code", "Eclipse", "Google Cloud Platform", "Docker", "Kubernetes", "Spark", "Arduino"],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Technical Skills
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4 text-primary">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
