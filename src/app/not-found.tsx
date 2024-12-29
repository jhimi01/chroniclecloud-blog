import Navbar from '@/components/Navber'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <section className={"h-screen "}>
      <div className="flex mt-20 flex-col items-center justify-center">
        <h2 className="text-6xl font-bold text-gray-800 mb-4">404</h2>
        <p className="text-xl text-gray-600 mb-8">
          Oops! Page not found.
        </p>
        <div>
            <Link href={'/'}>
          <Button>
            Go back home
          </Button>
            </Link>
        </div>
      </div>
    </section>
  )
}
