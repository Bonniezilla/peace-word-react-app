import Link from "next/link"

export default function Header() {
    return (
        <div className="flex w-screen fixed top-0 bg-gray-600/50 backdrop-blur-md h-16
        items-center justify-end px-4">
            <ul>
                <li><Link href="/signin"
                    className='flex font-bold text-gray-300 bg-blue-600 
                    items-center justify-center p-4 rounded-md h-12
                    hover:bg-white hover:text-black duration-300'
                    >Sign In</Link></li>
            </ul>
        </div>
    )
}