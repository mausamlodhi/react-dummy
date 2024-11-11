import { useEffect, useState } from "react";

const useScrollToTop = (initialScrollState = false) => {
  const [scrollToTop, setScrollToTop] = useState(initialScrollState);

  useEffect(() => {
    if (scrollToTop) {
      setScrollToTop(false);
      try {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } catch (error) {
        window.scrollTo(0, 0);
      }
    }
  }, [scrollToTop, setScrollToTop]);

  return setScrollToTop;
};

export default useScrollToTop;
