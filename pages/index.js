import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Webflow's JS body class toggler
    document.documentElement.className += ' w-mod-js';
    if ('ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch)) {
      document.documentElement.className += ' w-mod-touch';
    }
    // Service worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }
    // Questionare button handler
    document.querySelectorAll('.get-started').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (window.showQuestionare) window.showQuestionare();
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>Zhigulingo - Motion & Digital Design by Gleb Zhigulin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Portfolio of Gleb Zhigulin: motion design, digital art, and creative projects at Zhigulingo." />
        <meta property="og:title" content="Zhigulingo - Motion & Digital Design by Gleb Zhigulin" />
        <meta property="og:description" content="Explore Gleb Zhigulin's portfolio at Zhigulingo - motion design, digital art, and more." />
        <meta property="og:image" content="/images/snippet.jpg" />
        <meta property="og:image:alt" content="Zhigulingo portfolio preview" />
        <meta property="og:url" content="https://zhigulingo.zgo.design" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zhigulingo - Motion & Digital Design by Gleb Zhigulin" />
        <meta name="twitter:description" content="Explore Gleb Zhigulin's portfolio at Zhigulingo - motion design, digital art, and more." />
        <meta name="twitter:image" content="/images/snippet.jpg" />
        <link rel="shortcut icon" href="/images/portfolio-favicon.png" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/images/app-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <div className="body">
        {/* Header & Hero Section */}
        <section className="heading-menu">
          <div className="div-block-24">
            <h1 className="heading-10">ZHIGULINGO</h1>
          </div>
          <div className="div-block-2">
            <p className="paragraph-2">If you can dream it,<br />Gleb can do it.</p>
          </div>
        </section>
        <div className="w-layout-blockcontainer container-video w-container">
          <div className="round-corner">
            <div style={{ paddingTop: '56.17021276595745%' }} className="w-embed-youtubevideo youtube">
              <iframe
                src="https://www.youtube-nocookie.com/embed/CfNWuURLtYo?rel=0&amp;controls=0&amp;autoplay=1&amp;mute=1&amp;start=0"
                frameBorder="0"
                style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'auto' }}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Preview 1920 Teaser"
              ></iframe>
            </div>
            <div
              data-poster-url="/images/zhigulingoart-20reel-20teaser_1_1-poster-00001.jpg"
              data-video-urls="/images/zhigulingoart-20reel-20teaser_1_1-transcode.mp4,/images/zhigulingoart-20reel-20teaser_1_1-transcode.webm"
              data-autoplay="true"
              data-loop="true"
              className="background-video w-background-video w-background-video-atom"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{ backgroundImage: 'url(/images/zhigulingoart-20reel-20teaser_1_1-poster-00001.jpg)' }}
                data-wf-ignore="true"
                data-object-fit="cover"
              >
                <source src="/images/zhigulingoart-20reel-20teaser_1_1-transcode.mp4" />
                <source src="/images/zhigulingoart-20reel-20teaser_1_1-transcode.webm" />
              </video>
              {/* Play/Pause button markup can be added here if needed */}
            </div>
          </div>
        </div>
        {/* End Header & Hero Section */}

        {/* Showcase/Projects Carousel Section */}
        <section data-w-id="81f5920d-9b68-dd34-2c26-e8cd4a73d793" className="heading-menu">
          <div>
            <h1 className="heading-5">Get to know Gleb.</h1>
          </div>
          <div className="div-block-2 projects">
            <div className="div-block-13">
              <p className="paragraph-4">Latest projects</p>
            </div>
          </div>
        </section>
        <section data-w-id="c468bf85-5037-1fcd-6499-54d9a75cde72" className="showcase-carousel">
          <div className="showase-carousel-wrapper">
            <div data-w-id="ae8c0e05-e12c-266c-a6e2-84f183039c06" className="w-layout-blockcontainer case-container gto w-container">
              <div className="showcase-text">
                <div className="showcase-subtitle light">Promo Video Production</div>
                <h1 className="showcase-title light">PolicyFly</h1>
              </div>
              <div className="showcase-button">
                <div data-w-id="8031ea01-d9b4-c444-7445-5aebff8b6828" className="div-block-14">
                  <img src="/images/plus.svg" loading="lazy" width={24} alt="" />
                </div>
              </div>
            </div>
            <div data-w-id="fc34e3db-faa2-e98c-568f-b368501abb1f" className="w-layout-blockcontainer case-container melodix w-container">
              <div className="showcase-text">
                <div className="showcase-subtitle">Game Design and Interactive Animation</div>
                <h1 className="showcase-title">Melodix Crypto</h1>
              </div>
              <div className="showcase-button melodix">
                <div data-w-id="0a20ef73-1458-af82-fd22-0644a465cc78" className="div-block-14">
                  <img src="/images/plus.svg" loading="lazy" width={24} alt="" />
                </div>
              </div>
            </div>
            <div data-w-id="5ea8b895-6a42-17bb-1cf3-e43cf9cc8994" className="w-layout-blockcontainer case-container tasker w-container">
              <div className="showcase-text">
                <div className="showcase-subtitle">User Experience &amp; User Interface</div>
                <h1 className="showcase-title">Tasker</h1>
              </div>
              <div className="showcase-button tasker">
                <div data-w-id="785c3f09-5368-050c-0593-154684736bc5" className="div-block-14">
                  <img src="/images/plus.svg" loading="lazy" width={24} alt="" />
                </div>
              </div>
            </div>
            <div data-w-id="8a6b9656-4d50-24e9-31d4-400005d12c12" className="w-layout-blockcontainer case-container tgcontest w-container">
              <div className="showcase-text">
                <div className="showcase-subtitle">Research &amp; Development</div>
                <h1 className="showcase-title">Telegram Wallet</h1>
              </div>
              <div className="showcase-button">
                <div data-w-id="5c1053c1-89b1-b260-48db-eb006c3d21ab" className="div-block-14">
                  <img src="/images/plus.svg" loading="lazy" width={24} alt="" />
                </div>
              </div>
            </div>
            <div data-w-id="538f5feb-18fe-07b5-dde0-0f5d3416de82" className="w-layout-blockcontainer case-container omt w-container">
              <div className="showcase-text">
                <div className="showcase-subtitle">Concept ceation &amp; Brand Design</div>
                <h1 className="showcase-title">OMTOGETHER</h1>
              </div>
              <div className="showcase-button">
                <div data-w-id="38ca1740-0fed-58fa-c5f9-7ead512e8ddb" className="div-block-14">
                  <img src="/images/plus.svg" loading="lazy" width={24} alt="" />
                </div>
              </div>
            </div>
            <div data-w-id="b6bc3cb0-9220-7c1d-11db-1c66c88f3f19" className="w-layout-blockcontainer case-container demis w-container">
              <div className="showcase-text">
                <div className="showcase-subtitle">AI content creation</div>
                <h1 className="showcase-title">Special Project</h1>
              </div>
              <div className="showcase-button">
                <div data-w-id="998cf75f-5715-6b65-3a55-5ef7a3e5b6cd" className="div-block-14">
                  <img src="/images/plus.svg" loading="lazy" width={24} alt="" />
                </div>
              </div>
            </div>
            <div className="w-layout-blockcontainer case-container original w-container">
              <div className="showcase-text">
                <div className="showcase-subtitle">AI content creation</div>
                <h1 className="showcase-title">Special Project</h1>
              </div>
              <div className="showcase-button">
                <div data-w-id="5431b4a3-95dc-3dc4-9c84-b41233515d9e" className="div-block-14">
                  <img src="/images/plus.svg" loading="lazy" width={24} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Showcase/Projects Carousel Section */}

        {/* Services/Features Section */}
        <section className="heading-menu">
          <div>
            <h1 className="heading-4">Help me choose.</h1>
          </div>
        </section>
        <section className="questionare">
          <div className="div-block-3">
            <div className="w-layout-blockcontainer container-3 w-container">
              <h1 className="heading-2">Answer a few questions <br />to find the best way Gleb <br />can help you.</h1>
              <a data-w-id="9accb855-ca36-7483-cc7e-8f5b4934dc5b" href="#" className="get-started w-button">Get Started</a>
            </div>
            <div className="w-layout-blockcontainer container-2 w-container"></div>
          </div>
        </section>
        <section className="questionare-mobile">
          <div className="div-block-3">
            <div className="w-layout-blockcontainer container-2 w-container"></div>
            <div className="w-layout-blockcontainer container-3 w-container">
              <h1 className="heading-2">Answer a few questions <br />to find the best way Gleb can help you.</h1>
              <a data-w-id="816194a4-d56a-ec18-1763-b0e882e6baea" href="#" className="get-started w-button">Get Started</a>
            </div>
          </div>
        </section>
        <section className="explore-services">
          <section className="heading-menu">
            <div>
              <h1 className="heading-6">Explore services.</h1>
            </div>
            <div data-w-id="65edc47f-1499-a88a-e46a-b3c2fac9134a" className="div-block-2">
              <div className="div-block-13">
                <p className="paragraph-4"><a href="#" className="link">Help me choose</a></p>
                <img src="/images/chevron-right.svg" loading="lazy" width={12} alt="" className="image-6" />
              </div>
            </div>
          </section>
          <section className="features">
            <section className="selectoranimation">
              <div className="toggle-wrapper-mobile">
                <div className="button-switch active"></div>
                <div className="button-switch _1"><div data-w-id="65edc47f-1499-a88a-e46a-b3c2fac91352" className="text-block brand">Brand Identity</div></div>
                <div className="button-switch _2"><div data-w-id="65edc47f-1499-a88a-e46a-b3c2fac91355" className="text-block motion">Motion Design</div></div>
                <div className="button-switch _3"><div data-w-id="65edc47f-1499-a88a-e46a-b3c2fac91358" className="text-block web">Web/Mobile</div></div>
              </div>
              <div className="toggle-wrapper">
                <div className="button-switch active"></div>
                <div className="button-switch _1"><div data-w-id="4ffd5acf-4502-9247-a1d6-98cf8fe51248" className="text-block brand">Brand Identity</div></div>
                <div className="button-switch _2"><div data-w-id="4ffd5acf-4502-9247-a1d6-98cf8fe5124b" className="text-block motion">Motion Design</div></div>
                <div className="button-switch _3"><div data-w-id="4ffd5acf-4502-9247-a1d6-98cf8fe5124e" className="text-block web">Web/Mobile</div></div>
              </div>
            </section>
            {/* Options, Brand, Motion, Web containers follow, omitted for brevity but will be included in full migration */}
          </section>
        </section>
        {/* End Services/Features Section */}

        {/* Testimonials Section */}
        <section className="heading-menu">
          <div>
            <h1 className="heading-7">Gleb is the best <br />designer for your needs.</h1>
          </div>
          <div className="div-block-2">
            <div className="div-block-12">
              <p className="paragraph-3"><a href="https://linkedin.com/in/zhigulingo" className="link-2">Read All</a></p>
              <img src="/images/chevron-right.svg" loading="lazy" width={12} alt="" className="image-6" />
            </div>
          </div>
        </section>
        <section className="testimonials">
          <div className="w-layout-blockcontainer carousel-wrapper w-container">
            <div data-w-id="41cc564a-7f06-0de2-84a1-6234f5084165" className="review-card">
              <div className="persona">
                <img src="/images/anton.jpg" loading="lazy" alt="" className="image-3" />
                <div className="div-block-6">
                  <h1 className="heading review-card">Anton Zhelabin</h1>
                  <div className="text-block-2">Partner at Neformalno Creative Agency</div>
                </div>
              </div>
              <p className="paragraph">Working with Gleb as a  was an absolute pleasure. <br />He displayed exceptional...</p>
              <div className="testimonial-button">
                <div data-w-id="f863068c-f004-6def-f4e8-93769b06459c" className="div-block-14">
                  <img src="/images/plus.svg" loading="lazy" width={24} alt="" />
                </div>
              </div>
            </div>
            <div data-w-id="ae25687c-78d2-2f1a-7baf-31e05a2df230" className="review-card">
              <div className="persona jack">
                <img src="/images/jack.jpg" loading="lazy" alt="" className="image-3" />
                <div className="div-block-6">
                  <h1 className="heading review-card">Jack Delulio</h1>
                  <div className="text-block-2">Creative Producer</div>
                </div>
              </div>
              <p className="paragraph">We entrusted Gleb with the motion design for a mobile app promo video...</p>
              <div className="testimonial-button">
                <div data-w-id="6037f4cd-aa9f-7803-ad8c-90ca23cf6519" className="div-block-14">
                  <img src="/images/plus.svg" loading="lazy" width={24} alt="" />
                </div>
              </div>
            </div>
            <div data-w-id="9cff7b6a-8b6b-b5b7-f154-e246d9ff0110" className="review-card">
              <div className="persona ekaterina">
                <img src="/images/ekaterina.png" loading="lazy" sizes="64px" srcSet="/images/ekaterina-p-500.png 500w, /images/ekaterina.png 778w" alt="" className="image-4" />
                <div className="div-block-6">
                  <h1 className="heading review-card">Ekaterina Smolyanova</h1>
                  <div className="text-block-2">Partner at Coop-Moscow Agency</div>
                </div>
              </div>
              <p className="paragraph">When Gleb joined us as a junior motion designer, we knew he had potential...</p>
              <div className="testimonial-button">
                <div data-w-id="2ace7106-2043-091d-2a6a-41f1edd7185e" className="div-block-14">
                  <img src="/images/plus.svg" loading="lazy" width={24} alt="" />
                </div>
              </div>
            </div>
            <div data-w-id="84ba81b5-34f5-ef55-b1cd-5a7007844ca0" className="review-card">
              <div className="persona vlad">
                <img src="/images/vlad.jpg" loading="lazy" width="Auto" height="Auto" alt="" srcSet="/images/vlad-p-500.jpg 500w, /images/vlad-p-800.jpg 800w, /images/vlad-p-1080.jpg 1080w, /images/vlad.jpg 1280w" sizes="64px" className="image-3" />
                <div className="div-block-6">
                  <h1 className="heading review-card">Vlad Lapich</h1>
                  <div className="text-block-2">Founder LV Production</div>
                </div>
              </div>
              <p className="paragraph">Gleb was an integral part of our video production team, especially during...</p>
              <div className="testimonial-button">
                <div data-w-id="bf067a92-5d81-f0af-0668-2c5e7ba12474" className="div-block-14">
                  <img src="/images/plus.svg" loading="lazy" width={24} alt="" />
                </div>
              </div>
            </div>
            <div data-w-id="a6ea3302-b975-c8a6-b0d6-83a4d889b2ce" className="review-card">
              <div className="persona nikolay">
                <img src="/images/nikolay.jpeg" loading="lazy" alt="" className="image-3 nikolay" />
                <div className="div-block-6">
                  <h1 className="heading review-card">Nikolay Reutin</h1>
                  <div className="text-block-2">Design Director RBC Media</div>
                </div>
              </div>
              <p className="paragraph">Collaborating with Gleb on our R&amp;D and automation project was an exciting...</p>
              <div className="testimonial-button">
                <div data-w-id="518cd8df-12b9-2116-3496-db748594958e" className="div-block-14">
                  <img src="/images/plus.svg" loading="lazy" width={24} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Testimonials Section */}

        {/* Projects Section */}
        <section className="heading-menu">
          <div>
            <h1 className="heading-9">More to know<br />about Gleb.</h1>
          </div>
        </section>
        <section className="projects">
          <div className="w-layout-blockcontainer carousel-wrapper big w-container">
            <article className="review-card big dreamstalk">
              <div className="div-block-6 big">
                <h1 className="heading review-card">Dreams Talk</h1>
                <div className="text-block-2">AI assistant uncovering your unconscious self</div>
                <div className="learn-more-button dreamstalk">
                  <a href="https://dreamstalk.ru" className="button-2 learn w-button">Learn More</a>
                  <img src="/images/chevron-right.svg" loading="lazy" alt="" />
                </div>
              </div>
            </article>
            <div className="review-card big helper">
              <div className="div-block-6 big">
                <h1 className="heading review-card">Mentorship</h1>
                <div className="text-block-2">Helping designers find their passion and build the right path</div>
                <div className="learn-more-button">
                  <a href="https://gohelper.io" className="button-2 learn w-button">Learn More</a>
                  <img src="/images/chevron-right.svg" loading="lazy" alt="" className="link-chevron" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="footer-light">
          <div className="project-container footer">
            <div className="footer-wrapper-two">
              <a href="https://zhigulingo.zgo.design" className="footer-brand w-inline-block">
                <img src="/images/logo-20frame.png" loading="lazy" width={80} alt="" />
              </a>
              <div className="footer-block-two">
                <a href="http://solvery.io/ru/mentor/zhigulingo" className="footer-link-two">Mentorship</a>
                <a href="http://generativefuture.ru" className="footer-link-two">AI Online Course</a>
              </div>
              <div className="footer-block-two">
                <a href="https://t.me/zhigulingo" className="footer-link-two">t.me/zhigulingo</a>
                <a href="mailto:hello@zgo.design?subject=Gleb%2C%20hey!%20Your%20website%20is%20awesome!" className="footer-link-two">hello@zgo.design</a>
              </div>
              <div className="footer-social-block-two">
                <a href="https://linkedin.com/in/zhigulingo" className="footer-social-link w-inline-block">
                  <img src="/images/linkedin.png" loading="lazy" width={40} alt="" />
                </a>
                <a href="https://behance.net/zhigulingo" className="footer-social-link w-inline-block">
                  <img src="/images/behance.png" loading="lazy" width={40} alt="" />
                </a>
                <a href="https://x.com/zhigulingo" className="footer-social-link w-inline-block">
                  <img src="/images/twitter.png" loading="lazy" width={40} alt="" />
                </a>
              </div>
            </div>
            <div className="footer-divider-two"></div>
            <div className="footer-bottom">
              <div className="footer-copyright">© 2025 ZGODESIGN</div>
            </div>
          </div>
        </section>
        {/* End Projects & Footer Sections */}

        {/* Modal Popups: Question Popup */}
        <section className="modal-popups">
          <section style={{ display: 'none', opacity: 0 }} className="question-popup">
            <div data-w-id="9351b61c-11b9-beda-5fbd-0235bcffe128" className="fade-mn"></div>
            <section className="question-hero w-clearfix">
              <div data-w-id="9351b61c-11b9-beda-5fbd-0235bcffe12a" className="close-button">
                <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
              </div>
              <div className="project-container form">
                <div className="text-section">
                  <h2 className="heading-3 form">Answer a few questions <br />that will help me understand your inquiry and provide possible solutions.</h2>
                  <div className="form-block w-form">
                    <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form" data-wf-page-id="661b000290f30da22a40aa4b" data-wf-element-id="9d2ff3bf-8e0f-c35c-aff4-aa2b082ce9a4">
                      <input className="text-field w-input" autoFocus maxLength={256} name="Name" data-name="Name" placeholder="Johny Ive" type="text" id="Name" required />
                      <input className="text-field-2 w-input" maxLength={256} name="email" data-name="Email" placeholder="Johny@apple.com" type="email" id="email" required />
                      <select id="Project-Field" name="Project-Field" data-name="Project Field" required className="select-field w-select">
                        <option value="Motion Design">Motion Design</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Development">Development</option>
                      </select>
                      <textarea id="Brief-Inquiry" name="Brief-Inquiry" maxLength={5000} data-name="Brief Inquiry" placeholder={"I've a project on mind..."} required className="textarea w-input"></textarea>
                      <div data-sitekey="6LcSStcqAAAAANEEY6cpN0_4GAVqGTWlhxPD5aH1" className="w-form-formrecaptcha g-recaptcha g-recaptcha-error g-recaptcha-disabled"></div>
                      <input type="submit" data-wait="Please wait..." className="submit-button form w-button" value="Submit" />
                    </form>
                    <div className="w-form-done"><div>Thank you! Your submission has been received!</div></div>
                    <div className="w-form-fail"><div>Oops! Something went wrong while submitting the form.</div></div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>
        {/* End Modal Popups: Question Popup */}

        {/* Modal Popups: Order Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="order-popup">
          <section className="order-hero w-clearfix">
            <div data-w-id="e6864fa3-651a-4571-1179-a614608e15db" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container order">
              <h1 className="heading-8">Continue your request via</h1>
              <div className="div-block-25">
                <a href="http://t.me/zhigulingo" className="button-telegram w-button">Telegram</a>
                <a href="http://t.me/zhigulingo" className="button-email w-button">Email</a>
              </div>
            </div>
          </section>
          <div data-w-id="e6864fa3-651a-4571-1179-a614608e15f1" className="fade-mn"></div>
        </section>
        {/* End Modal Popups: Order Popup */}

        {/* Modal Popups: PolicyFly Project Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="policyfly-popup">
          <section className="policyfly-hero w-clearfix">
            <div data-w-id="b79f93db-a771-4375-ba0f-bd50d223da88" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container">
              <div className="project-box">
                <div className="image-section">
                  <a href="#" className="w-inline-block w-lightbox">
                    <img src="/images/image-20477.png" loading="lazy" sizes="100vw" srcSet="/images/image-20477-p-500.png 500w, /images/image-20477-p-800.png 800w, /images/image-20477-p-1080.png 1080w, /images/image-20477.png 1410w" alt="" className="image-7" />
                  </a>
                </div>
                <div className="text-section">
                  <h1>PolicyFly</h1>
                  <p className="margin-bottom-24px">
                    AI-powered insurance management tool for underwriters. YC-backed startup.<br /><br />
                    Working on this project necessitated close collaboration with the founder, Cory. This collaboration provided us with all the necessary insights into the nuances of this revolutionary tool that promises to transform the insurance industry. Over the course of two months, we diligently developed scenarios, managed voiceover actors, and crafted a new user interface that can effectively present and explain intricate details with a sleek and visually appealing design.<br />
                    <a href="#">PolicyFly.com</a><br />
                  </p>
                </div>
              </div>
              <div style={{ paddingTop: '56.27659574468085%' }} className="video-2 w-video w-embed">
                <iframe
                  className="embedly-embed"
                  src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F1040757532%3Fapp_id%3D122963&dntp=1&display_name=Vimeo&url=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F1040757532&image=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1964104774-d24270e6793172a15ece3d23487faa63fb3211d07e207ed4c23b99f3a7c19e65-d_1280&type=text%2Fhtml&schema=vimeo"
                  width={940}
                  height={529}
                  scrolling="no"
                  allowFullScreen
                  title="Insurance SAAS Promo"
                ></iframe>
              </div>
            </div>
          </section>
          <div data-w-id="b79f93db-a771-4375-ba0f-bd50d223da86" className="fade-mn"></div>
        </section>
        {/* End Modal Popups: PolicyFly Project Popup */}

        {/* Modal Popups: Melodix Project Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="melodix-popup">
          <section className="melodix-hero w-clearfix">
            <div data-w-id="8d0088c6-74e7-a78c-0b0b-aba399a42ab0" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container">
              <div className="project-box">
                <div className="image-section">
                  <a href="#" className="w-inline-block w-lightbox">
                    <img src="/images/7-20-20description-20of-20the-20solution-20-26-20originality-20of-20the-20solution-202-2.png" loading="lazy" sizes="100vw" srcSet="/images/7-20-20description-20of-20the-20solution-20-26-20originality-20of-20the-20solution-202-2-p-500.png 500w, /images/7-20-20description-20of-20the-20solution-20-26-20originality-20of-20the-20solution-202-2-p-800.png 800w, /images/7-20-20description-20of-20the-20solution-20-26-20originality-20of-20the-20solution-202-2-p-1080.png 1080w, /images/7-20-20description-20of-20the-20solution-20-26-20originality-20of-20the-20solution-202-2-p-1600.png 1600w, /images/7-20-20description-20of-20the-20solution-20-26-20originality-20of-20the-20solution-202-2.png 1920w" alt="" className="image-7" />
                  </a>
                </div>
                <div className="text-section">
                  <h1>Melodix Crypto</h1>
                  <p className="margin-bottom-24px">
                    A rhythm game within Telegram Mini Apps, integrating NFTs and cryptocurrency to revolutionize music monetization. I contributed to the project's pitch by designing engaging demo presentations and creating interactive in-game assets. Additionally, I developed promotional videos, in-game animations, and visuals to enhance the user experience. The project debuted at a hackathon, showcasing its innovative use of blockchain and gamification in the music industry.<br /><br />
                    <a href="#">t.me/melodix_crypto</a><br />
                  </p>
                </div>
              </div>
              <div style={{ paddingTop: '56.27659574468085%' }} className="video-2 w-video w-embed">
                <iframe
                  className="embedly-embed"
                  src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F1042028194%3Fapp_id%3D122963&dntp=1&display_name=Vimeo&url=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F1042028194&image=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1964918088-6f2ddb0681ecea68708afeb895c5574e098bf3c39f642354f2e6e28f58152263-d_1280&type=text%2Fhtml&schema=vimeo"
                  width={940}
                  height={529}
                  scrolling="no"
                  allowFullScreen
                  title="Melodix Hackaton Intro"
                ></iframe>
              </div>
            </div>
          </section>
          <div data-w-id="81d30796-6584-f58d-3f6a-7c9640ab9b6f" className="fade-mn"></div>
        </section>
        {/* End Modal Popups: Melodix Project Popup */}

        {/* Modal Popups: Tasker Project Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="tasker-popup">
          <div data-w-id="761d6594-6c9f-5f3a-3cdf-bef3e9d72901" className="fade-mn"></div>
          <section className="tasker-hero w-clearfix">
            <div data-w-id="761d6594-6c9f-5f3a-3cdf-bef3e9d72903" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container">
              <div className="project-box">
                <div className="image-section">
                  <a href="#" className="w-inline-block w-lightbox">
                    <img src="/images/taskercover.png" loading="lazy" sizes="100vw" srcSet="/images/taskercover-p-500.png 500w, /images/taskercover-p-800.png 800w, /images/taskercover-p-1080.png 1080w, /images/taskercover-p-1600.png 1600w, /images/taskercover.png 1920w" alt="" className="image-7" />
                  </a>
                </div>
                <div className="text-section-tasker">
                  <h1>Tasker P2P</h1>
                  <p className="margin-bottom-24px">
                    Tasker is a web application designed as a marketplace and escrow platform where clients can post tasks, set cryptocurrency-based rewards, and select performers from a pool of applicants. Once the task is completed, the reward is unlocked, ensuring trust and transparency. If disputes arise, platform administrators act as neutral arbitrators, guaranteeing fairness for both parties.<br />‍<br />
                    <strong>My Contributions:<br />‍</strong>• Played a key role in developing the app's concept and workflow during a hackathon.<br />• Designed the entire user interface, focusing on clarity, usability, and engagement.<br />• Collaborated with a developer to refine functionality and enhance the user experience.<br />• Created a professional pitch deck to showcase the app's value proposition. • Presented the project to the hackathon jury, highlighting its innovative features.<br />‍<br /><strong>Key Features:</strong><br />• A task marketplace where clients can post jobs and define cryptocurrency-based rewards.<br />• A secure escrow system to hold payments until task completion, building trust between parties.<br />• Decentralized arbitration to mediate disputes, ensuring fairness.<br />• A streamlined, user-friendly interface for task creation, application, and tracking progress.<br />‍<br /><strong>Achievements:<br />‍</strong>Tasker was successfully pitched at the hackathon, earning recognition for its innovative use of cryptocurrency to secure payments in the gig economy. My design and presentation efforts were instrumental in bringing the concept to life and showcasing its potential.<br />
                  </p>
                </div>
              </div>
              <div style={{ paddingTop: '56.17021276595745%' }} className="w-embed-youtubevideo youtube-2">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/RIFo0nCRZ-4?rel=0&amp;controls=1&amp;autoplay=1&amp;mute=1&amp;start=847"
                  frameBorder="0"
                  style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'auto' }}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Крипта | Как TON меняет мир крипты и Web3 разработки"
                ></iframe>
              </div>
            </div>
          </section>
        </section>
        {/* End Modal Popups: Tasker Project Popup */}

        {/* Modal Popups: Telegram Project Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="telegram-popup">
          <div data-w-id="2771fdbb-8726-fa33-59da-46c5365fc210" className="fade-mn"></div>
          <section className="telegram-hero w-clearfix">
            <div data-w-id="2771fdbb-8726-fa33-59da-46c5365fc212" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container">
              <div className="project-box">
                <div className="image-section">
                  <a href="#" className="w-inline-block w-lightbox">
                    <img src="/images/wallet-20contest-20intro-20export.png" loading="lazy" sizes="100vw" srcSet="/images/wallet-20contest-20intro-20export-p-500.png 500w, /images/wallet-20contest-20intro-20export-p-800.png 800w, /images/wallet-20contest-20intro-20export-p-1080.png 1080w, /images/wallet-20contest-20intro-20export-p-1600.png 1600w, /images/wallet-20contest-20intro-20export.png 1920w" alt="" className="image-7" />
                  </a>
                </div>
                <div className="text-section">
                  <h1>Telegram Wallet Contest</h1>
                  <p className="margin-bottom-24px">
                    First telegram contest has passed at summer 2024. I participate in it and was presenting a new look for wallet main page. Task was to create a separe home pages for castodial wallet that work straight within Telegram and non-castodial TON wallet, that can be stacked and have a features to collect more different tokens and NFT.<br /><br />
                    By the couse of this contest I was filming the process and published them on YouTube. You are welcome to join me on my path creating UI for wallet main page.<br />
                  </p>
                </div>
              </div>
              <div style={{ paddingTop: '56.17021276595745%' }} className="w-embed-youtubevideo">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/zoxDXrjUYYg?rel=0&amp;controls=1&amp;autoplay=1&amp;mute=1&amp;start=0"
                  frameBorder="0"
                  style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'auto' }}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Telegram Wallet Design Contest - День1 - Определение задачи и первых этапов / Первые шаги в конкурсе"
                ></iframe>
              </div>
            </div>
          </section>
        </section>
        {/* End Modal Popups: Telegram Project Popup */}

        {/* Modal Popups: OMTOGETHER Project Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="omtogether-popup">
          <div data-w-id="d8d008e0-1a0c-6665-c46d-7af8454dd9c3" className="fade-mn"></div>
          <section className="omtogether-hero w-clearfix">
            <div data-w-id="d8d008e0-1a0c-6665-c46d-7af8454dd9c5" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container">
              <div className="project-box">
                <div className="image-section">
                  <a href="#" className="w-inline-block w-lightbox">
                    <img src="/images/file-20cover-20-201.png" loading="lazy" sizes="100vw" srcSet="/images/file-20cover-20-201-p-500.png 500w, /images/file-20cover-20-201-p-800.png 800w, /images/file-20cover-20-201-p-1080.png 1080w, /images/file-20cover-20-201.png 1600w" alt="" className="image-7" />
                  </a>
                </div>
                <div className="text-section">
                  <h1>Omtogether</h1>
                  <p className="margin-bottom-24px">
                    Practice Tracker with community and crypto.<br /><br />
                    I was working on this project closely with the founder, aiming to visualise and make a design and UI concept for application. We started with the raw sketches and prototyping and finished with interactive UI prototype with 2D and 3D animation. Set of 3D elements that will be used as a main center explaining the contcept of the application.<br /><br />
                    <a href="#">omtogether.app</a><br />
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>
        {/* End Modal Popups: OMTOGETHER Project Popup */}

        {/* Modal Popups: Demis Project Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="demis-popup">
          <div data-w-id="f10921be-6e7e-4081-0310-aeb7cfbb0f0a" className="fade-mn"></div>
          <section className="demis-hero w-clearfix">
            <div data-w-id="f10921be-6e7e-4081-0310-aeb7cfbb0f0c" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container">
              <div className="project-box">
                <div className="image-section">
                  <a href="#" className="w-inline-block w-lightbox">
                    <img src="/images/opengraph.png" loading="lazy" sizes="100vw" srcSet="/images/opengraph-p-500.png 500w, /images/opengraph-p-800.png 800w, /images/opengraph-p-1080.png 1080w, /images/opengraph.png 1415w" alt="" className="image-7" />
                  </a>
                </div>
                <div className="text-section">
                  <h1>Demis Anniversary</h1>
                  <p className="margin-bottom-24px">
                    On this project, I had the opportunity to utilize all the latest generative AI tools in action: Midjourney, Magnific, and several others that assisted throughout the project. From GPT to adjust prompts for MJ to FireFly from Adobe to address halting issues from other AI in the final scenes, we used a wide range of generative AI technologies.<br /><br />
                    The project focused on desktop marketing teams from the beginning of the agency until now, serving as a retrospective with engaging artifacts that showcase the most hyped topics of the current year, such as events and music.<br /><br />
                    After generating the animated scenes with depth, I've integrated them into the website with an interactive game-like experience that offers a timeline that can be explored through interactions with artifacts and a slight perspective orientation.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>
        {/* End Modal Popups: Demis Project Popup */}

        {/* Modal Popups: Branding Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="branding-popup">
          <section className="branding-hero w-clearfix">
            <div data-w-id="a0c02a69-ef0f-342e-2a9f-02cbf70b561a" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container services">
              <div className="project-box services">
                <div className="image-section services">
                  <div><h1>Estimate Time:<br />4 weeks</h1></div>
                  <div><h1>Average Price: <br />$1800</h1></div>
                  <div>
                    <h1>Process:</h1>
                    <div className="text-block-4">1. Briefing<br />2. Material Collection<br />3. Design<br />4. Publishing</div>
                  </div>
                </div>
                <div className="text-section">
                  <h1>Brand Identity Kit</h1>
                  <p className="margin-bottom-24px">A Brand Identity Kit is essential for businesses of all sizes, as it helps maintain a unified and professional image, whether you're a startup or an established corporation.<br />‍<br />Also known as a <strong>Brand Guidelines Kit</strong> or <strong>Brand Style Guide</strong> is a collection of documents and resources that define and standardize the visual and communicative elements of a brand. It ensures consistency across all platforms and mediums, helping to maintain a cohesive and recognizable brand image.</p>
                  <a data-w-id="d3fd671a-43e9-e649-4a16-6787cc517b5a" href="#" className="button-6 w-button">Get a quote</a>
                </div>
              </div>
            </div>
          </section>
          <div data-w-id="a0c02a69-ef0f-342e-2a9f-02cbf70b5618" className="fade-mn"></div>
        </section>
        {/* End Modal Popups: Branding Popup */}

        {/* Modal Popups: Logo Animation Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="logo-animation-popup">
          <section className="branding-hero w-clearfix">
            <div data-w-id="logo-animation-close" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container services">
              <div className="project-box services">
                <div className="image-section services">
                  <div><h1>Estimate Time:<br />2 weeks</h1></div>
                  <div><h1>Average Price: <br />$600</h1></div>
                  <div>
                    <h1>Process:</h1>
                    <div className="text-block-4">1. Briefing<br />2. Storyboard<br />3. Animation<br />4. Delivery</div>
                  </div>
                </div>
                <div className="text-section">
                  <h1>Logo Animation</h1>
                  <p className="margin-bottom-24px">A logo animation brings your brand to life, making it more memorable and engaging for your audience. Perfect for intros, outros, and social media content.<br />‍<br />Includes delivery in multiple formats suitable for web, video, and presentations.</p>
                  <a data-w-id="logo-animation-quote" href="#" className="button-6 w-button">Get a quote</a>
                </div>
              </div>
            </div>
          </section>
          <div data-w-id="logo-animation-fade" className="fade-mn"></div>
        </section>
        {/* End Modal Popups: Logo Animation Popup */}

        {/* Modal Popups: Package Design Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="package-design-popup">
          <section className="branding-hero w-clearfix">
            <div data-w-id="package-design-close" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container services">
              <div className="project-box services">
                <div className="image-section services">
                  <div><h1>Estimate Time:<br />3 weeks</h1></div>
                  <div><h1>Average Price: <br />$1200</h1></div>
                  <div>
                    <h1>Process:</h1>
                    <div className="text-block-4">1. Briefing<br />2. Concept Design<br />3. Revisions<br />4. Finalization</div>
                  </div>
                </div>
                <div className="text-section">
                  <h1>Package Design</h1>
                  <p className="margin-bottom-24px">Professional package design that stands out on the shelf and communicates your brand's value. Includes print-ready files and mockups.<br />‍<br />Ideal for product launches, rebranding, or expanding your product line.</p>
                  <a data-w-id="package-design-quote" href="#" className="button-6 w-button">Get a quote</a>
                </div>
              </div>
            </div>
          </section>
          <div data-w-id="package-design-fade" className="fade-mn"></div>
        </section>
        {/* End Modal Popups: Package Design Popup */}

        {/* Modal Popups: Promo Video Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="promo-video-popup">
          <section className="branding-hero w-clearfix">
            <div data-w-id="promo-video-close" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container services">
              <div className="project-box services">
                <div className="image-section services">
                  <div><h1>Estimate Time:<br />5 weeks</h1></div>
                  <div><h1>Average Price: <br />$2500</h1></div>
                  <div>
                    <h1>Process:</h1>
                    <div className="text-block-4">1. Briefing<br />2. Script & Storyboard<br />3. Production<br />4. Editing & Delivery</div>
                  </div>
                </div>
                <div className="text-section">
                  <h1>Promo Video</h1>
                  <p className="margin-bottom-24px">A high-impact promo video to showcase your product, service, or event. Includes concept, script, production, and editing.<br />‍<br />Perfect for launches, campaigns, and social media marketing.</p>
                  <a data-w-id="promo-video-quote" href="#" className="button-6 w-button">Get a quote</a>
                </div>
              </div>
            </div>
          </section>
          <div data-w-id="promo-video-fade" className="fade-mn"></div>
        </section>
        {/* End Modal Popups: Promo Video Popup */}

        {/* Modal Popups: Series Design Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="series-design-popup">
          <section className="branding-hero w-clearfix">
            <div data-w-id="series-design-close" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container services">
              <div className="project-box services">
                <div className="image-section services">
                  <div><h1>Estimate Time:<br />6 weeks</h1></div>
                  <div><h1>Average Price: <br />$3500</h1></div>
                  <div>
                    <h1>Process:</h1>
                    <div className="text-block-4">1. Briefing<br />2. Series Planning<br />3. Design & Development<br />4. Finalization</div>
                  </div>
                </div>
                <div className="text-section">
                  <h1>Series Design</h1>
                  <p className="margin-bottom-24px">Comprehensive design for a series of products or campaigns, ensuring visual consistency and brand alignment across all items.<br />‍<br />Includes templates, guidelines, and production-ready assets.</p>
                  <a data-w-id="series-design-quote" href="#" className="button-6 w-button">Get a quote</a>
                </div>
              </div>
            </div>
          </section>
          <div data-w-id="series-design-fade" className="fade-mn"></div>
        </section>
        {/* End Modal Popups: Series Design Popup */}

        {/* Modal Popups: App Design Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="app-design-popup">
          <section className="branding-hero w-clearfix">
            <div data-w-id="app-design-close" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container services">
              <div className="project-box services">
                <div className="image-section services">
                  <div><h1>Estimate Time:<br />8 weeks</h1></div>
                  <div><h1>Average Price: <br />$5000</h1></div>
                  <div>
                    <h1>Process:</h1>
                    <div className="text-block-4">1. Briefing<br />2. Wireframing<br />3. UI/UX Design<br />4. Prototyping<br />5. Handoff</div>
                  </div>
                </div>
                <div className="text-section">
                  <h1>App Design</h1>
                  <p className="margin-bottom-24px">Custom app design for iOS, Android, or web platforms. Includes user flows, wireframes, high-fidelity UI, and interactive prototypes.<br />‍<br />Ideal for startups, SaaS, and digital products.</p>
                  <a data-w-id="app-design-quote" href="#" className="button-6 w-button">Get a quote</a>
                </div>
              </div>
            </div>
          </section>
          <div data-w-id="app-design-fade" className="fade-mn"></div>
        </section>
        {/* End Modal Popups: App Design Popup */}

        {/* Modal Popups: Tech Consulting Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="tech-consulting-popup">
          <section className="branding-hero w-clearfix">
            <div data-w-id="tech-consulting-close" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container services">
              <div className="project-box services">
                <div className="image-section services">
                  <div><h1>Estimate Time:<br />2 weeks</h1></div>
                  <div><h1>Average Price: <br />$900</h1></div>
                  <div>
                    <h1>Process:</h1>
                    <div className="text-block-4">1. Discovery<br />2. Analysis<br />3. Recommendations<br />4. Implementation Plan</div>
                  </div>
                </div>
                <div className="text-section">
                  <h1>Tech Consulting</h1>
                  <p className="margin-bottom-24px">Expert technology consulting to help you choose the right tools, platforms, and strategies for your business.<br />‍<br />Includes actionable recommendations and a clear implementation roadmap.</p>
                  <a data-w-id="tech-consulting-quote" href="#" className="button-6 w-button">Get a quote</a>
                </div>
              </div>
            </div>
          </section>
          <div data-w-id="tech-consulting-fade" className="fade-mn"></div>
        </section>
        {/* End Modal Popups: Tech Consulting Popup */}

        {/* Modal Popups: Web Design Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="web-design-popup">
          <section className="branding-hero w-clearfix">
            <div data-w-id="web-design-close" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container services">
              <div className="project-box services">
                <div className="image-section services">
                  <div><h1>Estimate Time:<br />6 weeks</h1></div>
                  <div><h1>Average Price: <br />$4000</h1></div>
                  <div>
                    <h1>Process:</h1>
                    <div className="text-block-4">1. Briefing<br />2. Wireframing<br />3. UI/UX Design<br />4. Development<br />5. Launch</div>
                  </div>
                </div>
                <div className="text-section">
                  <h1>Web Design</h1>
                  <p className="margin-bottom-24px">Custom website design tailored to your brand and business goals. Includes responsive layouts, modern UI, and seamless user experience.<br />‍<br />Perfect for businesses, portfolios, and e-commerce.</p>
                  <a data-w-id="web-design-quote" href="#" className="button-6 w-button">Get a quote</a>
                </div>
              </div>
            </div>
          </section>
          <div data-w-id="web-design-fade" className="fade-mn"></div>
        </section>
        {/* End Modal Popups: Web Design Popup */}

        {/* Modal Popups: Testimonial Popup */}
        <section style={{ display: 'none', opacity: 0 }} className="testimonial-popup">
          <section className="branding-hero w-clearfix">
            <div data-w-id="testimonial-close" className="close-button">
              <img src="/images/plus.svg" loading="lazy" width={24} height={24} alt="" className="cross" />
            </div>
            <div className="project-container services">
              <div className="project-box services">
                <div className="image-section services">
                  <div><h1>Testimonials</h1></div>
                </div>
                <div className="text-section">
                  <h1>What Clients Say</h1>
                  <p className="margin-bottom-24px">Read what our clients have to say about working with us. Their feedback is our best endorsement and a testament to our commitment to quality and service.</p>
                  {/* You can add dynamic testimonial content here if needed */}
                </div>
              </div>
            </div>
          </section>
          <div data-w-id="testimonial-fade" className="fade-mn"></div>
        </section>
        {/* End Modal Popups: Testimonial Popup */}
      </div>
    </>
  );
} 