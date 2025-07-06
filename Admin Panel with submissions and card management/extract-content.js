// Extraction script for showcases and testimonials
// Usage: node extract-content.js
// Requires: npm install cheerio

import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPath = path.join(__dirname, 'dist', 'index.html');
const projectsDir = path.join(process.cwd(), 'content', 'projects');
const testimonialsDir = path.join(process.cwd(), 'content', 'testimonials');

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

function saveBase64Image(base64, slug) {
  const matches = base64.match(/^data:image\/(png|jpeg|jpg);base64,(.+)$/);
  if (!matches) return '';
  const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
  const data = matches[2];
  const hash = createHash('md5').update(data).digest('hex').slice(0,8);
  const filename = `${slug}-${hash}.${ext}`;
  const imagesDir = path.join(process.cwd(), 'images');
  ensureDir(imagesDir);
  const filePath = path.join(imagesDir, filename);
  fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
  return `images/${filename}`;
}

function extractShowcases($) {
  const showcases = [];
  const seenTitles = new Set();
  $('.showcase-carousel .case-container').each((i, el) => {
    const $el = $(el);
    const title = $el.find('.showcase-title').text().trim();
    if (!title || seenTitles.has(title.toLowerCase())) return;
    seenTitles.add(title.toLowerCase());
    const subtitle = $el.find('.showcase-subtitle').text().trim();
    const type = $el.attr('class').split(' ').find(c => c !== 'case-container' && c !== 'w-container');
    let popupSel = '';
    if (type && type !== 'w-container') {
      popupSel = `.${type}-popup`;
    } else if (title) {
      popupSel = `[class*="${title.toLowerCase().replace(/\s+/g, '-')}-popup"]`;
    }
    let image = '', link = '', description = '', video = '';
    if (popupSel && $(popupSel).length) {
      const $popup = $(popupSel);
      // Image: extract src (base64 or relative)
      const imgEl = $popup.find('.image-section img').first();
      if (imgEl.length) {
        const src = imgEl.attr('src') || '';
        if (src.startsWith('data:image')) {
          image = saveBase64Image(src, slugify(title));
        } else {
          image = src;
        }
      }
      // Description: extract HTML and preserve line breaks and links
      const descEl = $popup.find('.text-section, .text-section-tasker').first();
      if (descEl.length) {
        // Get the <p> content, preserve <a> as markdown links
        let descHtml = descEl.find('p').first().html() || '';
        descHtml = descHtml.replace(/<br\s*\/?>(\s*)/gi, '\n');
        // Convert <a href> to markdown links
        descHtml = descHtml.replace(/<a [^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)');
        // Remove any remaining HTML tags
        description = descHtml.replace(/<[^>]+>/g, '').replace(/\n+/g, '\n').trim();
      }
      // Link: from <a> in description
      const linkEl = descEl.find('a').first();
      if (linkEl.length) {
        link = linkEl.attr('href') && linkEl.attr('href') !== '#' ? linkEl.attr('href').trim() : linkEl.text().trim();
      }
      // Video
      const iframeEl = $popup.find('iframe').first();
      if (iframeEl.length) {
        video = iframeEl.attr('src') || '';
      }
    }
    showcases.push({
      title,
      subtitle,
      type,
      image,
      link,
      description,
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

function enrichExistingMarkdownFiles($) {
  const projectsDir = path.join(process.cwd(), 'content', 'projects');
  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));
  files.forEach(filename => {
    const filePath = path.join(projectsDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContents);
    const title = parsed.data.title;
    if (!title) return;
    // Find the corresponding showcase in the HTML
    const showcase = extractShowcases($).find(s => s.title.trim().toLowerCase() === title.trim().toLowerCase());
    if (!showcase) {
      console.warn(`No HTML showcase found for: ${title}`);
      return;
    }
    let updated = false;
    let updatedFields = [];
    let missingFields = [];
    // Update fields if missing/empty
    for (const key of ['subtitle','type','image','link','video']) {
      if (!parsed.data[key] || parsed.data[key] === '' || parsed.data[key] === '#') {
        if (showcase[key]) {
          parsed.data[key] = showcase[key];
          updated = true;
          updatedFields.push(key);
        } else {
          missingFields.push(key);
        }
      }
    }
    // Update body/content if empty
    if (!parsed.content.trim() && showcase.description) {
      parsed.content = showcase.description;
      updated = true;
      updatedFields.push('description');
    } else if (!parsed.content.trim()) {
      missingFields.push('description');
    }
    if (updated) {
      const newContent = matter.stringify(parsed.content, parsed.data);
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated ${filename}: ${updatedFields.join(', ')}`);
    }
    if (missingFields.length > 0) {
      console.warn(`Missing fields for ${filename}: ${missingFields.join(', ')}`);
    }
  });
}

function main() {
  ensureDir(projectsDir);
  ensureDir(testimonialsDir);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const $ = cheerio.load(html);

  // Extract showcases
  const showcases = extractShowcases($);
  let usedSlugs = new Set();
  showcases.forEach((showcase, i) => {
    let baseSlug = slugify(showcase.title) || `project-${i+1}`;
    let slug = baseSlug;
    let count = 2;
    while (usedSlugs.has(slug) || !slug) {
      slug = `${baseSlug}-${count++}`;
    }
    usedSlugs.add(slug);
    if (!showcase.title) {
      console.warn(`Skipping project at index ${i} due to missing title.`);
      return;
    }
    const frontmatter = {
      title: showcase.title,
      subtitle: showcase.subtitle,
      type: showcase.type,
      image: showcase.image,
      link: showcase.link,
      video: showcase.video
    };
    writeMarkdownFile(projectsDir, slug, frontmatter, showcase.description);
    console.log(`Extracted project: ${showcase.title} (slug: ${slug})`);
  });

  // Extract testimonials
  const testimonials = extractTestimonials($);
  let usedTestimonialSlugs = new Set();
  testimonials.forEach((testimonial, i) => {
    let baseSlug = slugify(testimonial.name) || `testimonial-${i+1}`;
    let slug = baseSlug;
    let count = 2;
    while (usedTestimonialSlugs.has(slug) || !slug) {
      slug = `${baseSlug}-${count++}`;
    }
    usedTestimonialSlugs.add(slug);
    if (!testimonial.name) {
      console.warn(`Skipping testimonial at index ${i} due to missing name.`);
      return;
    }
    const frontmatter = {
      name: testimonial.name,
      role: testimonial.role,
      image: testimonial.image
    };
    writeMarkdownFile(testimonialsDir, slug, frontmatter, testimonial.text);
    console.log(`Extracted testimonial: ${testimonial.name} (slug: ${slug})`);
  });

  enrichExistingMarkdownFiles($);
}

main(); 