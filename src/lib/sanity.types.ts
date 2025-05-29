export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  excerpt?: string
  body: any[] // Portable Text content
  categories?: Category[]
}
