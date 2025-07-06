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
      className={`p-6 group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${!visible ? 'opacity-60 border-2 border-red-200' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{position}</p>
          <p className="text-sm text-gray-500">{company}</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm line-clamp-4 mb-4">{content}</p>
      <div className="flex space-x-2">
        {featured && (
          <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">Featured</span>
        )}
        {!visible && (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">Hidden</span>
        )}
      </div>
    </div>
  );
} 