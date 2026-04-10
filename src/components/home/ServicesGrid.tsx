'use client'

import dynamic from 'next/dynamic'

const ServicesGridClient = dynamic(
  () => import('./ServicesGridClient'),
  { ssr: false }
)

export default function ServicesGrid() {
  return <ServicesGridClient />
}
