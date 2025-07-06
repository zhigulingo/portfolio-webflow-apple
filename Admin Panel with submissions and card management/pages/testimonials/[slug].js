import { getAllContent } from '../../src/utils/content';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function TestimonialPage({ testimonial }) {
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;
  if (!testimonial) return <div>Not found</div>;
  const {
    name,
    position,
    company,
    image,
    avatar,
    content,
  } = {
    ...testimonial.data,
    avatar: testimonial.data.avatar || testimonial.data.image,
    content: testimonial.content,
  };
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white rounded-3xl shadow-lg p-8 text-center relative">
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-6"
          />
        )}
        <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed italic">
          "{content}"
        </blockquote>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          {position && <p className="text-gray-600">{position}</p>}
          {company && <p className="text-gray-500">{company}</p>}
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const testimonials = getAllContent('content/testimonials');
  return {
    paths: testimonials.map((t) => ({ params: { slug: t.slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const testimonials = getAllContent('content/testimonials');
  const testimonial = testimonials.find((t) => t.slug === params.slug) || null;
  return {
    props: { testimonial },
  };
} 