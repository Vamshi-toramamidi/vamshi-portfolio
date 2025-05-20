"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

export default function Experience() {
  const experiences = [
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
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Professional Experience
        </motion.h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="bg-secondary/20 p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
