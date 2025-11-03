import Image from "next/image"

export function LeLoLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-[20px] justify-center ${className}`}>
      <Image
        src="/images/design-mode/FullLogo1.jpg"
        alt="CloudSync Logo"
        width={180}
        height={60}
        className="h-20 sm:h-10 w-auto object-contain"
        priority
      />
      <span className="text-center  font-bold text-[30px] ">CloudSync AI</span>
    </div>
  )
}
