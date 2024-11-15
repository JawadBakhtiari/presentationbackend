import { useEffect } from "react";

const useKeyboardNavigation = (
  previousSlide: () => void,
  nextSlide: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        previousSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previousSlide, nextSlide]);
};

export default useKeyboardNavigation;
