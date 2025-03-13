import { useRouter } from "next/navigation";

type TProp = {
  href: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const SmoothScrollLink = ({ href, children, className, onClick }: TProp) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({ top: targetElement.offsetTop, behavior: "smooth" });
      router.push(href, undefined);
    }

    if (onClick) onClick();
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default SmoothScrollLink;
