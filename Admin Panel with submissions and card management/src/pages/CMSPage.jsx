import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  EyeSlashIcon,
  PhotoIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  StarIcon,
  BriefcaseIcon,
  LinkIcon,
  CodeBracketIcon,
  PlayIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Real projects from your portfolio site
const mockProjects = [
  {
    id: 1,
    title: "Questionnaire System",
    category: "Web Development",
    description: "Interactive questionnaire system with dynamic recommendations and package suggestions for client onboarding.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    video: null,
    technologies: ["React", "JavaScript", "Tailwind CSS", "Framer Motion"],
    projectUrl: "https://questionnaire-demo.example.com",
    githubUrl: "https://github.com/username/questionnaire-system",
    visible: true,
    featured: true,
    order: 1,
    createdAt: "2024-01-15",
    content: "A comprehensive questionnaire system that guides clients through a series of questions to determine their project needs and automatically generates personalized package recommendations with pricing."
  },
  {
    id: 2,
    title: "E-commerce Platform",
    category: "Web Development", 
    description: "Modern e-commerce solution with advanced features including payment integration, inventory management, and responsive design.",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    projectUrl: "https://ecommerce-demo.example.com",
    githubUrl: "https://github.com/username/ecommerce-platform",
    visible: true,
    featured: true,
    order: 2,
    createdAt: "2024-01-10",
    content: "Full-featured e-commerce platform with user authentication, product catalog, shopping cart, payment processing, and admin dashboard for inventory management."
  },
  {
    id: 3,
    title: "Portfolio Website",
    category: "Web Development",
    description: "Personal portfolio website showcasing projects, skills, and professional experience with modern design and smooth animations.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    video: null,
    technologies: ["HTML", "CSS", "JavaScript", "Webflow"],
    projectUrl: "https://portfolio-b07dcd.webflow.io/",
    githubUrl: null,
    visible: true,
    featured: false,
    order: 3,
    createdAt: "2024-01-05",
    content: "Professional portfolio website featuring project showcases, testimonials, and contact information with responsive design and interactive elements."
  },
  {
    id: 4,
    title: "Mobile Banking App",
    category: "Mobile Development",
    description: "Secure banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.",
    image: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-147413.jpeg?auto=compress&cs=tinysrgb&w=800",
    video: null,
    technologies: ["React Native", "Firebase", "Redux"],
    projectUrl: "https://banking-app-demo.example.com",
    githubUrl: "https://github.com/username/banking-app",
    visible: true,
    featured: false,
    order: 4,
    createdAt: "2024-01-01",
    content: "Secure mobile banking application with features like account management, transaction history, bill payments, and budget tracking with biometric security."
  },
  {
    id: 5,
    title: "Dashboard Analytics",
    category: "Web Development",
    description: "Comprehensive analytics dashboard with real-time data visualization, user management, and reporting capabilities.",
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
    video: null,
    technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
    projectUrl: "https://analytics-dashboard.example.com",
    githubUrl: "https://github.com/username/analytics-dashboard",
    visible: false,
    featured: false,
    order: 5,
    createdAt: "2023-12-28",
    content: "Advanced analytics dashboard providing insights through interactive charts, real-time data updates, and customizable reporting features for business intelligence."
  }
];

const mockTestimonials = [
  {
    id: 1,
    name: "John Smith",
    company: "TechCorp Solutions",
    position: "CEO & Founder",
    content: "Outstanding work! The team delivered exactly what we needed and exceeded our expectations. The attention to detail and professional approach made this project a huge success.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
    visible: true,
    featured: true,
    order: 1,
    createdAt: "2024-01-12"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "Creative Design Studio",
    position: "Creative Director",
    content: "Professional, creative, and delivered on time. The design work was exceptional and perfectly captured our brand vision. Highly recommended for any design project!",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
    visible: true,
    featured: true,
    order: 2,
    createdAt: "2024-01-08"
  },
  {
    id: 3,
    name: "Michael Chen",
    company: "StartupLab Inc",
    position: "CTO",
    content: "Incredible technical expertise and problem-solving skills. They transformed our complex requirements into an elegant, scalable solution that our users love.",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
    visible: true,
    featured: false,
    order: 3,
    createdAt: "2024-01-03"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    company: "Digital Marketing Pro",
    position: "Marketing Manager",
    content: "The website redesign boosted our conversion rates by 40%. The team understood our goals and delivered a solution that truly drives business results.",
    avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400",
    visible: true,
    featured: false,
    order: 4,
    createdAt: "2023-12-30"
  },
  {
    id: 5,
    name: "David Thompson",
    company: "FinanceFlow",
    position: "Product Manager",
    content: "Working with this team was a game-changer for our product. Their innovative approach and attention to user experience resulted in a 60% increase in user engagement.",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    visible: false,
    featured: false,
    order: 5,
    createdAt: "2023-12-25"
  }
];

export default function CMSPage() {
  const [activeSection, setActiveSection] = useState('projects');
  const [projects, setProjects] = useState(mockProjects);
  const [testimonials, setTestimonials] = useState(mockTestimonials);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const sections = [
    {
      id: 'projects',
      name: 'Portfolio Projects',
      icon: BriefcaseIcon,
      description: 'Manage showcase carousel projects',
      data: projects,
      setData: setProjects
    },
    {
      id: 'testimonials',
      name: 'Testimonials',
      icon: StarIcon,
      description: 'Manage client testimonials',
      data: testimonials,
      setData: setTestimonials
    }
  ];

  const currentSection = sections.find(s => s.id === activeSection);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal || showPreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal, showPreview]);

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handlePreview = (item) => {
    setPreviewItem(item);
    setShowPreview(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      currentSection.setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleToggleVisibility = (id) => {
    currentSection.setData(prev => 
      prev.map(item => 
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const handleToggleFeatured = (id) => {
    currentSection.setData(prev => 
      prev.map(item => 
        item.id === id ? { ...item, featured: !item.featured } : item
      )
    );
  };

  const handleSave = () => {
    if (editingItem) {
      // Update existing item
      currentSection.setData(prev => 
        prev.map(item => 
          item.id === editingItem.id ? { ...formData, id: editingItem.id } : item
        )
      );
    } else {
      // Add new item
      const newItem = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        visible: true,
        featured: false,
        order: currentSection.data.length + 1
      };
      currentSection.setData(prev => [newItem, ...prev]);
    }
    setShowModal(false);
    setFormData({});
    setEditingItem(null);
  };

  const renderProjectForm = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Title *
        </label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="Enter project title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          value={formData.category || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="">Select category</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile Development">Mobile Development</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows="3"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
          placeholder="Project description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Content *
        </label>
        <textarea
          value={formData.content || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          rows="4"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
          placeholder="Detailed project content for popup"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Image URL *
        </label>
        <input
          type="url"
          value={formData.image || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Demo Video URL (Optional)
        </label>
        <input
          type="url"
          value={formData.video || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, video: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="https://example.com/video.mp4"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project URL (Optional)
          </label>
          <input
            type="url"
            value={formData.projectUrl || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, projectUrl: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="https://project-demo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub URL (Optional)
          </label>
          <input
            type="url"
            value={formData.githubUrl || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Technologies (comma-separated)
        </label>
        <input
          type="text"
          value={formData.technologies?.join(', ') || ''}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t)
          }))}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="React, Node.js, MongoDB"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Display Order
        </label>
        <input
          type="number"
          value={formData.order || 0}
          onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="0"
        />
      </div>
    </div>
  );

  const renderTestimonialForm = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Client Name *
        </label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="Enter client name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company *
          </label>
          <input
            type="text"
            value={formData.company || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position *
          </label>
          <input
            type="text"
            value={formData.position || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Job title"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Testimonial Content *
        </label>
        <textarea
          value={formData.content || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          rows="4"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
          placeholder="Client testimonial content"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Avatar Image URL *
        </label>
        <input
          type="url"
          value={formData.avatar || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="https://example.com/avatar.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Display Order
        </label>
        <input
          type="number"
          value={formData.order || 0}
          onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="0"
        />
      </div>
    </div>
  );

  // Stats for the current section
  const visibleItems = currentSection.data.filter(item => item.visible);
  const featuredItems = currentSection.data.filter(item => item.featured);

  return (
    <div className="p-6">
      {/* Section Tabs */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeSection === section.id
                  ? 'bg-white text-black shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span>{section.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{currentSection.data.length}</p>
            </div>
            <DocumentTextIcon className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Visible</p>
              <p className="text-2xl font-bold text-green-600">{visibleItems.length}</p>
            </div>
            <EyeIcon className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-yellow-600">{featuredItems.length}</p>
            </div>
            <StarIcon className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hidden</p>
              <p className="text-2xl font-bold text-red-600">{currentSection.data.length - visibleItems.length}</p>
            </div>
            <EyeSlashIcon className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Content Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{currentSection.name}</h2>
          <p className="text-gray-600">{currentSection.description}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add {activeSection === 'projects' ? 'Project' : 'Testimonial'}</span>
        </motion.button>
      </div>

      {/* Content Grid - Website-style cards matching your image */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {currentSection.data
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                !item.visible ? 'opacity-60 border-2 border-red-200' : ''
              }`}
              onClick={() => handlePreview(item)}
              style={{
                background: activeSection === 'projects' 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'white'
              }}
            >
              {/* Project Card (Website Style - matching your image) */}
              {activeSection === 'projects' ? (
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
                      {item.category}
                    </span>
                  </div>

                  {/* Project title */}
                  <div className="relative z-10 mb-4">
                    <h3 className="text-2xl font-bold mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white text-opacity-90 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Technologies at bottom */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    {item.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="bg-white bg-opacity-20 text-white px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm">
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 3 && (
                          <span className="text-white text-opacity-70 text-xs">+{item.technologies.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Status badges */}
                  <div className="absolute top-6 right-6 flex space-x-2 z-10">
                    {item.featured && (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                    {!item.visible && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Hidden
                      </span>
                    )}
                  </div>

                  {/* Video indicator */}
                  {item.video && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <PlayIcon className="w-8 h-8 text-gray-800 ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Testimonial Card - Clean white design */
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.position}</p>
                      <p className="text-sm text-gray-500">{item.company}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm line-clamp-4 mb-4">{item.content}</p>
                  
                  {/* Status badges */}
                  <div className="flex space-x-2">
                    {item.featured && (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                    {!item.visible && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Hidden
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Admin Controls Overlay */}
              <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleVisibility(item.id);
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    item.visible 
                      ? 'bg-white text-gray-600 hover:text-gray-900 shadow-md' 
                      : 'bg-red-100 text-red-600 hover:text-red-700 shadow-md'
                  }`}
                  title={item.visible ? 'Hide' : 'Show'}
                >
                  {item.visible ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFeatured(item.id);
                  }}
                  className={`p-2 rounded-lg transition-colors shadow-md ${
                    item.featured 
                      ? 'bg-yellow-100 text-yellow-600 hover:text-yellow-700' 
                      : 'bg-white text-gray-600 hover:text-gray-900'
                  }`}
                  title={item.featured ? 'Remove from featured' : 'Add to featured'}
                >
                  <StarIcon className={`w-4 h-4 ${item.featured ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(item);
                  }}
                  className="p-2 bg-white text-gray-600 hover:text-gray-900 rounded-lg transition-colors shadow-md"
                  title="Edit"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  className="p-2 bg-white text-red-600 hover:text-red-700 rounded-lg transition-colors shadow-md"
                  title="Delete"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Preview Modal (Website-style popup) */}
      <AnimatePresence>
        {showPreview && previewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {activeSection === 'projects' ? (
                /* Project Popup */
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                  {/* Left side - Image/Video */}
                  <div className="relative bg-gray-100">
                    {previewItem.video ? (
                      <video
                        src={previewItem.video}
                        controls
                        className="w-full h-full object-cover"
                        poster={previewItem.image}
                      />
                    ) : (
                      <img
                        src={previewItem.image}
                        alt={previewItem.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Right side - Content */}
                  <div className="p-8 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          {previewItem.category}
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
                          {previewItem.title}
                        </h2>
                        <p className="text-gray-600 mb-6">
                          {previewItem.description}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowPreview(false)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Details</h3>
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {previewItem.content}
                      </p>

                      {/* Technologies */}
                      {previewItem.technologies && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {previewItem.technologies.map((tech, i) => (
                              <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex space-x-4">
                        {previewItem.projectUrl && (
                          <a
                            href={previewItem.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                          >
                            <LinkIcon className="w-4 h-4" />
                            <span>View Project</span>
                          </a>
                        )}
                        {previewItem.githubUrl && (
                          <a
                            href={previewItem.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                          >
                            <CodeBracketIcon className="w-4 h-4" />
                            <span>View Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Testimonial Popup - No star ratings */
                <div className="p-8 text-center max-w-2xl mx-auto">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>

                  <img
                    src={previewItem.avatar}
                    alt={previewItem.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-6"
                  />

                  <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed italic">
                    "{previewItem.content}"
                  </blockquote>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{previewItem.name}</h3>
                    <p className="text-gray-600">{previewItem.position}</p>
                    <p className="text-gray-500">{previewItem.company}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingItem ? 'Edit' : 'Add'} {activeSection === 'projects' ? 'Project' : 'Testimonial'}
                </h3>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
                {activeSection === 'projects' ? renderProjectForm() : renderTestimonialForm()}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-black text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}