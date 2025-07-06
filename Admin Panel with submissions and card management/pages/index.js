import { getAllContent } from '../src/utils/content';
import Link from 'next/link';
import ProjectCard from '../src/components/ProjectCard';
import TestimonialCard from '../src/components/TestimonialCard';
import ShowcaseCarousel from '../src/components/ShowcaseCarousel';

export default function Home({ projects, testimonials }) {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <ShowcaseCarousel projects={projects.map(p => ({
        ...p.data,
        slug: p.slug
      }))} />
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