"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const UserAvatar = ({ user }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
      >
        <Image
          src={user?.image || "/default-avatar.png"}
          alt="User Avatar"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full"
        />
        <span className="text-lg font-semibold">{user?.name || "User"}</span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <div className="py-2">
            <Link
              href="/account"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
              onClick={() => setDropdownOpen(false)}
            >
              Manage Account
            </Link>
            <button
              onClick={() => signOut()}
              className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg text-left"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
