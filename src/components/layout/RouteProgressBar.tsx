"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function useRouteTransition() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const pendingRef = useRef<number | null>(null);
  const currentPathRef = useRef(pathname);

  useEffect(() => {
    // A pathname change signals the end of a navigation.
    if (pendingRef.current !== null) {
      window.clearTimeout(pendingRef.current);
      pendingRef.current = null;
    }
    setIsNavigating(false);
    currentPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const onLinkClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;
      if (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("#")) {
        return;
      }
      if (target.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      if (pendingRef.current !== null) {
        window.clearTimeout(pendingRef.current);
      }

      pendingRef.current = window.setTimeout(() => {
        if (currentPathRef.current !== pathname) {
          return;
        }
        setIsNavigating(true);
      }, 120);
    };

    document.addEventListener("click", onLinkClick, true);
    return () => document.removeEventListener("click", onLinkClick, true);
  }, [pathname]);

  return { isNavigating };
}

export function RouteProgressBar() {
  const { isNavigating } = useRouteTransition();

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5",
        isNavigating ? "opacity-100" : "opacity-0",
      ].join(" ")}
      style={{ transition: "opacity 0.3s ease" }}
    >
      <div className="relative h-full w-full overflow-hidden bg-primary/20">
        <div
          className="absolute inset-y-0 left-0 h-full bg-primary"
          style={{
            animation: "route-progress 1.2s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}
