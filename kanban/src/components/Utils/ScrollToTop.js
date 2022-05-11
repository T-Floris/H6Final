import { useEffect } from "react";
import { useLocation } from "react-router";

//this function fixes the problem that React-Router Link brings you to the middle of a page
const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

export default ScrollToTop;