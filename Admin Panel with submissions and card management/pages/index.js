import { getAllContent } from '../src/utils/content';
import Link from 'next/link';
import ProjectCard from '../src/components/ProjectCard';
import TestimonialCard from '../src/components/TestimonialCard';

export default function Home({ projects, testimonials }) {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {projects.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} legacyBehavior>
            <a>
              <ProjectCard
                title={p.data.title}
                description={p.data.description || p.data.subtitle}
                category={p.data.category || p.data.type}
                image={p.data.image}
                technologies={p.data.technologies || []}
                featured={p.data.featured}
                visible={p.data.visible !== false}
                video={p.data.video}
                order={p.data.order}
                projectUrl={p.data.projectUrl}
                githubUrl={p.data.githubUrl}
              />
            </a>
          </Link>
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-6">Testimonials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <Link key={t.slug} href={`/testimonials/${t.slug}`} legacyBehavior>
            <a>
              <TestimonialCard
                name={t.data.name}
                position={t.data.role || t.data.position}
                company={t.data.company}
                avatar={t.data.image || t.data.avatar}
                content={t.content}
                featured={t.data.featured}
                visible={t.data.visible !== false}
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const projects = getAllContent('content/projects');
  const testimonials = getAllContent('content/testimonials');
  return {
    props: {
      projects,
      testimonials,
    },
  };
} 