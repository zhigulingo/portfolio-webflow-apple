import React from 'react';
import { PlayIcon } from '@heroicons/react/24/outline';

export default function ProjectCard({
  title,
  description,
  category,
  image,
  technologies = [],
  featured,
  visible = true,
  video,
  onClick
}) {
  return (
    <div
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${!visible ? 'opacity-60 border-2 border-red-200' : ''}`}
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <div className="relative h-80 p-6 text-white overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-20 h-20 bg-white rounded-full opacity-30"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-white rounded-full opacity-20"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white rounded-full opacity-40"></div>
        </div>
        {/* Category badge */}
        <div className="relative z-10 mb-4">
          <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            {category}
          </span>
        </div>
        {/* Project title */}
        <div className="relative z-10 mb-4">
          <h3 className="text-2xl font-bold mb-2 leading-tight">{title}</h3>
          <p className="text-white text-opacity-90 text-sm leading-relaxed">{description}</p>
        </div>
        {/* Technologies at bottom */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 3).map((tech, i) => (
                <span key={i} className="bg-white bg-opacity-20 text-white px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm">
                  {tech}
                </span>
              ))}
              {technologies.length > 3 && (
                <span className="text-white text-opacity-70 text-xs">+{technologies.length - 3}</span>
              )}
            </div>
          )}
        </div>
        {/* Status badges */}
        <div className="absolute top-6 right-6 flex space-x-2 z-10">
          {featured && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">Featured</span>
          )}
          {!visible && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">Hidden</span>
          )}
        </div>
        {/* Video indicator */}
        {video && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
              <PlayIcon className="w-8 h-8 text-gray-800 ml-1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 