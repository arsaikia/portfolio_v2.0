import Timeline from './Timeline'

const About = () => {

  return (
    <>
      {/* About Me Section - Compact and Focused */}
      <section 
        id="about" 
        className="py-16 bg-gray-50/80 dark:bg-gray-900/70 backdrop-blur-sm"
        aria-labelledby="about-heading"
      >
        <div className="container-max section-padding">
          {/* About Me - Compact and Simple */}
          <div className="text-center mb-10">
            <h2 
              id="about-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            >
              About Me
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Senior full-stack engineer at Adobe with 8+ years of experience building commerce systems that are fast, accessible and easy for other teams to build on. My work has lifted checkout conversion by 12% and added $1.5M in annual recurring revenue.
              </p>

              <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
                Off the clock, you'll find me deep in a video game or playing guitar.
              </p>
            </div>
          </div>

          {/* Main Content - Single Column for Better Focus */}
          <div className="max-w-5xl mx-auto">
            {/* Timeline */}
            <section className="mb-8" aria-labelledby="experience-heading">
              {/* Sticks under the site header while the timeline scrolls;
                  releases with the section. Doubles as the bio/career separator. */}
              <div className="sticky top-16 z-30 -mx-4 px-4 mb-8 py-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
                {/* Soft fade so cards dissolve under the bar instead of a hard cut */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-full h-8 bg-gradient-to-b from-white/70 to-transparent dark:from-gray-900/70"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-4">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-700" aria-hidden="true" />
                  <h3
                    id="experience-heading"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400"
                  >
                    Experience
                  </h3>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-700" aria-hidden="true" />
                </div>
              </div>
              <Timeline />
            </section>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
