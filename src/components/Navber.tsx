import React from 'react'

export default function Navber() {
  return (
    <header className="bg-black text-white">
        <div className="container mx-auto flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Magazine</h1>
          <nav className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">Home</a>
            <a href="#" className="hover:text-gray-400">Archive</a>
            <a href="#" className="hover:text-gray-400">Category</a>
            <a href="#" className="hover:text-gray-400">About</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </nav>
        </div>
      </header>
  )
}
