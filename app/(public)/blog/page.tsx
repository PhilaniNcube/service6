import Image from "next/image"
import Link from "next/link"
import { Calendar, Tag, ArrowRight } from "lucide-react"
import { Route } from "next"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  color: string
  bgColor: string
  image: string
}

const blogPosts: BlogPost[] = [
  {
    slug: "south-africa-medical-tourism-2025",
    title: "Why South Africa Is One of the World's Best Medical Tourism Destinations in 2025",
    excerpt: "Discover why thousands of international patients choose South Africa for world-class surgery—from plastic and orthopedic surgery to cardiac, ENT, and dental care.",
    date: "2025-12-20",
    category: "Medical Tourism",
    readTime: "8 min read",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    image: "/images/blog/south-africa-medical-tourism.png",
  },
  {
    slug: "medical-tourism-insurance-guide",
    title: "ApexMed Medical Tourism Insurance Guide",
    excerpt: "Ensuring your safety, confidence, and peace of mind while receiving care abroad. Learn about essential insurance policies every medical tourist should have.",
    date: "2025-12-20",
    category: "Patient Guide",
    readTime: "6 min read",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    image: "/images/blog/medical-tourism-insurance.png",
  },
]

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance mb-6">
            ApexMed Blog
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto mb-10">
            Insights, guides, and the latest news in medical tourism and healthcare excellence.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}` as Route}
                className="group relative overflow-hidden rounded-2xl border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-6 flex flex-col grow">
                  {/* Category Badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${post.bgColor} mb-4 w-fit`}>
                    <Tag className={`h-3.5 w-3.5 ${post.color}`} />
                    <span className={`text-xs font-medium ${post.color}`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto">
                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Read More Link */}
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <span>Read Article</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
