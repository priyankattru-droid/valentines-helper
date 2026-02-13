"use client";

import { useState } from "react";
import Link from "next/link";

export default function IdeaPage() {
  const [answers, setAnswers] = useState({
    who: "",
    time: "",
    budget: "",
    vibe: "",
  });
  const [idea, setIdea] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
  };
  const isComplete = answers.who && answers.time && answers.budget && answers.vibe;

  return (
    <>
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
                fontFamily: 'var(--font-roboto-mono)',
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
                className="block text-lg font-bold"
                style={{
                  fontFamily: 'var(--font-roboto-mono)',
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
                      fontFamily: 'var(--font-roboto-mono)',
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
                className="block text-lg font-bold"
                style={{
                  fontFamily: 'var(--font-roboto-mono)',
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
                      fontFamily: 'var(--font-roboto-mono)',
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
                className="block text-lg font-bold"
                style={{
                  fontFamily: 'var(--font-roboto-mono)',
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
                      fontFamily: 'var(--font-roboto-mono)',
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
                className="block text-lg font-bold"
                style={{
                  fontFamily: 'var(--font-roboto-mono)',
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
                      fontFamily: 'var(--font-roboto-mono)',
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

            {/* Generate Button */}
            <button
              onClick={generateIdea}
              disabled={!isComplete}
              className="w-full transition-all"
              style={{
                padding: '17px 0',
                borderRadius: '9999px',
                backgroundColor: isComplete ? '#EA3263' : '#E5E7EB',
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

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center p-6 z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative animate-in fade-in zoom-in duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '24px',
              padding: '48px 40px',
              maxWidth: '560px',
              width: '100%',
              boxShadow: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 hover:opacity-70 transition-opacity"
              style={{
                fontSize: '28px',
                color: '#8B0836',
                fontWeight: 300
              }}
            >
              ×
            </button>

            {/* Heart icon or emoji */}
            <div className="text-center text-6xl mb-6">💝</div>

            <h2
              className="text-center mb-6"
              style={{
                fontFamily: 'var(--font-satisfy)',
                fontSize: '32px',
                color: '#EA3263',
                letterSpacing: '0.3516px'
              }}
            >
              Your Valentine's idea
            </h2>

            <p
              className="text-center mb-8 leading-relaxed"
              style={{
                fontFamily: 'var(--font-roboto-mono)',
                fontSize: '16px',
                color: '#8B0836',
                letterSpacing: '-0.4395px'
              }}
            >
              {idea}
            </p>

            <Link
              href={`/letter?recipient=${
                answers.who === "Myself"
                  ? "myself"
                  : answers.who === "Long distance"
                  ? "long_distance"
                  : answers.who === "Best friend"
                  ? "best_friend"
                  : "romantic_partner"
              }`}
              className="block text-center transition-opacity hover:opacity-90"
              style={{
                padding: '17px 0',
                borderRadius: '9999px',
                backgroundColor: '#EA3263',
                fontFamily: 'var(--font-inter)',
                fontSize: '18px',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '-0.439453px'
              }}
            >
              {answers.who === "Myself" ? "Write a letter to yourself →" : "Write a letter to them →"}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}