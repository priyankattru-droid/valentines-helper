"use client";
export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import { letterTemplates, type RecipientType, type LetterStyle } from "./templates";
import localFont from 'next/font/local';

function LetterPageWrapper() {
  const searchParams = useSearchParams();
  const recipientFromUrl =
    searchParams.get("recipient") as RecipientType | null;

  return <LetterPageContent recipientFromUrl={recipientFromUrl} />;
}


function LetterPageContent({ recipientFromUrl }: { recipientFromUrl: RecipientType | null }) {

  const [recipient, setRecipient] = useState<RecipientType>(recipientFromUrl || "romantic_partner");
  const [selectedStyle, setSelectedStyle] = useState<LetterStyle | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(letterTemplates[0]);
  const [letterText, setLetterText] = useState("");
  const [showDoodles, setShowDoodles] = useState(false);
  const [flowStep, setFlowStep] = useState<"select_style" | "write_letter">("select_style");
  const MAX_CHARS = 850; // Adjust based on testing

  const loadTemplate = (style: LetterStyle) => {
    const template = letterTemplates.find(
      t => t.recipient === recipient && t.style === style
    );
    if (template) {
      setSelectedTemplate(template);
      setSelectedStyle(style);
      const templateText = `${template.opening}\n\n${template.prompts.map(p => `${p}...`).join('\n\n')}\n\n${template.closing}`;
      setLetterText(templateText);
      setFlowStep("write_letter");
    }
  };

  const startBlankPage = () => {
    setSelectedStyle(null);
    setLetterText("");
    setFlowStep("write_letter");
  };

  const generateLetterImage = async () => {
    const letterElement = document.getElementById("letter-content");
    if (!letterElement) return null;

    try {
      const width = 1080;
      const minHeight = 1350;

      const textarea = letterElement.querySelector('textarea') as HTMLTextAreaElement;
      if (!textarea) return null;

      const heartDoodle = document.getElementById('heart-doodle') as HTMLElement;

      // Store originals
      const originalWidth = letterElement.style.width;
      const originalHeight = letterElement.style.height;
      const originalMinHeight = letterElement.style.minHeight;
      const originalPadding = letterElement.style.padding;
      const originalHeartTop = heartDoodle?.style.top;

      // Set exact export dimensions
      letterElement.style.width = `${width}px`;
      letterElement.style.padding = '48px'; // Exact padding in pixels

      // Create div to replace textarea
      const textDiv = document.createElement('div');
      textDiv.style.cssText = `
        color: #252525;
        font-size: 40px;
        line-height: 1.5;
        font-family: 'Caveat', cursive;
        white-space: pre-wrap;
        word-break: break-word;
        width: 100%;
      `;
      textDiv.textContent = textarea.value;

      // Replace textarea with div
      textarea.style.display = 'none';
      textarea.parentNode?.insertBefore(textDiv, textarea);

      await new Promise(resolve => setTimeout(resolve, 300));

      // Calculate actual height needed
      const actualHeight = Math.max(letterElement.scrollHeight, minHeight);

      // Set the container to exact height so heart centering is accurate
      letterElement.style.height = `${actualHeight}px`;
      letterElement.style.minHeight = `${actualHeight}px`;

      // Now center the heart based on the actual canvas height
      if (heartDoodle) {
        heartDoodle.style.top = '50%';
      }

      await new Promise(resolve => setTimeout(resolve, 200));

      const canvas = await html2canvas(letterElement, {
        width: width,
        height: actualHeight,
        scale: 2,
        backgroundColor: "#FFFDF8",
        logging: false,
        useCORS: true,
        onclone: (clonedDoc) => {
          // Ensure font loads in cloned document
          const clonedDiv = clonedDoc.querySelector('div[style*="Caveat"]') as HTMLElement;
          if (clonedDiv) {
            clonedDiv.style.fontFamily = "'Caveat', cursive";
          }
        }
      });

      // Cleanup
      textDiv.remove();
      textarea.style.display = '';
      letterElement.style.width = originalWidth;
      letterElement.style.height = originalHeight;
      letterElement.style.minHeight = originalMinHeight;
      letterElement.style.padding = originalPadding;
      if (heartDoodle && originalHeartTop) {
        heartDoodle.style.top = originalHeartTop;
      }

      return canvas;
    } catch (error) {
      console.error("Export failed:", error);
      alert("Sorry, couldn't export the letter. Please try copying the text instead.");
      return null;
    }
  };
  const downloadAsImage = async () => {
    const canvas = await generateLetterImage();
    if (!canvas) return;
  
    const link = document.createElement("a");
    link.download = "valentine-letter.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  
  const copyAsImage = async () => {
    const canvas = await generateLetterImage();
    if (!canvas) return;
  
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]);
        alert("Image copied! You can now paste it anywhere ✨");
      } catch (error) {
        console.error("Copy failed:", error);
        alert("Couldn't copy image. Try downloading instead!");
      }
    });
  };

  return (
    <main className="min-h-screen px-4 py-8 bg-rose-50">
      <div className="max-w-3xl mx-auto space-y-8 px-4">
        
        {/* STEP 1: Style Selection */}
        {flowStep === "select_style" && (
          <>
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-serif text-rose-900">
                Choose your letter style
              </h1>
              <p className="text-rose-700">
                Pick a starting point, or begin with a blank page
              </p>
            </div>
  
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {letterTemplates
                  .filter(t => t.recipient === recipient)
                  .map((template) => (
                    <button
                      key={`${template.recipient}-${template.style}`}
                      onClick={() => loadTemplate(template.style)}
                      className="p-6 rounded-xl border-2 text-left hover:border-rose-500 transition-all"
                    >
                      <h3 className="font-medium text-rose-900 mb-2">{template.styleName}</h3>
                      <p className="text-sm text-gray-600 mb-3">{template.opening}</p>
                      <p className="text-xs text-gray-500 italic">{template.previewText}</p>
                    </button>
                  ))}
              </div>
  
              <button
                onClick={startBlankPage}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-rose-500 text-gray-600 hover:text-rose-700 transition-all"
              >
                Start with a blank page
              </button>
            </div>
          </>
        )}
  
        {/* STEP 2: Writing */}
        {flowStep === "write_letter" && (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-serif text-rose-900">
                    Write your letter
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedStyle ? selectedTemplate.styleName : "Blank page"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (letterText.trim().length > 0) {
                      const confirmed = window.confirm(
                        "Changing your style will clear what you've written. Make sure to copy your text first if you want to keep it!\n\nDo you want to continue?"
                      );
                      if (confirmed) {
                        setFlowStep("select_style");
                        setLetterText("");
                      }
                    } else {
                      setFlowStep("select_style");
                    }
                  }}
                  className="text-sm text-rose-600 hover:text-rose-700 underline"
                >
                  Change style
                </button>
              </div>
              <p className="text-rose-700">
                You don't have to say everything. Just say something honest.
              </p>
            </div>
  
            <div id="letter-content" className="relative p-6 md:p-12 rounded-2xl shadow-sm min-h-[400px] flex flex-col" style={{ 
  backgroundColor: '#FFFDF8',
}}>
             {showDoodles && (
  <div id="heart-doodle" style={{
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0.15,
    pointerEvents: 'none',
    zIndex: 0,
    width: '60%',
    maxWidth: '500px',
    aspectRatio: '1'
  }}>
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <path
        d="M50,90 C50,90 10,60 10,40 C10,25 20,15 30,15 C40,15 45,25 50,35 C55,25 60,15 70,15 C80,15 90,25 90,40 C90,60 50,90 50,90 Z"
        fill="none"
        stroke="#FDA4AF"
        strokeWidth="2"
      />
    </svg>
  </div>
)}
  
  <textarea
  value={letterText}
  onChange={(e) => {
    if (e.target.value.length <= MAX_CHARS) {
      setLetterText(e.target.value);
    }
  }}
  onInput={(e) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = Math.max(target.scrollHeight, 400) + 'px';
  }}
  placeholder="Start writing your letter here..."
  className="w-full resize-none focus:outline-none bg-transparent relative z-10 overflow-hidden"
style={{ 
  color: '#252525', 
  fontSize: '24px', 
  lineHeight: '150%',
  minHeight: '400px',
  fontFamily: "'Caveat', cursive"
}}
/>
</div>
<div className="mt-4 space-y-2">
  {/* Progress bar */}
  <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ backgroundColor: '#E5E7EB' }}>
    <div 
      className="h-full transition-all duration-300"
      style={{ 
        width: `${(letterText.length / MAX_CHARS) * 100}%`,
        backgroundColor: 
          letterText.length >= MAX_CHARS ? '#DC2626' : // Red when max
          letterText.length >= MAX_CHARS * 0.8 ? '#F59E0B' : // Amber at 80%
          '#9CA3AF' // Gray normally
      }}
    />
  </div>
  
  {/* Character count */}
  <div 
    className="text-sm text-right"
    style={{ 
      color: 
        letterText.length >= MAX_CHARS ? '#DC2626' :
        letterText.length >= MAX_CHARS * 0.8 ? '#F59E0B' :
        '#6B7280'
    }}
  >
    {letterText.length}/{MAX_CHARS} characters

</div>
            </div>
  
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm flex-wrap gap-3">
              <button
                onClick={() => setShowDoodles(!showDoodles)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  showDoodles
                    ? "border-rose-500 bg-rose-50 text-rose-700"
                    : "border-gray-200 hover:border-rose-300 text-gray-700"
                }`}
              >
                {showDoodles ? "✨ Doodles On" : "Add Doodles"}
              </button>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => {
                    if (letterText) {
                      navigator.clipboard.writeText(letterText);
                      alert("Text copied! ✨");
                    } else {
                      alert("Write something first! 💗");
                    }
                  }}
                  className="px-4 py-2 rounded-full border-2 border-gray-300 text-gray-700 hover:border-rose-300 transition-colors text-sm"
                >
                  Copy Text
                </button>

                <button
                  onClick={copyAsImage}
                  className="px-4 py-2 rounded-full border-2 border-rose-500 text-rose-600 hover:bg-rose-50 transition-colors text-sm"
                >
                  Copy Image
                </button>

                <button
                  onClick={downloadAsImage}
                  className="px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white transition-colors"
                >
                  Download Image
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
export default function LetterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LetterPageWrapper />

    </Suspense>
  );
}