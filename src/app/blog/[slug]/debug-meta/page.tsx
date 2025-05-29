import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { Post } from '@/lib/sanity.types'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    categories[]->{
      _id,
      title,
      slug
    }
  }`

  return await client.fetch(query, { slug })
}

export default async function DebugMeta({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const title = `${post.title} - Zack Hitchcock`
  const description = post.excerpt || `Read "${post.title}" by Zack Hitchcock - Full-Stack Developer & Digital Architect`
  const url = `https://hitchcode.com/blog/${post.slug.current}`
  const imageUrl = `https://hitchcode.com/og-blog-default.png`

  const metaTags = [
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: 'Zack Hitchcock - Full-Stack Developer' },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: `${post.title} - Blog post by Zack Hitchcock` },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'article:published_time', content: post.publishedAt },
    { property: 'article:author', content: 'Zack Hitchcock' },
    { property: 'article:section', content: 'Technology' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@hitchcode' },
    { name: 'twitter:creator', content: '@hitchcode' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Metadata Debug - {post.title}</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Social Media Preview</h2>
          <div className="border rounded-lg p-4 bg-gray-50">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full max-w-md rounded mb-4"
              onError={(e) => {
                (e.target as HTMLImageElement).style.border = '2px dashed red'
                ;(e.target as HTMLImageElement).alt = 'Image failed to load'
              }}
            />
            <h3 className="font-bold text-lg text-blue-600">{title}</h3>
            <p className="text-gray-600 mt-2">{description}</p>
            <p className="text-green-600 text-sm mt-2">{url}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Meta Tags</h2>
          <div className="space-y-2">
            {metaTags.map((tag, index) => (
              <div key={index} className="font-mono text-sm bg-gray-50 p-2 rounded">
                <span className="text-blue-600">&lt;meta </span>
                {tag.property && <span className="text-green-600">property="{tag.property}"</span>}
                {tag.name && <span className="text-green-600">name="{tag.name}"</span>}
                <span className="text-purple-600"> content="{tag.content}"</span>
                <span className="text-blue-600"> /&gt;</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Testing Tools</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Facebook Sharing Debugger:</h3>
              <a
                href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Test on Facebook Debugger
              </a>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">LinkedIn Post Inspector:</h3>
              <a
                href={`https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Test on LinkedIn Inspector
              </a>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Twitter Card Validator:</h3>
              <a
                href={`https://cards-dev.twitter.com/validator`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Test on Twitter Validator
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
