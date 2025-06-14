import { Metadata } from 'next'

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://hitchcode.com'
  : 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Twitter Test - Zack Hitchcock | Full-Stack Developer',
  description: 'Test page for Twitter Card metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.',

  // Core meta tags
  metadataBase: new URL(baseUrl),

  // Open Graph for general social media
  openGraph: {
    title: 'Twitter Test - Zack Hitchcock | Full-Stack Developer',
    description: 'Test page for Twitter Card metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.',
    url: `${baseUrl}/twitter-test`,
    siteName: 'hitchcode',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-blog-default.png`,
        width: 1200,
        height: 630,
        alt: 'Twitter Test - Zack Hitchcock | Full-Stack Developer',
        type: 'image/png'
      }
    ],
  },

  // Twitter Card optimized
  twitter: {
    card: 'summary_large_image',
    site: '@hitchcode',
    creator: '@hitchcode',
    title: 'Twitter Test - Zack Hitchcock | Full-Stack Developer',
    description: 'Test page for Twitter Card metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.',
    images: [
      {
        url: `${baseUrl}/og-blog-default.png`,
        alt: 'Twitter Test - Zack Hitchcock | Full-Stack Developer',
        width: 1200,
        height: 630,
      }
    ],
  },

  // Twitter-specific metadata in other tags
  other: {
    // Essential Twitter meta tags
    'author': 'Zack Hitchcock',

    // Complete Twitter Card set
    'twitter:card': 'summary_large_image',
    'twitter:site': '@hitchcode',
    'twitter:creator': '@hitchcode',
    'twitter:title': 'Twitter Test - Zack Hitchcock | Full-Stack Developer',
    'twitter:description': 'Test page for Twitter Card metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.',
    'twitter:image': `${baseUrl}/og-blog-default.png`,
    'twitter:image:alt': 'Twitter Test - Zack Hitchcock | Full-Stack Developer',
    'twitter:image:width': '1200',
    'twitter:image:height': '630',
    'twitter:domain': 'hitchcode.com',
    'twitter:url': `${baseUrl}/twitter-test`,

    // Open Graph fallbacks
    'og:site_name': 'hitchcode',
    'og:locale': 'en_US',
    'og:type': 'website',
    'og:title': 'Twitter Test - Zack Hitchcock | Full-Stack Developer',
    'og:description': 'Test page for Twitter Card metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.',
    'og:url': `${baseUrl}/twitter-test`,
    'og:image': `${baseUrl}/og-blog-default.png`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/png',
    'og:image:alt': 'Twitter Test - Zack Hitchcock | Full-Stack Developer',

    // Additional metadata
    'content-type': 'text/html; charset=utf-8',
    'content-language': 'en',
    'robots': 'index, follow',
  },
}

export default function TwitterTestPage() {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Twitter Card Test Page</h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Test Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Copy this page URL: <code className="bg-blue-100 px-2 py-1 rounded">{baseUrl}/twitter-test</code></li>
            <li>Open <a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener noreferrer" className="underline font-medium">Twitter Card Validator</a></li>
            <li>Paste the URL and click "Preview card"</li>
            <li>Verify the preview shows correctly</li>
            <li>If it works here, try sharing a blog post URL</li>
            <li>Test actual sharing on Twitter/X platform</li>
          </ol>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Expected Metadata</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Card Type:</strong> summary_large_image</p>
            <p><strong>Title:</strong> Twitter Test - Zack Hitchcock | Full-Stack Developer</p>
            <p><strong>Description:</strong> Test page for Twitter Card metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.</p>
            <p><strong>Image:</strong> {baseUrl}/og-blog-default.png (1200x630)</p>
            <p><strong>Site:</strong> @hitchcode</p>
            <p><strong>Creator:</strong> @hitchcode</p>
          </div>
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-sky-900">Quick Test Links</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sky-800 mb-2">Direct Twitter sharing test:</p>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${baseUrl}/twitter-test`)}&text=${encodeURIComponent('Testing Twitter Cards for hitchcode.com')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition-colors"
              >
                Share on Twitter
              </a>
            </div>
            <div>
              <p className="text-sky-800 mb-2">Twitter Card Validator:</p>
              <a
                href="https://cards-dev.twitter.com/validator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition-colors"
              >
                Open Card Validator
              </a>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-900">Debug Information</h2>
          <p className="text-green-800 mb-4">
            This page contains comprehensive Twitter Card metadata including:
          </p>
          <ul className="list-disc list-inside space-y-1 text-green-700">
            <li>Twitter Card type: summary_large_image</li>
            <li>Twitter site and creator handles</li>
            <li>Proper image dimensions (1200x630)</li>
            <li>Absolute URLs</li>
            <li>Open Graph fallbacks</li>
            <li>Domain and URL specifications</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
