"use client"

import { motion } from "framer-motion"

export default function Education() {
  const education = [
    {
      degree: "Master's of Science in Computer Science",
      institution: "Seattle University, Washington",
      period: "Fall 2024 – Present",
      gpa: "GPA: 4.0/4.0",
      courses:
        "Relevant Courses: Software Engineering, Artificial Intelligence, Distributed Systems, Parallel Computing, Linux Operating Systems",
    },
    {
      degree: "Bachelor's of Technology in Computer Science, Specialization in AIML",
      institution: "Gandhi Institute of Technology and Management University, Andhra Pradesh",
      period: "Fall 2020 – Spring 2024",
      gpa: "GPA: 3.6/4.0",
      courses:
        "Relevant Courses: OOPs, Python, Algorithms, Data Structures, Database Management, Data Mining, Artificial Intelligence, Machine Learning, Computer Architecture, Natural Language Processing, Big Data Analytics, Deep Learning, Operating Systems, Compiler Design, Web Services and Technologies.",
    },
  ]

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Education
        </motion.h2>
        <div className="space-y-8">
          {education.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <h3 className="text-xl font-bold">{item.degree}</h3>
              <p className="text-primary font-medium">{item.institution}</p>
              <div className="flex justify-between mt-2">
                <p className="text-gray-600">{item.period}</p>
                <p className="font-medium">{item.gpa}</p>
              </div>
              <p className="mt-3 text-gray-700">{item.courses}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
