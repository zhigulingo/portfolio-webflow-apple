import { getAllContent } from '../../src/utils/content';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LinkIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

export default function ProjectPage({ project }) {
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;
  if (!project) return <div>Not found</div>;
  const {
    title,
    subtitle,
    image,
    video,
    technologies = [],
    projectUrl,
    githubUrl,
    content,
  } = {
    ...project.data,
    content: project.content,
  };
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] rounded-3xl overflow-hidden shadow-lg bg-white">
        {/* Left side - Image/Video */}
        <div className="relative bg-gray-100 flex items-center justify-center">
          {video ? (
            <video src={video} controls className="w-full h-full object-cover" poster={image} />
          ) : (
            image && <img src={image} alt={title} className="w-full h-full object-cover" />
          )}
        </div>
        {/* Right side - Content */}
        <div className="flex flex-col p-8">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          {subtitle && <h2 className="text-lg text-gray-600 mb-4">{subtitle}</h2>}
          <div className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">{content}</div>
          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{tech}</span>
                ))}
              </div>
            </div>
          )}
          {/* Links */}
          <div className="flex space-x-4 mt-auto">
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
                <span>View Project</span>
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
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
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const projects = getAllContent('content/projects');
  return {
    paths: projects.map((p) => ({ params: { slug: p.slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const projects = getAllContent('content/projects');
  const project = projects.find((p) => p.slug === params.slug) || null;
  return {
    props: { project },
  };
} 