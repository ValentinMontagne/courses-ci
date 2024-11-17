import React from 'react';
import ProjectCard from '../components/ProjectCard';

const projects = [
  {
    title: 'Project 1',
    description: 'Description for project 1',
    projectFolder: 'projet1',
    projectLink: '#',
  },
  {
    title: 'Project 2',
    description: 'Description for project 2',
    projectFolder: 'projet2',
    projectLink: '#',
    maxImages: 3,
  },
];

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-8">Project Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {projects.map((project) => (
              <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  projectFolder={project.projectFolder}
                  projectLink={project.projectLink}
                  maxImages={project.maxImages}
              />
          ))}
        </div>
      </main>
  );
}
