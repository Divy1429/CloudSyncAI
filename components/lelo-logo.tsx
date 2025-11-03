import Image from "next/image"

export function LeLoLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/images/design-mode/FullLogo.png"
        alt="CloudSync Logo"
        width={180}
        height={60}
        className="h-8 sm:h-25 w-auto object-contain"
        priority
      />
    </div>
  )
}
