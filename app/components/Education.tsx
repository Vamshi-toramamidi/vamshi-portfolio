export default function Education() {
  const education = [
    {
      degree: "Master's of Science in Computer Science",
      institution: "Seattle University, Washington",
      period: "Fall 2024 – Present",
      gpa: "GPA: 4.0/4.0",
      courses: [
        "Fundamentals of Software Engineering",
        "Artificial Intelligence",
        "Distributed Systems",
        "Parallel Computing",
        "Linux Operating Systems",
        "User Experience Design",
      ],
    },
    {
      degree: "Bachelor's of Technology in Computer Science, Specialization in AIML",
      institution: "Gandhi Institute of Technology and Management University, Andhra Pradesh",
      period: "Fall 2020 – Spring 2024",
      gpa: "GPA: 3.6/4.0",
      courses: [
        "OOPs",
        "Python",
        "Design Analysis and Algorithms",
        "Data Structures",
        "Database Management",
        "Data Mining",
        "Artificial Intelligence",
        "Machine Learning",
        "Computer Architecture",
        "Natural Language Processing",
        "Big Data Analytics",
        "Deep Learning",
        "Operating Systems",
        "Compiler Design",
        "Web Services and Technologies",
      ],
    },
  ]

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        <h2 className="animate-fade-up text-3xl sm:text-4xl font-bold mb-12 text-center text-foreground">
          Education
        </h2>
        <div className="space-y-8">
          {education.map((item, index) => (
            <div
              key={index}
              className="animate-fade-up bg-card text-card-foreground border border-border p-5 sm:p-8 rounded-lg shadow-md"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-xl font-bold">{item.degree}</h3>
              <p className="text-primary font-medium">{item.institution}</p>
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 mt-2">
                <p className="text-muted-foreground">{item.period}</p>
                <p className="font-medium">{item.gpa}</p>
              </div>

              <div className="mt-6 border-t border-border pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Relevant Coursework
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2.5">
                  {item.courses.map((course) => (
                    <li
                      key={course}
                      className="rounded-full border border-border bg-muted/60 px-3.5 py-1.5 text-sm leading-none text-foreground/90 transition-colors duration-200 hover:border-primary/40 hover:bg-muted"
                    >
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
