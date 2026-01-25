export function Footer() {
  return (
    <footer className="w-full bg-black/40 border-t border-white/10 backdrop-blur-md py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent italic tracking-tighter">
            CineNext
          </h2>
          <p className="text-sm text-white/40 max-w-[280px]">
            Explore millions of movies and TV shows. Your ultimate cinematic
            guide for 2026.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-6">
            <a
              href="https://github.com/lukadevv"
              className="text-white/40 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4 text-[10px] text-white/20 uppercase tracking-[0.2em]">
        <p>
          © 2026 CineNext by <a href="https://github.com/lukadevv">@lukadevv</a>
        </p>
      </div>
    </footer>
  );
}
