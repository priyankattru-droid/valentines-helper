import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#FDF2F8' }}>
      <div className="flex flex-col items-center gap-12 max-w-3xl w-full py-16">
        
        {/* Top Section: Icon + Text */}
        <div className="flex flex-col items-center gap-12 w-full">
          
          {/* Heart Icon */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl" style={{ backgroundColor: '#EA3263' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex flex-col items-center gap-4 w-full">
              {/* Main Heading */}
              <h1 
                className="text-center text-6xl md:text-8xl lg:text-[96px] leading-none"
                style={{ 
                  fontFamily: 'var(--font-satisfy)',
                  color: '#EA3263'
                }}
              >
                Valentine's Day,
              </h1>

              {/* Subheading */}
              <h2 
                className="text-center text-5xl md:text-6xl lg:text-[72px] leading-none"
                style={{ 
                  fontFamily: 'var(--font-dancing)',
                  color: '#8B1938',
                  letterSpacing: '0.123047px'
                }}
              >
                thoughtfully done
              </h2>
            </div>

            {/* Description */}
            <p 
  className="text-center px-8 md:px-16 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl"
  style={{ 
    fontFamily: 'var(--font-roboto-mono)',
    color: '#8B1938',
    letterSpacing: '0.0703125px'
  }}
>
Here are cleaner, simpler versions:

Option 1 (very clear):
Valentines Day ideas for everyone. Thoughtful, personalized, and stress-free.
</p>
          </div>
        </div>

        {/* CTA Button */}
        <Link href="/idea">
          <button 
            className="flex items-center justify-center gap-3 px-10 py-5 rounded-full shadow-2xl hover:opacity-90 transition-opacity"
            style={{ 
              backgroundColor: '#EA3263',
              fontFamily: 'var(--font-inter)',
              fontWeight: 600,
              fontSize: '18px',
              color: '#FFFFFF',
              letterSpacing: '-0.439453px'
            }}
          >
            <span>Help me plan Valentine's Day</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </Link>

      </div>
    </main>
  );
}