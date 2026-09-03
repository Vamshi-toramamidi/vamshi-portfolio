import { Users } from "lucide-react"

export default function Leadership() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-section">
      <div className="mx-auto max-w-7xl">
        <h2 className="animate-fade-up text-3xl sm:text-4xl font-bold mb-12 text-center text-foreground">
          Leadership & Extracurricular
        </h2>
        <div
          className="animate-fade-up bg-card text-card-foreground border border-border p-5 sm:p-6 rounded-lg shadow-md"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="w-fit shrink-0 rounded-full bg-primary/20 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
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
        </div>
      </div>
    </section>
  )
}
