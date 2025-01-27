import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/works')({
  component: RouteComponent,
})

function RouteComponent() {

  useEffect(() => {
    document.title = "Works - Jian Lee";
  }, []);

  return <div>Hello "/works"!</div>
}
