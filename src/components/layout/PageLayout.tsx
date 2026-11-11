import type { ReactNode } from 'react'

interface PageLayoutProps {
  title: string
  children: ReactNode
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <main className="page">
      <h1>{title}</h1>
      {children}
    </main>
  )
}
