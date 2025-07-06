import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getAllContent(folder) {
  const dir = path.join(process.cwd(), folder);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  return files.map(filename => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(dir, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { slug, data, content };
  });
} 