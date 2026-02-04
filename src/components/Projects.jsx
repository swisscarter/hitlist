import React from 'react'
import './Projects.css'

export default function Projects() {
  const projects = [
    { name: 'Fanatics Live', soon: false },
    { name: 'Beyond Barriers', soon: false },
    { name: 'Kinship', soon: false },
    { name: 'FutureMoney', soon: false },
    { name: 'Dropbox', soon: false },
    { name: 'Grammarly', soon: false },
    { name: 'Pluto TV', soon: false },
    { name: 'Paramount+', soon: true },
  ]

  return (
    <div className="projects-container" data-name="Projects" data-node-id="1123:6560">
      <div className="projects-list" data-name="List" data-node-id="1123:6568">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={`projects-item ${index === projects.length - 2 || index === projects.length - 1 ? 'projects-item-with-gap' : ''}`}
            data-name="Item" 
            data-node-id={`1123:${6561 + index * 4}`}
          >
            <p 
              className="projects-item-name"
              data-node-id={`1123:${6562 + index * 4}`}
            >
              {project.name}
            </p>
            {project.soon && (
              <div 
                className="projects-soon-badge"
                data-name="Label" 
                data-node-id="1123:6581"
              >
                <div className="projects-soon-badge-content" data-node-id="1123:6582">
                  <p>Soon</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

