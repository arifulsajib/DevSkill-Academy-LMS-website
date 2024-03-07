import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BackToTopRouteLoad = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let scrollInterval: any;

    const scrollToTop = () => {
      const scrollStep = -window.scrollY / 15; // change the divisor to adjust scroll speed
      scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 10); // change the interval to adjust smoothness
    };

    scrollToTop();

    return () => {
      clearInterval(scrollInterval);
    };
  }, [pathname]);

  return null;
};

export default BackToTopRouteLoad;
