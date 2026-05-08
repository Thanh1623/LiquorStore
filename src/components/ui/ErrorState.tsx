interface ErrorStateProps {
  message?: string;
  retry?: () => void;
}

export function ErrorState({ message = "Something went wrong", retry }: ErrorStateProps) {
  return (
    <div className="flex flex-col justify-center items-center py-24 text-center">
      <p className="text-red-500 mb-4">{message}</p>
      {retry && (
        <button 
          onClick={retry}
          className="bg-[#AB4227] text-white px-6 py-2 rounded hover:bg-[#8e3720]"
        >
          Retry
        </button>
      )}
    </div>
  );
}
