"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"

export default function Leadership() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Leadership & Extracurricular
        </motion.h2>
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-bold">Tech Lead and Core Member</h3>
                <p className="text-muted-foreground">Oct 2020 – March 2024</p>
              </div>
              <p className="text-primary font-medium">Association for Computing Machinery, Andhra Pradesh, India</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>
                    Hosted 7 workshops on cloud computing, quantum computing, AI-ML by fostering strong connection with
                    influential tech journalists.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>
                    Significantly boosted attendance and participation at ACM's conferences and workshops by 15%.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
