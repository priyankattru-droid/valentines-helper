export type RecipientType = "romantic_partner" | "long_distance" | "best_friend" | "myself";
export type LetterStyle = "soft_grateful" | "playful_sweet" | "deep_emotional" | "simple_honest";

export interface LetterTemplate {
  recipient: RecipientType;
  style: LetterStyle;
  styleName: string;
  opening: string;
  prompts: string[];
  closing: string;
  previewText: string;
}

export const letterTemplates: LetterTemplate[] = [
  // ========== ROMANTIC PARTNER ==========
  {
    recipient: "romantic_partner",
    style: "soft_grateful",
    styleName: "Soft & Grateful",
    opening: "I don't say this enough, but...",
    prompts: [
      "One thing I'm grateful for about you is",
      "When I think about us, I keep coming back to",
      "You make me feel"
    ],
    closing: "Thank you for being you.",
    previewText: "Warm, appreciative, and tender. Perfect for expressing gratitude."
  },
  {
    recipient: "romantic_partner",
    style: "playful_sweet",
    styleName: "Playful & Sweet",
    opening: "Hey you,",
    prompts: [
      "Remember when we",
      "I love how you always",
      "You're the reason I"
    ],
    closing: "Can't wait for more adventures with you. 💗",
    previewText: "Light-hearted and sweet, full of warmth and fun."
  },
  {
    recipient: "romantic_partner",
    style: "deep_emotional",
    styleName: "Deep & Emotional",
    opening: "There's something I want you to know...",
    prompts: [
      "The moment I realized I loved you was",
      "You've changed my life by",
      "When I'm with you, I feel"
    ],
    closing: "Forever grateful for you.",
    previewText: "Heartfelt and vulnerable. For when you want to go deep."
  },
  {
    recipient: "romantic_partner",
    style: "simple_honest",
    styleName: "Simple & Honest",
    opening: "I wanted to tell you...",
    prompts: [
      "I appreciate you because",
      "Something I admire about you is",
      "You mean a lot to me because"
    ],
    closing: "Thank you for everything.",
    previewText: "Straightforward and sincere. No frills, just honesty."
  },

  // ========== LONG DISTANCE ==========
  {
    recipient: "long_distance",
    style: "soft_grateful",
    styleName: "Soft & Grateful",
    opening: "Even with the distance between us...",
    prompts: [
      "I'm grateful we have",
      "One thing that keeps me going is",
      "Despite the miles, you make me feel"
    ],
    closing: "Distance means nothing when you mean everything.",
    previewText: "Appreciative and hopeful. Acknowledges the distance with warmth."
  },
  {
    recipient: "long_distance",
    style: "playful_sweet",
    styleName: "Playful & Sweet",
    opening: "Hey you, missing you over here!",
    prompts: [
      "Remember when we video-called and",
      "I can't wait until we can",
      "Distance doesn't change the fact that"
    ],
    closing: "Counting down the days until I see you again! 💗",
    previewText: "Light and sweet. Keeps the mood positive despite the distance."
  },
  {
    recipient: "long_distance",
    style: "deep_emotional",
    styleName: "Deep & Emotional",
    opening: "Being apart from you is hard, but...",
    prompts: [
      "What keeps me strong is knowing",
      "The distance has taught me",
      "When we're finally together again, I want to"
    ],
    closing: "No distance can change how I feel about you.",
    previewText: "Honest about the difficulty, but full of love and commitment."
  },
  {
    recipient: "long_distance",
    style: "simple_honest",
    styleName: "Simple & Honest",
    opening: "I miss you.",
    prompts: [
      "What I miss most is",
      "Something I'm looking forward to is",
      "Even from far away, you"
    ],
    closing: "Until we're together again.",
    previewText: "Direct and real. No need to overcomplicate missing someone."
  },

  // ========== BEST FRIEND ==========
  {
    recipient: "best_friend",
    style: "soft_grateful",
    styleName: "Soft & Grateful",
    opening: "I don't say this enough, but I'm really lucky to have you in my life.",
    prompts: [
      "One thing I appreciate about our friendship is",
      "You've been there for me when",
      "Our friendship means a lot because"
    ],
    closing: "Thanks for being such an amazing friend.",
    previewText: "Warm and heartfelt. Perfect for showing friendship gratitude."
  },
  {
    recipient: "best_friend",
    style: "playful_sweet",
    styleName: "Playful & Sweet",
    opening: "Hey bestie!",
    prompts: [
      "Remember that time we",
      "I love that we can always",
      "You're the kind of friend who"
    ],
    closing: "Here's to more chaos and laughter together! 💗",
    previewText: "Fun and energetic. Celebrates the joy of your friendship."
  },
  {
    recipient: "best_friend",
    style: "deep_emotional",
    styleName: "Deep & Emotional",
    opening: "I want you to know how much you mean to me...",
    prompts: [
      "You've helped me through",
      "Our friendship has taught me",
      "I'm a better person because"
    ],
    closing: "I'm so grateful to call you my friend.",
    previewText: "Sincere and deep. For when you want to get real with your friend."
  },
  {
    recipient: "best_friend",
    style: "simple_honest",
    styleName: "Simple & Honest",
    opening: "Just wanted to say...",
    prompts: [
      "I appreciate you because",
      "You always",
      "Thanks for being"
    ],
    closing: "You're the best.",
    previewText: "Straightforward appreciation. Sometimes simple is best."
  },

  // ========== MYSELF (SELF-LOVE) ==========
  {
    recipient: "myself",
    style: "soft_grateful",
    styleName: "Soft & Grateful",
    opening: "I want to acknowledge something important...",
    prompts: [
      "Something I'm proud of myself for is",
      "I've grown by",
      "I deserve kindness because"
    ],
    closing: "I'm doing my best, and that's enough.",
    previewText: "Gentle self-compassion and recognition of your own worth."
  },
  {
    recipient: "myself",
    style: "playful_sweet",
    styleName: "Playful & Sweet",
    opening: "Hey you, yes you!",
    prompts: [
      "Something I love about myself is",
      "I'm getting better at",
      "I deserve to celebrate"
    ],
    closing: "Keep being amazing! 💗",
    previewText: "Uplifting and encouraging. A celebration of yourself."
  },
  {
    recipient: "myself",
    style: "deep_emotional",
    styleName: "Deep & Emotional",
    opening: "I need to be honest with myself...",
    prompts: [
      "Something I've been through that took strength was",
      "I'm learning to accept",
      "I forgive myself for"
    ],
    closing: "I'm worthy of love, especially from myself.",
    previewText: "Deep self-reflection and self-compassion. For processing and healing."
  },
  {
    recipient: "myself",
    style: "simple_honest",
    styleName: "Simple & Honest",
    opening: "A reminder to myself:",
    prompts: [
      "I am",
      "I can",
      "I deserve"
    ],
    closing: "You've got this.",
    previewText: "Simple affirmations. Clear, direct, and empowering."
  }
];