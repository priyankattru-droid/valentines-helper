"use client";
export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import { letterTemplates, type RecipientType, type LetterStyle } from "./templates";
import { Dancing_Script } from "next/font/google";

// Initialize Dancing Script font
const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  weight: ['400', '700']
});

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
  const [isExporting, setIsExporting] = useState(false);
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
      textDiv.className = dancingScript.className;
      textDiv.style.cssText = `
        color: #252525;
        font-size: 40px;
        line-height: 1.5;
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
    setIsExporting(true);
    try {
      const canvas = await generateLetterImage();
      if (!canvas) return;

      const link = document.createElement("a");
      link.download = "valentine-letter.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  const copyAsImage = async () => {
    setIsExporting(true);
    try {
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
        } finally {
          setIsExporting(false);
        }
      });
    } catch (error) {
      setIsExporting(false);
    }
  };

  const shareToWhatsApp = async () => {
    setIsExporting(true);
    try {
      const canvas = await generateLetterImage();
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        try {
          // Try Web Share API first (mobile friendly)
          if (navigator.share && navigator.canShare) {
            const file = new File([blob], "valentine-letter.png", { type: "image/png" });
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({
                files: [file],
                title: "Valentine's Letter",
                text: "Here's something special for you 💝"
              });
              return;
            }
          }

          // Fallback: Download and open WhatsApp
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "valentine-letter.png";
          link.click();
          URL.revokeObjectURL(url);

          // Open WhatsApp after download
          setTimeout(() => {
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent("I made this for you 💝")}`;
            window.open(whatsappUrl, '_blank');
          }, 500);
        } catch (error) {
          console.error("Share failed:", error);
          alert("Couldn't share directly. The image will be downloaded instead!");
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "valentine-letter.png";
          link.click();
          URL.revokeObjectURL(url);
        } finally {
          setIsExporting(false);
        }
      });
    } catch (error) {
      setIsExporting(false);
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      {isExporting && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)'
          }}
        >
          <div
            className="flex flex-col items-center gap-4 p-8 rounded-2xl"
            style={{
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <svg className="animate-spin" width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#EA3263"
                strokeWidth="3"
                strokeOpacity="0.25"
              />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="#EA3263"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <p
              style={{
                fontFamily: 'var(--font-source-serif)',
                fontSize: '18px',
                fontWeight: 500,
                color: '#252525'
              }}
            >
              Creating your letter...
            </p>
          </div>
        </div>
      )}

      <main
        className="min-h-screen px-4 py-12"
        style={{ background: 'linear-gradient(135deg, #FDF2F8 0%, #FFF1F2 50%, #FEF2F2 100%)' }}
      >
        <div className="max-w-3xl mx-auto space-y-10">

        {/* STEP 1: Style Selection */}
        {flowStep === "select_style" && (
          <>
            <div className="text-center space-y-6 px-4">
              <h1
                className="text-4xl md:text-5xl leading-tight"
                style={{
                  fontFamily: 'var(--font-satisfy)',
                  fontSize: '48px',
                  lineHeight: '120%',
                  color: '#EA3263',
                  letterSpacing: '0.3516px'
                }}
              >
                Choose your letter style
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-source-serif)',
                  fontSize: '16px',
                  lineHeight: '28px',
                  color: '#8B0836',
                  letterSpacing: '-0.4395px'
                }}
              >
                Pick a starting point, or begin with a blank page
              </p>
            </div>

            <div className="space-y-6 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {letterTemplates
                  .filter(t => t.recipient === recipient)
                  .map((template) => (
                    <button
                      key={`${template.recipient}-${template.style}`}
                      onClick={() => loadTemplate(template.style)}
                      className="text-left transition-all hover:scale-[1.02]"
                      style={{
                        padding: '24px',
                        background: '#FFFFFF',
                        boxShadow: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-source-serif)',
                          fontWeight: 700,
                          fontSize: '20px',
                          lineHeight: '28px',
                          color: '#C70036'
                        }}
                      >
                        {template.styleName}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <p
                          style={{
                            fontFamily: 'var(--font-source-serif)',
                            fontStyle: 'italic',
                            fontWeight: 500,
                            fontSize: '14px',
                            lineHeight: '20px',
                            color: '#8B0836'
                          }}
                        >
                          {template.opening}
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 500,
                            fontSize: '12px',
                            lineHeight: '23px',
                            color: '#757575'
                          }}
                        >
                          {template.previewText}
                        </p>
                      </div>
                    </button>
                  ))}
              </div>

              <button
                onClick={startBlankPage}
                className="w-full transition-all hover:opacity-80"
                style={{
                  padding: '18px 0',
                  border: '2px solid #EC003F',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '24px',
                  textAlign: 'center',
                  color: '#EC003F'
                }}
              >
                Start with a blank page
              </button>
            </div>
          </>
        )}
  
        {/* STEP 2: Writing */}
        {flowStep === "write_letter" && (
          <>
            {/* Header Section */}
            <div className="flex flex-col items-center gap-6 px-4 max-w-3xl mx-auto w-full">
              {/* Title */}
              <h1
                className="text-center"
                style={{
                  fontFamily: 'var(--font-satisfy)',
                  fontSize: '48px',
                  lineHeight: '120%',
                  color: '#EA3263',
                  letterSpacing: '0.3516px'
                }}
              >
                Write your letter
              </h1>

              {/* Subtitle - Selected Style */}
              <p
                className="text-center"
                style={{
                  fontFamily: 'var(--font-source-serif)',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '28px',
                  color: '#252525',
                  letterSpacing: '-0.4395px'
                }}
              >
                {selectedStyle ? selectedTemplate.styleName : "Blank page"}
              </p>

              {/* Change Style Link */}
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
                className="hover:opacity-70 transition-opacity"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#EC003F',
                  textDecoration: 'underline'
                }}
              >
                ← Change letter writing style
              </button>

              {/* Helper Text */}
              <div className="flex flex-col items-center gap-2">
                <p
                  className="text-center"
                  style={{
                    fontFamily: 'var(--font-source-serif)',
                    fontStyle: 'italic',
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '24px',
                    color: '#252525'
                  }}
                >
                  Fill in the prompts below to complete your letter ✍️
                </p>
                <p
                  className="text-center"
                  style={{
                    fontFamily: 'var(--font-source-serif)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#555555'
                  }}
                >
                  You don't have to say everything. Just say something honest.
                </p>
              </div>
            </div>
  
            {/* Letter Content Container */}
            <div className="max-w-3xl mx-auto w-full px-4">
              <div
                id="letter-content"
                className="relative flex flex-col min-h-[400px]"
                style={{
                  backgroundColor: '#FFFDF8',
                  boxShadow: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  borderRadius: '24px',
                  padding: '32px'
                }}
              >
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
  className={`w-full resize-none focus:outline-none bg-transparent relative z-10 overflow-hidden ${dancingScript.className}`}
style={{
  color: '#252525',
  fontSize: '24px',
  lineHeight: '150%',
  minHeight: '400px'
}}
/>
              </div>

              {/* Character counter - OUTSIDE letter-content to avoid export */}
              <div className="flex justify-end mt-3">
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#8B7B75'
                  }}
                >
                  {MAX_CHARS - letterText.length} characters left ✨
                </p>
              </div>
            </div>
  
            {/* Doodles Toggle */}
            <div className="max-w-3xl mx-auto w-full px-4">
              <div
                className="flex items-center justify-between transition-all"
                style={{
                  padding: '16px 24px',
                  backgroundColor: '#FFFDF8',
                  boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)',
                  borderRadius: '9999px'
                }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: '24px', lineHeight: '32px' }}>💝</span>
                  <p
                    style={{
                      fontFamily: 'var(--font-source-serif)',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#252525'
                    }}
                  >
                    Add a cute doodle for extra love
                  </p>
                </div>

                {/* Improved Toggle Switch */}
                <button
                  onClick={() => setShowDoodles(!showDoodles)}
                  className="relative flex-shrink-0 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  style={{
                    width: '52px',
                    height: '28px',
                    backgroundColor: showDoodles ? '#DB4E74' : '#D1D5DC',
                    borderRadius: '9999px',
                    padding: '2px'
                  }}
                  aria-label={showDoodles ? "Disable doodles" : "Enable doodles"}
                  role="switch"
                  aria-checked={showDoodles}
                >
                  <div
                    className="transition-all duration-300 ease-in-out"
                    style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '9999px',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      transform: showDoodles ? 'translateX(24px)' : 'translateX(0px)'
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Primary CTA - WhatsApp */}
            <div className="max-w-3xl mx-auto w-full px-4">
              <button
                onClick={shareToWhatsApp}
                disabled={isExporting}
                className="w-full flex items-center justify-center gap-3 transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  padding: '16px',
                  backgroundColor: '#DB4E74',
                  borderRadius: '9999px'
                }}
              >
                {isExporting ? (
                  <>
                    {/* Loading Spinner */}
                    <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeWidth="3"
                        strokeOpacity="0.25"
                      />
                      <path
                        d="M12 2a10 10 0 0 1 10 10"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 600,
                        fontSize: '15px',
                        lineHeight: '28px',
                        color: '#FFFFFF'
                      }}
                    >
                      Creating image...
                    </span>
                  </>
                ) : (
                  <>
                    {/* WhatsApp Icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z"
                        fill="white"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 600,
                        fontSize: '15px',
                        lineHeight: '28px',
                        color: '#FFFFFF'
                      }}
                    >
                      Share in WhatsApp
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Secondary Export Buttons */}
            <div className="max-w-3xl mx-auto w-full px-4">
              <div className="flex flex-wrap gap-3">
                {/* Download Image */}
                <button
                  onClick={downloadAsImage}
                  disabled={isExporting}
                  className="flex-1 min-w-[180px] flex items-center justify-center gap-2 transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    padding: '13px 25px',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #D1D5DC',
                    borderRadius: '9999px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 11V13C2 13.5304 2.21071 14.0391 2.58579 14.4142C2.96086 14.7893 3.46957 15 4 15H12C12.5304 15 13.0391 14.7893 13.4142 14.4142C13.7893 14.0391 14 13.5304 14 13V11" stroke="#5A4A42" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.66669 6.66667L8.00002 10L11.3334 6.66667" stroke="#5A4A42" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 10V2" stroke="#5A4A42" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#5A4A42'
                    }}
                  >
                    Download Image
                  </span>
                </button>

                {/* Copy Image */}
                <button
                  onClick={copyAsImage}
                  disabled={isExporting}
                  className="flex-1 min-w-[180px] flex items-center justify-center gap-2 transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    padding: '13px 25px',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #D1D5DC',
                    borderRadius: '9999px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H10" stroke="#5A4A42" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.66669 2H3.33335C2.97973 2 2.64059 2.14048 2.39054 2.39052C2.1405 2.64057 2.00002 2.97971 2.00002 3.33333V12.6667C2.00002 13.0203 2.1405 13.3594 2.39054 13.6095C2.64059 13.8595 2.97973 14 3.33335 14H6.66669" stroke="#5A4A42" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#5A4A42'
                    }}
                  >
                    Copy Image
                  </span>
                </button>

                {/* Copy Text */}
                <button
                  onClick={() => {
                    if (letterText) {
                      navigator.clipboard.writeText(letterText);
                      alert("Text copied! ✨");
                    } else {
                      alert("Write something first! 💗");
                    }
                  }}
                  className="flex-1 min-w-[180px] flex items-center justify-center gap-2 transition-all hover:bg-gray-50"
                  style={{
                    padding: '13px 25px',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #D1D5DC',
                    borderRadius: '9999px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5.33331 5.33331V3.99998C5.33331 3.29274 5.61427 2.61446 6.11437 2.11436C6.61446 1.61427 7.29274 1.33331 7.99998 1.33331H12C12.7072 1.33331 13.3855 1.61427 13.8856 2.11436C14.3857 2.61446 14.6666 3.29274 14.6666 3.99998V7.99998C14.6666 8.70722 14.3857 9.3855 13.8856 9.8856C13.3855 10.3857 12.7072 10.6666 12 10.6666H10.6666" stroke="#5A4A42" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.6666 5.33331H3.99998C2.52722 5.33331 1.33331 6.52722 1.33331 7.99998V12C1.33331 13.4727 2.52722 14.6666 3.99998 14.6666H10.6666C12.1394 14.6666 13.3333 13.4727 13.3333 12V7.99998C13.3333 6.52722 12.1394 5.33331 10.6666 5.33331Z" stroke="#5A4A42" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#5A4A42'
                    }}
                  >
                    Copy Text
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
    </>
  );
}
export default function LetterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LetterPageWrapper />

    </Suspense>
  );
}