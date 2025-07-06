import React from 'react';

export default function ShowcaseCarousel({ projects }) {
  return (
    <section className="showcase-carousel">
      <div className="showase-carousel-wrapper">
        {projects.map((project, idx) => (
          <div
            key={project.slug || idx}
            className={`w-layout-blockcontainer case-container ${project.category || ''} w-container`}
          >
            <div className="showcase-text">
              <div className="showcase-subtitle light">{project.subtitle || project.category}</div>
              <h1 className="showcase-title light">{project.title}</h1>
            </div>
            <div className={`showcase-button${project.category ? ' ' + project.category : ''}`}>
              <div className="div-block-14">
                <img src="images/plus.svg" loading="lazy" width={24} alt="Open details" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 