import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: React.HTMLAttributes<HTMLElement> & { orientation?: "horizontal" | "vertical" }) {
  if (orientation === "vertical") {
    return (
      <span
        data-slot="separator"
        aria-hidden="true"
        className={cn("inline-block shrink-0 bg-border w-px self-stretch", className)}
        {...props}
      />
    )
  }
  return (
    <hr
      data-slot="separator"
      aria-hidden="true"
      className={cn("shrink-0 border-none bg-border h-px w-full my-0", className)}
      {...props}
    />
  )
}

export { Separator }
