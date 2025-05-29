import { groq } from 'next-sanity'

// Get all blog posts
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    categories[]-> {
      _id,
      title,
      slug
    }
  }
`

// Get a single blog post by slug
export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    categories[]-> {
      _id,
      title,
      slug
    }
  }
`

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }
`
