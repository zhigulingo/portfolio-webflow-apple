import Head from 'next/head';
import ShowcaseCarousel from '../components/ShowcaseCarousel';
import { getAllContent } from '../utils/content';

export default function Home({ projects }) {
  return (
    <>
      <Head>
        <title>Zhigulingo - Motion & Digital Design by Gleb Zhigulin</title>
        <meta name="description" content="Portfolio of Gleb Zhigulin: motion design, digital art, and creative projects at Zhigulingo." />
        <link rel="icon" href="/images/portfolio-favicon.png" />
      </Head>
      <section className="heading-menu">
        <div className="div-block-24">
          <h1 className="heading-10">ZHIGULINGO</h1>
        </div>
        <div className="div-block-2">
          <p className="paragraph-2">If you can dream it,<br/>Gleb can do it.</p>
        </div>
      </section>
      {/* Video Section Placeholder */}
      <section className="heading-menu">
        <div>
          <h1 className="heading-5">Get to know Gleb.</h1>
        </div>
        <div className="div-block-2 projects">
          <div className="div-block-13">
            <p className="paragraph-4">Latest projects</p>
          </div>
        </div>
      </section>
      <ShowcaseCarousel projects={projects.map(p => ({ ...p.data, slug: p.slug }))} />
      {/* Placeholders for testimonials, footer, etc. */}
    </>
  );
}

export async function getStaticProps() {
  const projects = getAllContent('content/projects');
  return {
    props: {
      projects,
    },
  };
} 