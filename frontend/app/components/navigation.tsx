import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 p-4">
      <ul className="flex justify-end space-x-4">
        <li>
          <Link href="/resume" className="text-white hover:text-gray-300">
            Resume
          </Link>
        </li>
        <li>
          <Link href="/writings" className="text-white hover:text-gray-300">
            Writings
          </Link>
        </li>
      </ul>
    </nav>
  )
}

