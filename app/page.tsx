import Hero from "./components/Hero"
import Education from "./components/Education"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
import PortfolioGrid from "./components/PortfolioGrid"
import Leadership from "./components/Leadership"
import Contact from "./components/Contact"

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <div id="projects">
        <PortfolioGrid />
      </div>
      <Skills />
      <Education />
      <Leadership />
      <Contact />
    </>
  )
}
