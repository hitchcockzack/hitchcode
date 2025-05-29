export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  excerpt?: string
  body: any[] // PortableText array
  categories?: Category[]
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
}
