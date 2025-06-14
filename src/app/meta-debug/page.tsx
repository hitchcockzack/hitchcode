import { Metadata } from 'next'

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://hitchcode.com'
  : 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Meta Tags Debug - hitchcode',
  description: 'Debug page to inspect meta tags for social media previews.',
}

export default function MetaDebugPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Meta Tags Debug Tool</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Current Page URLs */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Test URLs</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Blog Page:</h3>
                <code className="text-sm bg-gray-100 p-2 rounded block break-all">
                  {baseUrl}/blog
                </code>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Sample Blog Post:</h3>
                <code className="text-sm bg-gray-100 p-2 rounded block break-all">
                  {baseUrl}/blog/your-blog-post-slug
                </code>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">LinkedIn Test Page:</h3>
                <code className="text-sm bg-gray-100 p-2 rounded block break-all">
                  {baseUrl}/linkedin-test
                </code>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Twitter Test Page:</h3>
                <code className="text-sm bg-gray-100 p-2 rounded block break-all">
                  {baseUrl}/twitter-test
                </code>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Facebook Test Page:</h3>
                <code className="text-sm bg-gray-100 p-2 rounded block break-all">
                  {baseUrl}/facebook-test
                </code>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Home Page:</h3>
                <code className="text-sm bg-gray-100 p-2 rounded block break-all">
                  {baseUrl}
                </code>
              </div>
            </div>
          </div>

          {/* Testing Tools */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Testing Tools</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">LinkedIn Post Inspector:</h3>
                <a
                  href="https://www.linkedin.com/post-inspector/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mr-3"
                >
                  Open LinkedIn Inspector
                </a>
                <a
                  href="/linkedin-test"
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  LinkedIn Test Page
                </a>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Twitter Card Validator:</h3>
                <a
                  href="https://cards-dev.twitter.com/validator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition-colors mr-3"
                >
                  Open Twitter Validator
                </a>
                <a
                  href="/twitter-test"
                  className="inline-block bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition-colors"
                >
                  Twitter Test Page
                </a>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Facebook Sharing Debugger:</h3>
                <a
                  href="https://developers.facebook.com/tools/debug/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors mr-3"
                >
                  Open Facebook Debugger
                </a>
                <a
                  href="/facebook-test"
                  className="inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                >
                  Facebook Test Page
                </a>
              </div>
            </div>
          </div>

          {/* Meta Tags Check */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Expected Meta Tags</h2>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-medium text-gray-700 mb-2">For {baseUrl}/blog:</h3>
              <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
{`<!-- OpenGraph Tags -->
<meta property="og:title" content="Blog - Zack Hitchcock | Full-Stack Developer" />
<meta property="og:description" content="Thoughts, insights, and stories from the intersection of technology and creativity. Regular articles on web development, automation, and digital innovation." />
<meta property="og:url" content="${baseUrl}/blog" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="hitchcode" />
<meta property="og:image" content="${baseUrl}/og-blog-default.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
<meta property="og:locale" content="en_US" />

<!-- Twitter Card Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@hitchcode" />
<meta name="twitter:creator" content="@hitchcode" />
<meta name="twitter:title" content="Blog - Zack Hitchcock | Full-Stack Developer" />
<meta name="twitter:description" content="Thoughts, insights, and stories from the intersection of technology and creativity. Regular articles on web development, automation, and digital innovation." />
<meta name="twitter:image" content="${baseUrl}/og-blog-default.png" />
<meta name="twitter:image:alt" content="Blog - Zack Hitchcock | Full-Stack Developer & Digital Architect" />

<!-- LinkedIn Specific -->
<meta name="linkedin:owner" content="Zack Hitchcock" />
<meta property="article:author" content="Zack Hitchcock" />
<meta name="author" content="Zack Hitchcock" />
<meta name="robots" content="index, follow" />`}
              </pre>
            </div>
          </div>

          {/* Troubleshooting Guide */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Troubleshooting Checklist</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">LinkedIn Issues:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Check LinkedIn Post Inspector shows correct metadata</li>
                  <li>• Ensure image is exactly 1200x630 pixels</li>
                  <li>• Verify absolute URLs (https://)</li>
                  <li>• Clear LinkedIn cache using Post Inspector</li>
                  <li>• Check if "Cannot display preview" error appears</li>
                  <li>• Test with LinkedIn-specific test page</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Twitter Issues:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Verify twitter:card meta tag is present</li>
                  <li>• Check Twitter Card Validator shows preview</li>
                  <li>• Ensure image meets Twitter requirements</li>
                  <li>• Verify @hitchcode Twitter account exists</li>
                  <li>• Test with both summary and summary_large_image</li>
                  <li>• Clear Twitter cache using Card Validator</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
