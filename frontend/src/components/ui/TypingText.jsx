import { useEffect, useState } from "react";

/**
 * Cycles through `words`, typing each one out then erasing it before
 * moving to the next. Intended to sit on its own line/block (see Hero.jsx)
 * so changing word length never disturbs surrounding layout.
 */
export default function TypingText({
  words,
  typingSpeed = 90,
  erasingSpeed = 50,
  pauseAfterTyping = 1400,
  pauseAfterErasing = 300,
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausedFull"), pauseAfterTyping);
      }
    } else if (phase === "pausedFull") {
      timeout = setTimeout(() => setPhase("erasing"), 0);
    } else if (phase === "erasing") {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, erasingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausedEmpty"), pauseAfterErasing);
      }
    } else if (phase === "pausedEmpty") {
      timeout = setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingSpeed, erasingSpeed, pauseAfterTyping, pauseAfterErasing]);

  return (
    <>
      {text}
      <span className="animate-pulse" aria-hidden>
        |
      </span>
    </>
  );
}
