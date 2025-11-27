function LoadingSpinner({ size = "md", text = "Loading..." }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div
        className={`${sizeClasses[size]} border-4 border-slate-400 border-t-transparent rounded-full`}
        style={{
          animation: "spin 0.8s linear infinite",
        }}
      ></div>
      {text && (
        <p className="text-slate-300 text-sm animate-pulse">{text}</p>
      )}
    </div>
  );
}

export default LoadingSpinner;

