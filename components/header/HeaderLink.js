import Link from "next/link";

const isInternal = (href) => href?.startsWith("/") || href?.startsWith("#");

export default function HeaderLink({ href, children, ...props }) {
  if (isInternal(href)) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
