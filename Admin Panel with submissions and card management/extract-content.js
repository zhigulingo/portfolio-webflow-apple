// Extraction script for showcases and testimonials
// Usage: node extract-content.js
// Requires: npm install cheerio

import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const htmlPath = path.join('dist', 'index.html');
const projectsDir = path.join('content', 'projects');
const testimonialsDir = path.join('content', 'testimonials');

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function writeMarkdownFile(dir, slug, frontmatter, body) {
  const content = `---\n${Object.entries(frontmatter)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n')}\n---\n\n${body}\n`;
  fs.writeFileSync(path.join(dir, `${slug}.md`), content, 'utf8');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function extractShowcases($) {
  const showcases = [];
  $('.showcase-carousel .case-container').each((i, el) => {
    const $el = $(el);
    const title = $el.find('.showcase-title').text().trim();
    const subtitle = $el.find('.showcase-subtitle').text().trim();
    const type = $el.attr('class').split(' ').find(c => c !== 'w-layout-blockcontainer' && c !== 'case-container' && c !== 'w-container');
    // Try to find popup section for more details
    let popupSelector = `.${type}-popup`;
    let description = '';
    let image = '';
    let link = '';
    let video = '';
    if (type) {
      const popup = $(popupSelector);
      if (popup.length) {
        description = popup.find('.text-section p, .text-section-tasker p').first().text().trim();
        // Try to get image from .image-section img
        const img = popup.find('.image-section img').first();
        if (img.length) {
          let src = img.attr('src') || '';
          if (src.startsWith('data:image')) src = '';
          image = src;
        }
        // Try to get link
        const a = popup.find('.text-section a, .text-section-tasker a').first();
        if (a.length) link = a.attr('href');
        // Try to get video iframe
        const iframe = popup.find('iframe').first();
        if (iframe.length) video = iframe.attr('src');
      }
    }
    showcases.push({
      title,
      subtitle,
      type,
      description,
      image,
      link,
      video
    });
  });
  return showcases;
}

function extractTestimonials($) {
  const testimonials = [];
  $('.testimonials .review-card').each((i, el) => {
    const $el = $(el);
    const name = $el.find('.heading.review-card').text().trim();
    const role = $el.find('.text-block-2').text().trim();
    const text = $el.find('.paragraph').text().trim();
    let image = $el.find('.persona img').attr('src') || '';
    if (image.startsWith('data:image')) image = '';
    testimonials.push({
      name,
      role,
      text,
      image
    });
  });
  return testimonials;
}

function main() {
  ensureDir(projectsDir);
  ensureDir(testimonialsDir);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const $ = cheerio.load(html);

  // Extract showcases
  const showcases = extractShowcases($);
  showcases.forEach(showcase => {
    const slug = slugify(showcase.title);
    const frontmatter = {
      title: showcase.title,
      subtitle: showcase.subtitle,
      type: showcase.type,
      image: showcase.image,
      link: showcase.link,
      video: showcase.video
    };
    writeMarkdownFile(projectsDir, slug, frontmatter, showcase.description);
    console.log(`Extracted project: ${showcase.title}`);
  });

  // Extract testimonials
  const testimonials = extractTestimonials($);
  testimonials.forEach(testimonial => {
    const slug = slugify(testimonial.name);
    const frontmatter = {
      name: testimonial.name,
      role: testimonial.role,
      image: testimonial.image
    };
    writeMarkdownFile(testimonialsDir, slug, frontmatter, testimonial.text);
    console.log(`Extracted testimonial: ${testimonial.name}`);
  });
}

main(); 