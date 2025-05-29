# Blog Setup Guide

This guide will help you set up the blog functionality for your hitchcode app using Sanity CMS.

## 📋 Prerequisites

- Sanity project already created (Project ID: `911v1u0d`)
- Environment variables already configured in `.env.local`

## 🚀 Quick Setup

### 1. Sanity Studio Setup

You'll need to set up a Sanity Studio to manage your blog content. Here are two options:

#### Option A: Create a separate Sanity Studio project

1. Create a new directory for your Sanity Studio:
```bash
mkdir hitchcode-studio
cd hitchcode-studio
npm create sanity@latest
```

2. When prompted:
   - Choose "Yes" to reconfigure the project
   - Use project ID: `911v1u0d`
   - Choose dataset: `production`
   - Choose "Y" to use TypeScript
   - Choose "Clean project with no predefined schemas"

3. Replace the content of `schemas/index.ts` with:
```typescript
import {type SchemaTypeDefinition} from 'sanity'
import post from './post'
import category from './category'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [post, category],
}
```

4. Copy the schema files from `sanity-schema/schemas/` in your main project to the Studio's `schemas/` directory.

#### Option B: Use Sanity Studio in your existing project

1. Install Sanity Studio dependencies:
```bash
npm install sanity @sanity/vision
```

2. Create a `sanity.config.ts` file in your project root:
```typescript
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity-schema/schemas'

export default defineConfig({
  name: 'hitchcode',
  title: 'Hitchcode Blog',
  projectId: '911v1u0d',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
```

### 2. Environment Variables

Your `.env.local` should contain:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID="911v1u0d"
NEXT_PUBLIC_SANITY_DATASET="production"
```

Optional (for better performance):
```env
SANITY_API_READ_TOKEN="your_read_token_here"
```

To get a read token:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API settings
4. Add a new token with "Viewer" permissions

### 3. Schema Files

The schema files are already created in `sanity-schema/schemas/`:
- `post.js` - Blog post schema
- `category.js` - Category schema
- `index.js` - Schema exports

### 4. Access Your Studio

#### If using separate Studio:
```bash
cd hitchcode-studio
npm run dev
```
Visit `http://localhost:3333`

#### If using embedded Studio:
Add this route to your Next.js app:

Create `src/app/studio/[[...index]]/page.tsx`:
```typescript
import {Studio} from 'sanity'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <Studio config={config} />
}
```

Visit `http://localhost:3000/studio`

## 📝 Creating Content

### Categories (Optional)
1. Go to your Sanity Studio
2. Create categories like:
   - Technology
   - Development
   - Design
   - Personal

### Blog Posts
1. Create a new blog post
2. Fill in:
   - **Title**: Your blog post title
   - **Slug**: Auto-generated from title (or customize)
   - **Published at**: Publication date/time
   - **Excerpt**: Short description for blog listing
   - **Body**: Your blog content (supports rich text)
   - **Categories**: Select from created categories (optional)

## 🎨 Features

### Blog Listing Page (`/blog`)
- Modern, responsive design
- Featured post (first post is larger)
- Category tags
- Publication dates
- Responsive grid layout

### Individual Blog Posts (`/blog/[slug]`)
- Beautiful typography
- Mobile-responsive
- Rich text content with:
  - Headings (H1, H2, H3)
  - Paragraphs
  - Lists (bulleted and numbered)
  - Blockquotes
  - Links
  - Bold and italic text
- Category display
- Navigation back to blog

### Responsive Design
- Optimized for mobile and desktop
- Clean, modern aesthetic
- Smooth animations and transitions
- Excellent readability

## 🛠 Customization

### Styling
All components use Tailwind CSS and are fully customizable. Key files:
- `src/app/blog/page.tsx` - Blog listing page
- `src/app/blog/[slug]/page.tsx` - Individual blog post page

### Content Types
To modify the blog schema:
1. Edit `sanity-schema/schemas/post.js`
2. Update TypeScript types in `src/lib/sanity.types.ts`
3. Update queries in `src/lib/sanity.queries.ts`

## 🚀 Going Live

1. Deploy your Sanity Studio (if using separate):
```bash
cd hitchcode-studio
npm run build
npm run deploy
```

2. Your Next.js blog pages will automatically be available at:
   - `/blog` - Blog listing
   - `/blog/[slug]` - Individual posts

## 📚 Next Steps

1. Set up your Sanity Studio
2. Create some categories
3. Write your first blog post
4. Share your amazing content!

The blog is designed to be immediately shareable and impressive. The clean design and excellent mobile experience will make readers want to share your content right away.
