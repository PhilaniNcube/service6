import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.apexmedsa.co.za'

  const routes = [
    '',
    '/blog',
    '/meet-our-team',
    '/treatments',
    '/faqs',
    '/accommodation',
    '/blog/affordable-ivf-treatment-packages-south-africa',
    '/blog/knee-and-hip-replacement-surgeries-south-africa',
    '/blog/south-africa-medical-tourism-2025',
    '/blog/medical-tourism-insurance-guide',
    '/treatments/bariatric-surgery',
    '/treatments/cardiac-surgery',
    '/treatments/colorectal-surgery',
    '/treatments/cosmetic-plastic-surgery',
    '/treatments/dental-maxillofacial',
    '/treatments/ent',
    '/treatments/general-surgery',
    '/treatments/hpb-surgery',
    '/treatments/neurosurgery',
    '/treatments/obstetrics-gynaecology',
    '/treatments/ophthalmology',
    '/treatments/orthopaedics',
    '/treatments/paediatric-surgery',
    '/treatments/surgical-oncology',
    '/treatments/thoracic-surgery',
    '/treatments/urology',
    '/treatments/vascular-surgery',
  ]

  return routes.map((route) => {
    const url = `${baseUrl}${route}`
    const isHomePage = route === ''
    const isTreatmentsPage = route === '/treatments'
    const isTreatmentDetail = route.startsWith('/treatments/')
    const isBlogPage = route === '/blog'
    const isBlogPost = route.startsWith('/blog/')

    let priority = 0.5
    let changeFrequency: 'yearly' | 'monthly' | 'weekly' | 'always' | 'hourly' | 'daily' | 'never' = 'monthly'

    if (isHomePage) {
      priority = 1.0
      changeFrequency = 'yearly'
    } else if (isTreatmentsPage) {
      priority = 0.9
      changeFrequency = 'monthly'
    } else if (isTreatmentDetail) {
      priority = 0.8
      changeFrequency = 'monthly'
    } else if (isBlogPage) {
      priority = 0.8
      changeFrequency = 'weekly'
    } else if (isBlogPost) {
      priority = 0.7
      changeFrequency = 'monthly'
    } else if (route === '/meet-our-team') {
      priority = 0.7
      changeFrequency = 'monthly'
    }

    return {
      url,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }
  })
}
