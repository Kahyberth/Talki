import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAvatar } from "@/contexts/AvatarContext";

interface UserConfigProps {
  onClose: () => void;
}

export function UserConfig({ onClose }: UserConfigProps) {
  const [email, setEmail] = useState("user@example.com");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const { avatarUrl, generateAvatar } = useAvatar();

  const handleAvatarChange = () => {
    const newSeed = Math.random().toString(36).substring(2, 8);
    generateAvatar(newSeed);
  };

  const handleSaveEmail = () => {
    console.log("Email saved:", email);
    setIsEditingEmail(false);
  };

  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  return (
    <div className="p-6 max-w-lg mx-auto bg-[#2B2D31] rounded-lg shadow-lg relative text-white">
      {/* Title and Close Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Settings</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center gap-4 mb-6">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full border border-gray-300" />
        ) : (
          <p>No tienes un avatar. ¡Genera uno ahora!</p>
        )}
        <button
          onClick={handleAvatarChange}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Generar Nuevo Avatar
        </button>
      </div>
      <Separator />

      {/* Email Section */}
      <div className="my-6">
        <h3 className="text-lg font-semibold mb-2">Email</h3>
        <div className="flex items-center gap-2 relative">
          <Input
            type="email"
            value={email}
            disabled={!isEditingEmail}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-[#1E1F22] text-white border-none focus:ring-blue-500"
          />
          <button
            onClick={() => setIsEditingEmail(!isEditingEmail)}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.414 2.586a2 2 0 010 2.828l-8.414 8.414a2 2 0 01-.828.486l-3 1a1 1 0 01-1.27-1.27l1-3a2 2 0 01.486-.828l8.414-8.414a2 2 0 012.828 0zm-1.414 4L11 3.586 14.414 7 16 5.414zM9 11l-2 2 1.586 1.586 2-2L9 11zm-3 5H4v-1l3-3 1 1-3 3z" />
            </svg>
          </button>
        </div>
        {isEditingEmail && (
          <Button
            onClick={handleSaveEmail}
            className="mt-2 bg-green-500 hover:bg-green-600 transition-colors"
          >
            Save Email
          </Button>
        )}
      </div>
      <Separator />

      {/* Password Section */}
      <div className="my-6">
        <h3 className="text-lg font-semibold mb-2">Change Password</h3>
        <Button
          onClick={openPasswordModal}
          className="bg-yellow-500 hover:bg-yellow-600 transition-colors"
        >
          Change Password
        </Button>
      </div>
      <Separator />

      {/* Logout Section */}
      <div className="mt-6">
        <Button
          onClick={() => console.log("User logged out")}
          className="w-full bg-red-500 hover:bg-red-600 transition-colors"
        >
          Logout
        </Button>
      </div>

      {/* Submodal for Password Change */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#2B2D31] p-6 rounded-lg shadow-lg text-white relative w-96">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <Input
              type="password"
              placeholder="Current Password"
              className="mb-4 bg-[#1E1F22] text-white border-none focus:ring-yellow-500"
            />
            <Input
              type="password"
              placeholder="New Password"
              className="mb-4 bg-[#1E1F22] text-white border-none focus:ring-yellow-500"
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              className="mb-4 bg-[#1E1F22] text-white border-none focus:ring-yellow-500"
            />
            <div className="flex justify-end gap-2">
              <Button
                onClick={closePasswordModal}
                className="bg-gray-500 hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={() => console.log("Password changed")}
                className="bg-green-500 hover:bg-green-600"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
