interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
    return (
      <div className="flex items-center p-4 bg-red-100 border border-red-400 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-red-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18.364 5.636a9 9 0 11-12.728 0M12 9v4m0 4h.01"
          />
        </svg>
        <span className="text-red-700 text-sm">
          {message || "An error occurred. Please try again."}
        </span>
      </div>
    );
  }
  