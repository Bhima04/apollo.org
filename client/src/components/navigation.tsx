import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Hexacomm
            </h1>
          </div>
          <div className="ml-6 flex space-x-8">
            <Link href="/dashboard">
              <a className={cn(
                "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                location === "/dashboard"
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}>
                About
              </a>
            </Link>
            <Link href="/posts">
              <a className={cn(
                "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                location === "/posts"
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}>
                Post
              </a>
            </Link>
            <Link href="/contact">
              <a className={cn(
                "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                location === "/contact"
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}>
                Contact
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}