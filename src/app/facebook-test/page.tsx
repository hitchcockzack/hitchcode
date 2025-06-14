import { Metadata } from 'next'

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://hitchcode.com'
  : 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Facebook Test - Zack Hitchcock | Full-Stack Developer',
  description: 'Test page for Facebook Open Graph metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.',

  // Core meta tags
  metadataBase: new URL(baseUrl),

  // Open Graph optimized for Facebook
  openGraph: {
    title: 'Facebook Test - Zack Hitchcock | Full-Stack Developer',
    description: 'Test page for Facebook Open Graph metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.',
    url: `${baseUrl}/facebook-test`,
    siteName: 'hitchcode',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-blog-default.png`,
        width: 1200,
        height: 630,
        alt: 'Facebook Test - Zack Hitchcock | Full-Stack Developer',
        type: 'image/png'
      }
    ],
  },

  // Facebook-specific metadata in other tags
  other: {
    // Essential Facebook meta tags
    'author': 'Zack Hitchcock',
    'fb:admins': 'Zack Hitchcock',
    'fb:app_id': '', // Add if you have a Facebook app

    // Complete Open Graph set for Facebook
    'og:site_name': 'hitchcode',
    'og:locale': 'en_US',
    'og:type': 'website',
    'og:title': 'Facebook Test - Zack Hitchcock | Full-Stack Developer',
    'og:description': 'Test page for Facebook Open Graph metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.',
    'og:url': `${baseUrl}/facebook-test`,
    'og:image': `${baseUrl}/og-blog-default.png`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/png',
    'og:image:alt': 'Facebook Test - Zack Hitchcock | Full-Stack Developer',
    'og:image:secure_url': `${baseUrl}/og-blog-default.png`,

    // Additional Facebook-specific properties
    'og:updated_time': new Date().toISOString(),

    // Twitter fallbacks
    'twitter:card': 'summary_large_image',
    'twitter:site': '@hitchcode',
    'twitter:creator': '@hitchcode',
    'twitter:title': 'Facebook Test - Zack Hitchcock | Full-Stack Developer',
    'twitter:description': 'Test page for Facebook Open Graph metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.',
    'twitter:image': `${baseUrl}/og-blog-default.png`,

    // Additional metadata
    'content-type': 'text/html; charset=utf-8',
    'content-language': 'en',
    'robots': 'index, follow',
  },
}

export default function FacebookTestPage() {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Facebook Open Graph Test Page</h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Test Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Copy this page URL: <code className="bg-blue-100 px-2 py-1 rounded">{baseUrl}/facebook-test</code></li>
            <li>Open <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener noreferrer" className="underline font-medium">Facebook Sharing Debugger</a></li>
            <li>Paste the URL and click "Debug"</li>
            <li>Click "Scrape Again" to refresh Facebook's cache</li>
            <li>Verify the preview shows correctly</li>
            <li>If it works here, try sharing a blog post URL</li>
          </ol>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Expected Metadata</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Title:</strong> Facebook Test - Zack Hitchcock | Full-Stack Developer</p>
            <p><strong>Description:</strong> Test page for Facebook Open Graph metadata validation. Ensuring proper social media previews for hitchcode.com blog posts.</p>
            <p><strong>Image:</strong> {baseUrl}/og-blog-default.png (1200x630)</p>
            <p><strong>URL:</strong> {baseUrl}/facebook-test</p>
            <p><strong>Site Name:</strong> hitchcode</p>
            <p><strong>Type:</strong> website</p>
            <p><strong>Locale:</strong> en_US</p>
          </div>
        </div>

        <div className="bg-blue-800 text-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Test Links</h2>
          <div className="space-y-3">
            <div>
              <p className="mb-2">Direct Facebook sharing test:</p>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${baseUrl}/facebook-test`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors"
              >
                Share on Facebook
              </a>
            </div>
            <div>
              <p className="mb-2">Facebook Sharing Debugger:</p>
              <a
                href="https://developers.facebook.com/tools/debug/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Open Sharing Debugger
              </a>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-900">Debug Information</h2>
          <p className="text-green-800 mb-4">
            This page contains comprehensive Facebook Open Graph metadata including:
          </p>
          <ul className="list-disc list-inside space-y-1 text-green-700">
            <li>Complete Open Graph protocol tags</li>
            <li>Facebook-specific metadata</li>
            <li>Proper image dimensions (1200x630)</li>
            <li>Absolute URLs and secure URLs</li>
            <li>Site name and locale specifications</li>
            <li>Updated timestamp for cache management</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-900">⚠️ Troubleshooting Tips</h2>
          <ul className="list-disc list-inside space-y-1 text-yellow-800">
            <li>Facebook caches Open Graph data. Use the Sharing Debugger to refresh.</li>
            <li>Ensure the image URL is publicly accessible.</li>
            <li>Image should be at least 1200x630 pixels for best results.</li>
            <li>Use absolute URLs (starting with https://).</li>
            <li>Check that robots.txt allows Facebookexternalhit.</li>
            <li>Verify the og:image tag appears in the page source.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
