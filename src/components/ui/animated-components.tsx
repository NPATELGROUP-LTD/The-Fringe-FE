"use client";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: "fade-up" | "fade-left" | "fade-right" | "scale";
}

export default function AnimatedSection({
  children,
  className = "",
  animationType = "fade-up",
}: AnimatedSectionProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Animated Card Component
export function AnimatedCard({
  children,
  className = "",
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const cardClasses = [
    "card",
    interactive ? "card-interactive" : "",
    "hover-lift",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={cardClasses}>{children}</div>;
}
