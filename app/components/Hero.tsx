
export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg lg:flex-shrink-0">
          <h1 className="animate-fade-up mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-gradient">Vamshi Toramamidi</span>
          </h1>
          <p
            className="animate-fade-up mt-6 text-lg leading-8 text-muted-foreground"
            style={{ animationDelay: "0.2s" }}
          >
            Computer Science graduate specializing in Data Engineering, Machine Learning, and Software Development.
          </p>
          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
            style={{ animationDelay: "0.4s" }}
          >
            <a href="#contact" className="apple-button">
              Contact Me
            </a>
            <a href="#projects" className="text-sm font-semibold leading-6 text-foreground">
              View Projects <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="animate-fade-left mx-auto mt-16 lg:mt-0" style={{ animationDelay: "0.6s" }}>
          <div className="relative">
            <img
              src="/vamshi-hero.jpg"
              alt="Vamshi Toramamidi"
              width={600}
              height={800}
              className="w-full max-w-[500px] rounded-2xl shadow-xl ring-1 ring-border"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
