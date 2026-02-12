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
      <main className="min-h-screen px-6 py-12 bg-rose-50">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-serif text-rose-900">
              Let's find something thoughtful
            </h1>
            <p className="text-rose-700">
              Answer a few questions, and I'll suggest something meaningful.
            </p>
          </div>

          <div className="space-y-6 bg-white p-8 rounded-2xl shadow-sm">
            {/* Question 1 */}
            <div className="space-y-3">
              <label className="block text-lg font-medium text-rose-900">
                Who is this for?
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["Romantic partner", "Best friend", "Myself", "Long distance"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, who: option })}
                    className={`p-5 rounded-xl border-2 transition-all text-base ${
                      answers.who === option
                        ? "border-rose-500 bg-rose-50 text-rose-900"
                        : "border-gray-200 hover:border-rose-300 text-gray-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div className="space-y-3">
              <label className="block text-lg font-medium text-rose-900">
                How much time do you have?
              </label>
              <div className="grid grid-cols-3 gap-4">
                {["15 minutes", "An evening", "Full day"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, time: option })}
                    className={`p-5 rounded-xl border-2 transition-all text-base ${
                      answers.time === option
                        ? "border-rose-500 bg-rose-50 text-rose-900"
                        : "border-gray-200 hover:border-rose-300 text-gray-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div className="space-y-3">
              <label className="block text-lg font-medium text-rose-900">
                What's your budget?
              </label>
              <div className="grid grid-cols-3 gap-4">
              {["Free", "Under ₹1000", "Splurge"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, budget: option })}
                    className={`p-5 rounded-xl border-2 transition-all text-base ${
                      answers.budget === option
                        ? "border-rose-500 bg-rose-50 text-rose-900"
                        : "border-gray-200 hover:border-rose-300 text-gray-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4 */}
            <div className="space-y-3">
              <label className="block text-lg font-medium text-rose-900">
                What vibe are you going for?
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["Romantic", "Playful", "Thoughtful", "Relaxed"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, vibe: option })}
                    className={`p-5 rounded-xl border-2 transition-all text-base ${
                      answers.vibe === option
                        ? "border-rose-500 bg-rose-50 text-rose-900"
                        : "border-gray-200 hover:border-rose-300 text-gray-700"
                    }`}
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
              className={`w-full py-4 rounded-full font-medium transition-all ${
                isComplete
                  ? "bg-rose-500 hover:bg-rose-600 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
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
            className="bg-white rounded-3xl p-8 max-w-lg w-full space-y-6 relative animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>

            {/* Heart icon or emoji */}
            <div className="text-center text-5xl">💝</div>

            <h2 className="text-2xl font-serif text-rose-900 text-center">
              Your Valentine's idea
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed text-center">
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
  className="w-full py-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-center transition-colors block"
>
  {answers.who === "Myself" ? "Write a letter to yourself →" : "Write a letter to them →"}
</Link>
            
          </div>
        </div>
      )}
    </>
  );
}