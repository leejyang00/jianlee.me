import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/uses')({
  component: RouteComponent,
})

function RouteComponent() {

  useEffect(() => {
    document.title = "Uses - Jian Lee";
  }, []);

  return <div>Hello "/uses"!</div>
}
