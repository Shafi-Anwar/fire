"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Account = () => {
  const { data: session } = useSession();
  const [userName, setUserName] = useState(session?.user?.name || "");
  const [userEmail, setUserEmail] = useState(session?.user?.email || "");
  const [userId, setUserId] = useState(session?.user?.id || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/api/users/${userId}`, {
        name: userName,
        email: userEmail,
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/users/${userId}`);
      signOut();
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-gray-200 p-4">
        <h1 className="text-3xl font-bold text-center">Account Settings</h1>
      </header>

      <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        {session ? (
          <>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 ${
                  loading ? "bg-gray-400" : "bg-blue-500"
                } text-white rounded-md hover:bg-blue-600`}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>

            <button
              onClick={handleDeleteAccount}
              disabled={loading}
              className={`mt-4 px-4 py-2 ${
                loading ? "bg-gray-400" : "bg-red-500"
              } text-white rounded-md hover:bg-red-600`}
            >
              {loading ? "Deleting..." : "Delete Account"}
            </button>
          </>
        ) : (
          <p className="text-center">
            You need to be signed in to access this page.
          </p>
        )}
      </main>
    </div>
  );
};

export default Account;
