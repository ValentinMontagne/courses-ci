'use client'
import React from 'react';
import { motion } from 'framer-motion';
import ProjectCarousel from './ProjectCarousel';

interface ProjectCardProps {
    title: string;
    description: string;
    projectFolder: string;
    projectLink: string;
    maxImages?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
                                                     title,
                                                     description,
                                                     projectFolder,
                                                     projectLink,
                                                     maxImages = 5,
                                                 }) => (
    <motion.div
        className="border rounded-lg overflow-hidden shadow-lg p-4 bg-white dark:bg-gray-800"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
    >
        <ProjectCarousel projectFolder={projectFolder} maxImages={maxImages} />

        <h3 className="mt-4 text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
        <a href={projectLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 inline-block">
            View Project
        </a>
    </motion.div>
);

export default ProjectCard;
