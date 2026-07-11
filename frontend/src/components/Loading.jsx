const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-cyan-400 animate-spin" />
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-b-purple-500 animate-spin [animation-duration:1.5s]" />
      </div>
      <p className="mt-6 text-slate-400 text-sm tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Loading;
