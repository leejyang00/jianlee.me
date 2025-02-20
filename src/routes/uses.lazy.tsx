import ScrollToTop from '@/shared/ScrollToTop';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/uses')({
  component: ScrollToTop(RouteComponent),
})

function RouteComponent() {

  useEffect(() => {
    document.title = "Jian | Uses";
  }, []);

  return <div>Hello "/uses"!</div>
}
