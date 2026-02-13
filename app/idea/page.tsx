"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function IdeaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [answers, setAnswers] = useState({
    who: "",
    time: "",
    budget: "",
    vibe: "",
  });
  const [idea, setIdea] = useState("");
  const [showReveal, setShowReveal] = useState(false);

  // Sync showReveal state with URL parameter
  useEffect(() => {
    const step = searchParams.get('step');
    if (step === 'reveal' && idea) {
      setShowReveal(true);
    } else if (step !== 'reveal' && showReveal) {
      setShowReveal(false);
    }
  }, [searchParams, idea, showReveal]);

  const generateIdea = () => {
    let generatedIdea = "";
  
    // LONG DISTANCE ideas
    if (answers.who === "Long distance") {
      if (answers.vibe === "Romantic") {
        if (answers.budget === "Free") {
          generatedIdea = "Schedule a video date, watch the same movie together while on call, and share your favorite moments afterward.";
        } else if (answers.budget === "Under ₹1000") {
          generatedIdea = "Send them a surprise food delivery of their favorite meal or dessert, and video call while you both enjoy it together.";
        } else {
          generatedIdea = "Plan a virtual date night - order the same meal, set up candles, and have a proper dinner date over video call.";
        }
      } else if (answers.vibe === "Playful") {
        if (answers.budget === "Free") {
          generatedIdea = "Play online games together, have a virtual movie marathon, or create a shared playlist and guess each other's song choices.";
        } else if (answers.budget === "Under ₹1000") {
          generatedIdea = "Send them a small surprise package with their favorite snacks and a handwritten note, then call to see their reaction.";
        } else {
          generatedIdea = "Send them a thoughtful care package with things that remind you of them, and schedule a call to open it together.";
        }
      } else if (answers.vibe === "Thoughtful") {
        if (answers.budget === "Free") {
          generatedIdea = "Write them a long letter or email sharing specific memories and what you miss most, and send voice notes throughout the day.";
        } else if (answers.budget === "Under ₹1000") {
          generatedIdea = "Create a digital photo album or video montage of your memories together and share it during a video call.";
        } else {
          generatedIdea = "Plan a future trip together - research places, create an itinerary, and get excited about when you'll finally be together.";
        }
      } else { // Relaxed
        if (answers.budget === "Free") {
          generatedIdea = "Have a low-key video call, maybe while doing everyday things together - cooking, having chai, or just talking about your day.";
        } else if (answers.budget === "Under ₹1000") {
          generatedIdea = "Watch a series together over video call with snacks, no pressure to talk constantly, just comfortable presence.";
        } else {
          generatedIdea = "Schedule a longer, unhurried video date - no agenda, just quality time catching up and being present with each other.";
        }
      }
    }
    // MYSELF (self-love) ideas
    else if (answers.who === "Myself") {
      if (answers.vibe === "Romantic" || answers.vibe === "Thoughtful") {
        if (answers.budget === "Free") {
          generatedIdea = "Take yourself on a solo walk to your favorite spot, journal about things you're proud of this year, and enjoy some quiet time reflecting.";
        } else if (answers.budget === "Under ₹1000") {
          generatedIdea = "Treat yourself to your favorite meal or dessert, spend time doing something you love (reading, drawing, listening to music), and celebrate being you.";
        } else {
          generatedIdea = "Book yourself a spa session, visit a café you've been wanting to try, or buy yourself something small that makes you happy.";
        }
      } else if (answers.vibe === "Playful") {
        if (answers.budget === "Free") {
          generatedIdea = "Do something fun you've been putting off - dance to your favorite songs, try a new recipe, or start that creative project you've been thinking about.";
        } else if (answers.budget === "Under ₹1000") {
          generatedIdea = "Visit a bookstore or craft shop, grab your favorite street food, or catch a movie you've been wanting to see - just for you.";
        } else {
          generatedIdea = "Spend the day doing exactly what you want - visit a museum, go shopping, try a new activity, or explore a new part of your city.";
        }
      } else { // Relaxed
        if (answers.budget === "Free") {
          generatedIdea = "Have a cozy day at home - watch your favorite show, make yourself nice food, and just rest without any guilt or pressure.";
        } else if (answers.budget === "Under ₹1000") {
          generatedIdea = "Order in your favorite comfort food, light some candles, and spend the evening doing absolutely nothing productive. You deserve it.";
        } else {
          generatedIdea = "Book a relaxing experience - a massage, a nice meal out alone, or a quiet afternoon at a café with a good book.";
        }
      }
    }
    // BEST FRIEND ideas
    else if (answers.who === "Best friend") {
      if (answers.vibe === "Romantic" || answers.vibe === "Thoughtful") {
        if (answers.budget === "Free") {
          generatedIdea = "Have a heart-to-heart conversation over chai at home, reminisce about your favorite memories, and tell them what their friendship means to you.";
        } else if (answers.budget === "Under ₹1000") {
          generatedIdea = "Get them a small meaningful gift (their favorite book, snack, or something they mentioned wanting), and spend quality time together.";
        } else {
          generatedIdea = "Take them out for a nice meal at a place they love, and use the time to really catch up without distractions.";
        }
      } else if (answers.vibe === "Playful") {
        if (answers.budget === "Free") {
          generatedIdea = "Have a game night or movie marathon at home, make some snacks together, and just have fun without any pressure.";
        } else if (answers.budget === "Under ₹1000") {
          generatedIdea = "Go on a street food adventure - try new places, take silly photos, and enjoy exploring together.";
        } else {
          generatedIdea = "Plan a fun outing - bowling, arcade, pottery class, or any activity you've both been wanting to try together.";
        }
      } else { // Relaxed
        if (answers.budget === "Free") {
          generatedIdea = "Hang out at home doing nothing in particular - watch random videos, chat, order in if you feel like it. Just comfortable friend time.";
        } else if (answers.budget === "Under ₹1000") {
          generatedIdea = "Meet at a café, order your usual, and spend a few hours just talking and being present without any agenda.";
        } else {
          generatedIdea = "Spend a relaxed day together - brunch, maybe some shopping or a movie, nothing too planned, just enjoying each other's company.";
        }
      }
    }
    // ROMANTIC PARTNER ideas
    else {
      if (answers.vibe === "Romantic") {
        if (answers.budget === "Free") {
          generatedIdea = "Cook their favorite meal together at home, set up fairy lights or candles, and spend the evening talking about your favorite memories together.";
        } else if (answers.budget === "Under ₹1000") {
          generatedIdea = "Order their favorite dessert from a local bakery, create a playlist of songs that remind you of them, and have a cozy evening at home with chai and conversations.";
        } else {
          generatedIdea = "Book a table at a nice café or restaurant they've been wanting to try, bring a small handwritten note, and spend quality time without rushing.";
        }
      } else if (answers.vibe === "Playful") {
        if (answers.budget === "Free") {
          generatedIdea = "Create a fun scavenger hunt around your home or neighborhood with little notes and clues leading to a heartfelt message or their favorite snack.";
        } else if (answers.budget === "Under ₹1000") {
          generatedIdea = "Plan a street food crawl to 2-3 of your favorite local spots, try something new together, and capture silly photos along the way.";
        } else {
          generatedIdea = "Visit a local arcade, play zone, or fun activity spot, grab some street food after, and just enjoy being playful together.";
        }
      } else if (answers.vibe === "Thoughtful") {
        if (answers.budget === "Free") {
          generatedIdea = "Write them a letter listing specific moments from this year that made you smile. Hide it somewhere they'll find it, or read it to them over chai.";
        } else if (answers.budget === "Under ₹1000") {
          generatedIdea = "Get them a small meaningful gift (a book they mentioned, their favorite snack, or flowers from a local vendor) and spend the evening just talking and being present.";
        } else {
          generatedIdea = "Plan a surprise - could be breakfast in bed, a handmade photo album, or taking them to a place that's meaningful to both of you.";
        }
      } else { // Relaxed
        if (answers.budget === "Free") {
          generatedIdea = "Have a cozy movie or series marathon at home with homemade snacks, no phones, just comfortable time together.";
        } else if (answers.budget === "Under ₹1000") {
          generatedIdea = "Order in from their favorite restaurant, make some chai or coffee, and spend a relaxed evening at home watching something you both enjoy.";
        } else {
          generatedIdea = "Book a quiet café or lounge, order your favorite drinks and snacks, and spend a few hours just talking and being together without any rush.";
        }
      }
    }
  
    setIdea(generatedIdea);
    setShowReveal(true);
    // Push new history entry for proper back navigation
    router.push('/idea?step=reveal', { scroll: false });
  };

  const handleShowAnother = () => {
    setShowReveal(false);
    setIdea("");
    // Navigate back to remove reveal from history
    router.push('/idea', { scroll: false });
  };

  const isComplete = answers.who && answers.time && answers.budget && answers.vibe;

  // Show reveal page if idea is generated
  if (showReveal && idea) {
    return (
      <IdeaRevealPage 
        idea={idea}
        recipient={answers.who}
        onShowAnother={handleShowAnother}
      />
    );
  }

  return (
    <main
      className="min-h-screen px-4 pt-12 pb-8"
      style={{ background: 'linear-gradient(135deg, #FDF2F8 0%, #FFF1F2 50%, #FEF2F2 100%)' }}
    >
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4 px-4">
          <h1
            className="text-4xl md:text-5xl leading-tight"
            style={{
              fontFamily: 'var(--font-satisfy)',
              color: '#EA3263',
              letterSpacing: '0.3516px'
            }}
          >
            Let's find something thoughtful
          </h1>
          <p
            className="text-base"
            style={{
              fontFamily: 'var(--font-source-serif)',
              color: '#8B0836',
              letterSpacing: '-0.4395px'
            }}
          >
            Answer a few questions, and I'll suggest something
          </p>
        </div>

        <div
          className="space-y-10 p-8 md:p-10 rounded-3xl"
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Question 1 */}
          <div className="space-y-4">
            <label
              className="block text-lg font-normal"
              style={{
                fontFamily: 'var(--font-source-serif)',
                color: '#8B0836',
                letterSpacing: '-0.439453px'
              }}
            >
              Who is this for?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Romantic partner", "Best friend", "Myself", "Long distance"].map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswers({ ...answers, who: option })}
                  className={`p-4 border-2 transition-all ${
                    answers.who === option
                      ? "bg-rose-50"
                      : "bg-white hover:bg-rose-25"
                  }`}
                  style={{
                    borderColor: answers.who === option ? '#EA3263' : '#FFCCD3',
                    borderRadius: '14px',
                    fontFamily: 'var(--font-source-serif)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#C70036',
                    letterSpacing: '-0.150391px'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-4">
            <label
              className="block text-lg font-normal"
              style={{
                fontFamily: 'var(--font-source-serif)',
                color: '#8B0836',
                letterSpacing: '-0.439453px'
              }}
            >
              How much time do you have?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["15 minutes", "An evening", "Full day"].map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswers({ ...answers, time: option })}
                  className={`p-4 border-2 transition-all ${
                    answers.time === option
                      ? "bg-rose-50"
                      : "bg-white hover:bg-rose-25"
                  }`}
                  style={{
                    borderColor: answers.time === option ? '#EA3263' : '#FFCCD3',
                    borderRadius: '14px',
                    fontFamily: 'var(--font-source-serif)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#C70036',
                    letterSpacing: '-0.150391px'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="space-y-4">
            <label
              className="block text-lg font-normal"
              style={{
                fontFamily: 'var(--font-source-serif)',
                color: '#8B0836',
                letterSpacing: '-0.439453px'
              }}
            >
              What's your budget?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Free", "Under ₹1000", "Splurge"].map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswers({ ...answers, budget: option })}
                  className={`p-4 border-2 transition-all ${
                    answers.budget === option
                      ? "bg-rose-50"
                      : "bg-white hover:bg-rose-25"
                  }`}
                  style={{
                    borderColor: answers.budget === option ? '#EA3263' : '#FFCCD3',
                    borderRadius: '14px',
                    fontFamily: 'var(--font-source-serif)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#C70036',
                    letterSpacing: '-0.150391px'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Question 4 */}
          <div className="space-y-4">
            <label
              className="block text-lg font-normal"
              style={{
                fontFamily: 'var(--font-source-serif)',
                color: '#8B0836',
                letterSpacing: '-0.439453px'
              }}
            >
              What vibe are you going for?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Romantic", "Playful", "Thoughtful", "Relaxed"].map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswers({ ...answers, vibe: option })}
                  className={`p-4 border-2 transition-all ${
                    answers.vibe === option
                      ? "bg-rose-50"
                      : "bg-white hover:bg-rose-25"
                  }`}
                  style={{
                    borderColor: answers.vibe === option ? '#EA3263' : '#FFCCD3',
                    borderRadius: '14px',
                    fontFamily: 'var(--font-source-serif)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#C70036',
                    letterSpacing: '-0.150391px'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button - Updated primary CTA to #DB4E74 */}
          <button
            onClick={generateIdea}
            disabled={!isComplete}
            className="w-full transition-all hover:opacity-90"
            style={{
              padding: '17px 0',
              borderRadius: '9999px',
              backgroundColor: isComplete ? '#DB4E74' : '#E5E7EB',
              fontFamily: 'var(--font-inter)',
              fontSize: '18px',
              fontWeight: 600,
              color: isComplete ? '#FFFFFF' : '#99A1AF',
              letterSpacing: '-0.439453px',
              cursor: isComplete ? 'pointer' : 'not-allowed'
            }}
          >
            {isComplete ? "Show me an idea ✨" : "Answer all questions first"}
          </button>
        </div>
      </div>
    </main>
  );
}

// Idea Reveal Page Component (embedded in same file for simplicity)
function IdeaRevealPage({ idea, recipient, onShowAnother }: { idea: string; recipient: string; onShowAnother: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Scroll to top immediately on mount
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Then trigger animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const getRecipientParam = () => {
    switch(recipient) {
      case "Myself": return "myself";
      case "Long distance": return "long_distance";
      case "Best friend": return "best_friend";
      default: return "romantic_partner";
    }
  };

  const getLetterCTA = () => {
    if (recipient === "Myself") return "Put it into words 💌✨";
    return "Write something sweet 💌✨";
  };

  // Updated Show Idea page to match new design specifications
  // Changes: container padding, emoji sizes, typography, spacing, CTA colors
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex items-center justify-center px-4 py-8 md:py-36">
      {/* Animated Container */}
      <div
        className={`max-w-2xl w-full transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-8"
        }`}
      >
        {/* Main Content Card - Updated padding and spacing */}
        <div
          className="bg-white space-y-10 transition-all duration-700 delay-500"
          style={{
            padding: '32px',
            boxShadow: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)',
            borderRadius: '24px'
          }}
        >
          {/* Top Section - Emoji and Title */}
          <div className="space-y-5">
            {/* Heart Icon - Updated size to 56px */}
            <div className="flex justify-center">
              <div
                className={`transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-45 scale-0"
                }`}
                style={{ fontSize: '56px', lineHeight: '72px' }}
              >
                💝
              </div>
            </div>

            {/* Title and Idea Text */}
            <div className="space-y-4">
              {/* Title - Updated to Satisfy 44px */}
              <h1
                className={`text-center transition-all duration-700 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{
                  fontFamily: 'var(--font-satisfy)',
                  fontSize: '44px',
                  lineHeight: '40px',
                  color: '#EA3263'
                }}
              >
                Your Valentine's idea
              </h1>

              {/* The Idea - Updated to Source Serif 4, italic, 22px */}
              <p
                className={`text-center transition-all duration-700 delay-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{
                  fontFamily: 'var(--font-source-serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '22px',
                  lineHeight: '40px',
                  color: '#252525'
                }}
              >
                {idea}
              </p>
            </div>
          </div>

          {/* Small Emojis Divider - Updated to 24px */}
          <div
            className={`flex justify-center gap-4 transition-all duration-700 delay-900 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ fontSize: '24px', lineHeight: '32px' }}
          >
            💌 💖 💌
          </div>

          {/* Bottom Section - Text and CTAs */}
          <div className="space-y-10">
            {/* Cherry on Top Text - Updated typography */}
            <p
              className={`text-center transition-all duration-700 delay-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                fontFamily: 'var(--font-source-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '26px',
                color: '#252525'
              }}
            >
              Add a handwritten note to make it unforgettable. 🍒
            </p>

            {/* CTAs - Updated colors and sizing */}
            <div
              className={`space-y-4 transition-all duration-700 delay-1100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {/* Primary CTA - Updated to #DB4E74 and Inter 15px */}
              <Link
                href={`/letter?recipient=${getRecipientParam()}`}
                className="block w-full text-center rounded-full transition-all duration-200 active:scale-95 touch-manipulation hover:opacity-90"
                style={{
                  padding: '16px',
                  backgroundColor: '#DB4E74',
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 600,
                  fontSize: '15px',
                  lineHeight: '28px',
                  color: '#FFFFFF'
                }}
              >
                {getLetterCTA()}
              </Link>

              {/* Secondary CTA - Updated to underlined text style */}
              <button
                onClick={onShowAnother}
                className="w-full text-center underline transition-all duration-200 hover:opacity-70"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 600,
                  fontSize: '15px',
                  lineHeight: '28px',
                  color: '#EA3263'
                }}
              >
                Show me another idea ✨
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}