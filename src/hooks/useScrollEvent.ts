import { useEffect, useState } from "react";

export default function useScrollEvent({
  defaultSection,
}: {
  defaultSection?: string;
}) {
  const [activeSection, setActiveSection] = useState(defaultSection);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    function scrollHandler() {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
          if (section.getAttribute("id")) {
            setActiveSection(section.getAttribute("id") || "");
          }
        }
      });
    }

    window.addEventListener("scroll", scrollHandler);

    scrollHandler();

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return { activeSection, setActiveSection };
}
