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
          <div className="text-center mb-12">
            <h2 
              id="about-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            >
              About Me
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering.
              </p>
              
              <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
                With 8+ years of experience, I specialize in full-stack development and building scalable applications that serve millions of users while maintaining high performance standards.
              </p>
            </div>
          </div>

          {/* Main Content - Single Column for Better Focus */}
          <div className="max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="mb-8">
              <div className="sr-only">
                <p>Navigate through my career timeline using the year buttons on the right, or scroll through the timeline content.</p>
              </div>
              <div 
                role="region"
                aria-label="Career Timeline"
                tabIndex={0}
              >
                <Timeline />
              </div>
            </div>



          </div>
        </div>
      </section>


    </>
  )
}

export default About 