import React from 'react';

export default function TestimonialCard({
  name,
  position,
  company,
  avatar,
  content,
  featured,
  visible = true,
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
      <div className="relative h-64 p-6 text-white overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-20 h-20 bg-white rounded-full opacity-30"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-white rounded-full opacity-20"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white rounded-full opacity-40"></div>
        </div>
        <div className="flex items-center space-x-4 mb-4 relative z-10">
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-white">{name}</h3>
            <p className="text-sm text-white text-opacity-80">{position}</p>
            <p className="text-sm text-white text-opacity-60">{company}</p>
          </div>
        </div>
        <p className="text-white text-opacity-90 text-sm line-clamp-4 mb-4 relative z-10">{content}</p>
        <div className="flex space-x-2 relative z-10">
          {featured && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">Featured</span>
          )}
          {!visible && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">Hidden</span>
          )}
        </div>
      </div>
    </div>
  );
} 