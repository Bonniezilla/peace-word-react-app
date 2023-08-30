import Link from "next/link";

export default function Header() {
    return (
        <div className="flex w-screen fixed h-16 items-center top-0 bg-gray-500/50 backdrop-blur-lg">
            <Link href="/signin"
             className="flex items-center justify-center
             bg-blue-600 text-gray-200 p-4 rounded-md h-10
             hover:text-black hover:bg-white duration-300"
             >Sigin</Link>
        </div>
    )
}