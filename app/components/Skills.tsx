
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
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-section">
      <div className="mx-auto max-w-7xl">
        <h2 className="animate-fade-up text-3xl sm:text-4xl font-bold mb-12 text-center text-foreground">
          Technical Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="animate-fade-up bg-card text-card-foreground border border-border p-5 sm:p-6 rounded-lg shadow-md"
              style={{ animationDelay: `${index * 0.1}s` }}
              >
              <h3 className="text-xl font-bold mb-4 text-primary">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
