'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
    <div
      className={`group relative bg-white rounded-2xl p-8
        overflow-hidden cursor-pointer
        shadow-[0_4px_24px_rgba(0,0,0,0.06)]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]
        hover:-translate-y-1
        transition-all duration-300 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* SVG bordo animato */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          rx="15"
          ry="15"
          fill="none"
          stroke="#00AEEF"
          strokeWidth="2"
          strokeDasharray="0 1000"
          style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }}
          className="transition-all duration-700 ease-in-out group-hover:[stroke-dasharray:1000_0]"
        />
      </svg>

      {children}
    </div>
  )
}
