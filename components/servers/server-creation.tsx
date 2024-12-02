// components/CreateServerModal.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

interface CreateServerModalProps {
  onClose: () => void;
  onCreate: (serverName: string) => void;
}

export function CreateServerModal({ onClose, onCreate }: CreateServerModalProps) {
  const [serverName, setServerName] = useState("");

  const handleCreate = () => {
    if (serverName.trim()) {
      onCreate(serverName.trim());
      setServerName("");
      onClose();
    }
  };

  return (
    <div className="w-[400px] max-w-[95%] h-auto bg-[#2B2D31] rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex h-12 items-center justify-between border-b border-[#1F2023] px-4">
        <h2 className="text-lg font-semibold text-white">Create Server</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#B5BAC1]" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-sm text-[#B5BAC1]">
          Give your server a name to start customizing your community.
        </p>
        <div className="mt-4">
          <Input
            className="bg-[#1E1F22] border-none text-white placeholder-[#B5BAC1]"
            placeholder="Enter server name"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 border-t border-[#1F2023] p-4">
        <Button
          variant="ghost"
          className="text-[#B5BAC1] hover:text-white"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button onClick={handleCreate} className="bg-[#5865F2] text-white hover:bg-[#4752C4]">
          Create
        </Button>
      </div>
    </div>
  );
}
