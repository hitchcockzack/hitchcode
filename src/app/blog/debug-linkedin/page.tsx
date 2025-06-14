import { Metadata } from 'next'

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://hitchcode.com'
  : 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Blog - Zack Hitchcock | Full-Stack Developer',
  description: 'Thoughts, insights, and stories from the intersection of technology and creativity. Regular articles on web development, automation, and digital innovation.',
  openGraph: {
    title: 'Blog - Zack Hitchcock | Full-Stack Developer',
    description: 'Thoughts, insights, and stories from the intersection of technology and creativity. Regular articles on web development, automation, and digital innovation.',
    url: `${baseUrl}/blog`,
    siteName: 'hitchcode',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-blog-default.png`,
        width: 1200,
        height: 630,
        alt: 'Blog - Zack Hitchcock | Full-Stack Developer & Digital Architect',
      }
    ],
  },
}

export default function LinkedInDebugPage() {
  const url = `${baseUrl}/blog`

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">LinkedIn Debug - Blog Page</h1>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">URL to Test</h2>
          <div className="font-mono text-sm bg-white p-2 rounded border">
            {url}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Expected OpenGraph Tags</h2>
          <div className="space-y-2">
            {[
              { property: 'og:title', content: 'Blog - Zack Hitchcock | Full-Stack Developer' },
              { property: 'og:description', content: 'Thoughts, insights, and stories from the intersection of technology and creativity. Regular articles on web development, automation, and digital innovation.' },
              { property: 'og:url', content: url },
              { property: 'og:site_name', content: 'hitchcode' },
              { property: 'og:locale', content: 'en_US' },
              { property: 'og:type', content: 'website' },
              { property: 'og:image', content: `${baseUrl}/og-blog-default.png` },
              { property: 'og:image:width', content: '1200' },
              { property: 'og:image:height', content: '630' },
              { property: 'og:image:type', content: 'image/png' },
            ].map((tag, index) => (
              <div key={index} className="font-mono text-sm bg-gray-50 p-2 rounded">
                <span className="text-blue-600">&lt;meta </span>
                <span className="text-green-600">property="{tag.property}"</span>
                <span className="text-purple-600"> content="{tag.content}"</span>
                <span className="text-blue-600"> /&gt;</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">LinkedIn Testing Tools</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">LinkedIn Post Inspector:</h3>
              <a
                href={`https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Test this URL on LinkedIn Inspector
              </a>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Alternative Testing:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>1. Copy this URL: <code className="bg-gray-100 px-1 rounded">{url}</code></p>
                <p>2. Go to LinkedIn and paste it in a new post</p>
                <p>3. Check if the preview appears correctly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
