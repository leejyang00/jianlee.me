// src/components/shared/ScrollToTop.tsx
import React, { useEffect } from "react";

const ScrollToTop = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default ScrollToTop;
