const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="relative z-30 h-full flex items-center justify-center p-12">
      <div className="max-w-md text-center space-y-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`
                aspect-square rounded-2xl bg-gradient-to-br
                ${i % 3 === 0 ? 'from-cyan-500/20 to-cyan-900/20' : 
                  i % 3 === 1 ? 'from-blue-500/20 to-blue-900/20' : 
                  'from-slate-800/50 to-slate-900/50'}
                backdrop-blur-lg border border-slate-700/20
                ${i % 2 === 0 ? 'animate-pulse-slow' : 'animate-pulse-slower'}
                hover:scale-105 transition-transform duration-500
                shadow-lg hover:shadow-cyan-500/10
              `}
            />
          ))}
        </div>
        <div className="relative">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-lg text-slate-400 backdrop-blur-sm">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;