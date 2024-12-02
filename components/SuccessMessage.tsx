interface SuccessMessageProps {
  message?: string;
}

export function SuccessMessage({ message }: SuccessMessageProps) {
    return (
      <div className="flex items-center p-4 bg-green-100 border border-green-400 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-green-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-green-700 text-sm">
          {message || "Action completed successfully!"}
        </span>
      </div>
    );
  }
  