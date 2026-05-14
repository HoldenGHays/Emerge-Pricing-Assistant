import { cn } from "@/lib/utils"

export type BadgeColor = "blue" | "neutral" | "red" | "green" | "yellow" | "purple" | "ghost"

const borderStyles: Record<BadgeColor, string> = {
  blue:    "border border-[#246DFF]",
  neutral: "border border-[#AEB8C1]",
  red:     "border border-[#FF5C00]",
  green:   "border border-[#BDFF00]",
  yellow:  "border border-white",
  purple:  "border border-[#A87FFF]",
  ghost:   "",
}

const glassBackground = "linear-gradient(rgba(255,255,255,0.016) 0%, rgba(255,255,255,0.024) 100%), linear-gradient(90deg, rgba(76,89,103,0.15) 0%, rgba(76,89,103,0.15) 100%)"

interface BadgeProps {
  children: React.ReactNode
  color?: BadgeColor
  className?: string
}

export function Badge({ children, color = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-3 py-1 rounded-full",
        "text-sm font-normal text-white whitespace-nowrap",
        "backdrop-blur-[32px]",
        "shadow-[0px_8px_32px_-8px_#00020d]",
        borderStyles[color],
        className
      )}
      style={{ background: glassBackground }}
    >
      {children}
    </span>
  )
}
