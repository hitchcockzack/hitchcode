import { Metadata } from 'next'

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://hitchcode.com'
  : 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'LinkedIn Test - Zack Hitchcock | Full-Stack Developer',
  description: 'Test page for LinkedIn Open Graph metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.',

  // Core meta tags
  metadataBase: new URL(baseUrl),

  // Open Graph optimized for LinkedIn
  openGraph: {
    title: 'LinkedIn Test - Zack Hitchcock | Full-Stack Developer',
    description: 'Test page for LinkedIn Open Graph metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.',
    url: `${baseUrl}/linkedin-test`,
    siteName: 'hitchcode',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-blog-default.png`,
        width: 1200,
        height: 630,
        alt: 'LinkedIn Test - Zack Hitchcock | Full-Stack Developer',
        type: 'image/png'
      }
    ],
  },

  // LinkedIn-specific metadata in other tags
  other: {
    // Essential LinkedIn meta tags
    'author': 'Zack Hitchcock',
    'linkedin:owner': 'Zack Hitchcock',

    // Complete Open Graph set for LinkedIn
    'og:site_name': 'hitchcode',
    'og:locale': 'en_US',
    'og:type': 'website',
    'og:title': 'LinkedIn Test - Zack Hitchcock | Full-Stack Developer',
    'og:description': 'Test page for LinkedIn Open Graph metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.',
    'og:url': `${baseUrl}/linkedin-test`,
    'og:image': `${baseUrl}/og-blog-default.png`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/png',
    'og:image:alt': 'LinkedIn Test - Zack Hitchcock | Full-Stack Developer',
    'og:image:secure_url': `${baseUrl}/og-blog-default.png`,

    // Additional metadata that LinkedIn looks for
    'content-type': 'text/html; charset=utf-8',
    'content-language': 'en',
    'robots': 'index, follow',
    'revisit-after': '7 days',
  },
}

export default function LinkedInTestPage() {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">LinkedIn Metadata Test Page</h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Test Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Copy this page URL: <code className="bg-blue-100 px-2 py-1 rounded">{baseUrl}/linkedin-test</code></li>
            <li>Open <a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener noreferrer" className="underline font-medium">LinkedIn Post Inspector</a></li>
            <li>Paste the URL and click "Inspect"</li>
            <li>Verify the preview shows correctly</li>
            <li>If it works here, try sharing a blog post URL</li>
          </ol>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Expected Metadata</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Title:</strong> LinkedIn Test - Zack Hitchcock | Full-Stack Developer</p>
            <p><strong>Description:</strong> Test page for LinkedIn Open Graph metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.</p>
            <p><strong>Image:</strong> {baseUrl}/og-blog-default.png (1200x630)</p>
            <p><strong>URL:</strong> {baseUrl}/linkedin-test</p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-900">Debug Information</h2>
          <p className="text-green-800 mb-4">
            This page contains comprehensive LinkedIn-optimized metadata including:
          </p>
          <ul className="list-disc list-inside space-y-1 text-green-700">
            <li>Complete Open Graph tags</li>
            <li>LinkedIn-specific metadata</li>
            <li>Proper image dimensions (1200x630)</li>
            <li>Absolute URLs</li>
            <li>Secure image URLs</li>
            <li>Content type and language declarations</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
