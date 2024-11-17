'use client'
import { useState } from 'react';
import Image from 'next/image';
interface ProjectCarouselProps {
    projectFolder: string;
    maxImages: number;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projectFolder, maxImages }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const imageUrls = Array.from({ length: maxImages }, (_, i) =>
        `/images/${projectFolder}/image${i + 1}.png`
    );

    const nextImage = () => setCurrentImage((prev) => (prev + 1) % imageUrls.length);
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);

    return (
        <div className="relative w-full h-48 overflow-hidden">
            <button onClick={prevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
            >
                ‹
            </button>
            <Image src={imageUrls[currentImage]}
               alt={`Project image ${currentImage + 1}`}
               width={500} height={300}
               className="w-full h-48 object-cover"
            />
            <button onClick={nextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
            >
                ›
            </button>
        </div>
    );
};

export default ProjectCarousel;
