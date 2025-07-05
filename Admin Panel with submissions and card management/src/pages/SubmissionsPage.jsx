import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DocumentTextIcon, 
  CalendarIcon, 
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  ClockIcon,
  FolderIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowDownTrayIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSubmission, setExpandedSubmission] = useState(null);

  useEffect(() => {
    // In a real implementation, you would fetch from Netlify Forms API
    // For now, we'll simulate with localStorage data
    const mockSubmissions = [
      {
        id: 1,
        submittedAt: '2024-01-15T10:30:00Z',
        email: 'john.doe@example.com',
        productTypes: ['Video', 'Website'],
        businessGoal: 'More clients',
        industry: 'Technology',
        deadline: '1-2 months',
        materials: 'Everything will be provided',
        budget: 'Up to $5000',
        additionalInfo: 'Looking to create a comprehensive digital presence for our new SaaS product.',
        suggestedPackage: {
          items: [
            { title: 'Product Video', price: 2299 },
            { title: 'Brand ID Kit + Web', price: 3600 }
          ],
          total: 5309,
          discount: 590
        }
      },
      {
        id: 2,
        submittedAt: '2024-01-14T14:20:00Z',
        email: 'sarah.smith@company.com',
        productTypes: ['Application'],
        businessGoal: 'Explanation of a service',
        industry: 'Finance',
        deadline: 'Less than a month',
        materials: 'Marketing materials needs to be created',
        budget: 'Up to $10 000',
        additionalInfo: 'Need a mobile app for our financial advisory services.',
        suggestedPackage: {
          items: [
            { title: 'Application Development', price: 3699 }
          ],
          total: 3699,
          discount: 0,
          hasRushSurcharge: true
        }
      },
      {
        id: 3,
        submittedAt: '2024-01-13T09:15:00Z',
        email: 'mike.wilson@startup.io',
        productTypes: ['Video', 'Website', 'Application'],
        businessGoal: 'Tell a story',
        industry: 'Technology',
        deadline: '1-2 months',
        materials: 'Marketing materials needs to be created',
        budget: 'Up to $10 000',
        additionalInfo: 'Complete digital transformation for our startup. Need everything from branding to full-stack development.',
        suggestedPackage: {
          items: [
            { title: 'Video Series', price: 1499, isPerEpisode: true },
            { title: 'Brand ID Kit + Web', price: 3600 },
            { title: 'Application Development', price: 3699 }
          ],
          total: 7918,
          discount: 880
        }
      }
    ];

    // Simulate API call delay
    setTimeout(() => {
      setSubmissions(mockSubmissions);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProductTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'video':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        );
      case 'website':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 12h18M12 3v18M8.5 7.5h7M8.5 16.5h7"/>
          </svg>
        );
      case 'application':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM7 4V3h10v1H7zm0 14V6h10v12H7z"/>
          </svg>
        );
      default:
        return <DocumentTextIcon className="w-5 h-5" />;
    }
  };

  const toggleExpanded = (submissionId) => {
    setExpandedSubmission(expandedSubmission === submissionId ? null : submissionId);
  };

  const handleExport = (submission) => {
    const data = {
      submissionDate: formatDate(submission.submittedAt),
      clientEmail: submission.email,
      productTypes: submission.productTypes.join(', '),
      businessGoal: submission.businessGoal,
      industry: submission.industry,
      timeline: submission.deadline,
      materials: submission.materials,
      budget: submission.budget,
      additionalInfo: submission.additionalInfo,
      suggestedPackage: submission.suggestedPackage
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submission-${submission.id}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleContact = (email) => {
    window.location.href = `mailto:${email}?subject=Regarding your project inquiry`;
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submissions...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error loading submissions</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Submissions</p>
              <p className="text-3xl font-bold text-gray-900">{submissions.length}</p>
            </div>
            <DocumentTextIcon className="w-8 h-8 text-gray-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-3xl font-bold text-gray-900">
                ${submissions.reduce((sum, s) => sum + s.suggestedPackage.total, 0).toLocaleString()}
              </p>
            </div>
            <CurrencyDollarIcon className="w-8 h-8 text-green-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Project Value</p>
              <p className="text-3xl font-bold text-gray-900">
                ${Math.round(submissions.reduce((sum, s) => sum + s.suggestedPackage.total, 0) / submissions.length).toLocaleString()}
              </p>
            </div>
            <BuildingOfficeIcon className="w-8 h-8 text-blue-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-gray-900">{submissions.length}</p>
            </div>
            <CalendarIcon className="w-8 h-8 text-purple-400" />
          </div>
        </motion.div>
      </div>

      {/* Submissions List */}
      {submissions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-white rounded-xl border border-gray-200"
        >
          <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No submissions yet</h3>
          <p className="text-gray-600">
            Questionnaire responses will appear here once users start submitting.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission, index) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {/* Submission Header */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-900">{submission.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <CalendarIcon className="w-4 h-4" />
                      <span className="text-sm">{formatDate(submission.submittedAt)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleExpanded(submission.id)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium">
                      {expandedSubmission === submission.id ? 'Collapse' : 'View Details'}
                    </span>
                    {expandedSubmission === submission.id ? (
                      <ChevronUpIcon className="w-4 h-4" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Quick Overview */}
                <div className="mt-4 flex flex-wrap gap-3">
                  {submission.productTypes.map((type, typeIndex) => (
                    <div
                      key={typeIndex}
                      className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {getProductTypeIcon(type)}
                      <span className="text-sm font-medium text-gray-700">{type}</span>
                    </div>
                  ))}
                  
                  <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                    <CurrencyDollarIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      ${submission.suggestedPackage.total.toLocaleString()}
                    </span>
                  </div>

                  {submission.suggestedPackage.hasRushSurcharge && (
                    <div className="flex items-center space-x-2 bg-amber-100 px-3 py-1 rounded-full">
                      <ClockIcon className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-700">Rush</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedSubmission === submission.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-gray-100"
                  >
                    <div className="p-6 bg-gray-50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Questionnaire Answers */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">
                            Questionnaire Responses
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <BuildingOfficeIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                              <div>
                                <div className="text-sm font-medium text-gray-700">Business Goal</div>
                                <div className="text-gray-900">{submission.businessGoal}</div>
                              </div>
                            </div>

                            <div className="flex items-start space-x-3">
                              <FolderIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                              <div>
                                <div className="text-sm font-medium text-gray-700">Industry</div>
                                <div className="text-gray-900">{submission.industry}</div>
                              </div>
                            </div>

                            <div className="flex items-start space-x-3">
                              <ClockIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                              <div>
                                <div className="text-sm font-medium text-gray-700">Timeline</div>
                                <div className="text-gray-900">{submission.deadline}</div>
                              </div>
                            </div>

                            <div className="flex items-start space-x-3">
                              <DocumentTextIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                              <div>
                                <div className="text-sm font-medium text-gray-700">Materials</div>
                                <div className="text-gray-900">{submission.materials}</div>
                              </div>
                            </div>

                            <div className="flex items-start space-x-3">
                              <CurrencyDollarIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                              <div>
                                <div className="text-sm font-medium text-gray-700">Budget</div>
                                <div className="text-gray-900">{submission.budget}</div>
                              </div>
                            </div>

                            {submission.additionalInfo && (
                              <div className="flex items-start space-x-3">
                                <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                  <div className="text-sm font-medium text-gray-700">Additional Information</div>
                                  <div className="text-gray-900">{submission.additionalInfo}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Column - Suggested Package */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">
                            Suggested Package
                          </h4>
                          
                          <div className="bg-white rounded-lg border border-gray-200 p-4">
                            {submission.suggestedPackage.items.length > 1 ? (
                              // Bundle display
                              <div>
                                <h5 className="font-medium text-gray-900 mb-3">Complete Solution Bundle</h5>
                                
                                <div className="space-y-2 mb-4">
                                  {submission.suggestedPackage.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex justify-between items-center">
                                      <span className="text-gray-700">{item.title}</span>
                                      <span className="font-medium">
                                        ${item.price.toLocaleString()}
                                        {item.isPerEpisode && <span className="text-sm text-gray-500"> /ep</span>}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                
                                <hr className="border-gray-200 mb-3" />
                                
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${(submission.suggestedPackage.total + submission.suggestedPackage.discount).toLocaleString()}</span>
                                  </div>
                                  
                                  {submission.suggestedPackage.discount > 0 && (
                                    <div className="flex justify-between items-center text-green-600">
                                      <span>Bundle Discount (10%)</span>
                                      <span>-${submission.suggestedPackage.discount.toLocaleString()}</span>
                                    </div>
                                  )}
                                  
                                  <hr className="border-gray-200" />
                                  
                                  <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${submission.suggestedPackage.total.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              // Single item display
                              <div>
                                <h5 className="font-medium text-gray-900 mb-2">
                                  {submission.suggestedPackage.items[0].title}
                                </h5>
                                <div className="text-2xl font-bold text-gray-900">
                                  ${submission.suggestedPackage.items[0].price.toLocaleString()}
                                  {submission.suggestedPackage.items[0].isPerEpisode && (
                                    <span className="text-lg text-gray-500"> per episode</span>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {submission.suggestedPackage.hasRushSurcharge && (
                              <div className="mt-3 flex items-center space-x-2 text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                                </svg>
                                <span className="text-sm font-medium">
                                  Rush delivery: +25% surcharge applies
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-6 flex justify-end space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleExport(submission)}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <ArrowDownTrayIcon className="w-4 h-4" />
                          <span>Export Data</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleContact(submission.email)}
                          className="flex items-center space-x-2 px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <PhoneIcon className="w-4 h-4" />
                          <span>Contact Client</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}