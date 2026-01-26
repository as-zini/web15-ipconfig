import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Terminal, ArrowRight, Layout } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [activeTab, setActiveTab] = useState("react");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-50 selection:bg-green-500/30 selection:text-green-200">
      {/* Background Gradient Effects */}
      <div className="pointer-events-none fixed top-0 left-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-green-500/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav
        className={`fixed z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-slate-800 bg-slate-950/80 py-3 backdrop-blur-md'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="flex items-center gap-2 font-mono text-xl font-bold tracking-tighter">
            <Terminal className="text-green-400" size={24} />
            <span className="text-white">
              team<span className="text-green-400">.config</span>
            </span>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-400 md:flex">
            <a href="/" className="transition-colors hover:text-green-400">
              Log in
            </a>
            <button className="rounded-full border border-slate-700 bg-slate-800 px-5 py-2 text-white transition-all hover:bg-slate-700">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Layout />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 font-mono text-xs text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            v1.0.0 Stable Release
          </div>

          <h1 className="mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-5xl leading-tight font-bold text-transparent md:text-6xl">
            우리 팀의 <span className="font-mono text-green-400">0</span> 번째
            스프린트를 위한 <br className="hidden md:block" />
            <span className="font-mono text-green-400">team.config</span>{' '}
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-slate-400">
            어색한 아이스브레이킹부터 그라운드 룰, README 자동 생성까지
            <br />
            개발자들의 언어로 소통하고, 프로젝트 세팅을 한번에 끝내세요
          </p>

          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <button
              onClick={() => navigate('/canvas')}
              className="group relative transform rounded-lg bg-green-500 px-8 py-4 font-mono font-bold text-slate-950 shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all hover:scale-105 hover:bg-green-400"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">&gt; build start:team</span>
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </button>
          </div>
        </div>
      </section>
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-sm text-slate-500">
        <p>
          © 2025 TeamConfig. All systems operational.
          <br />
          No more awkward silence during kickoff meetings.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
