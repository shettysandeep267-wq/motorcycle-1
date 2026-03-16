export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-[#ff7a00] font-semibold tracking-wide uppercase text-xs sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-white/65 text-sm sm:text-base leading-relaxed">{description}</p>
      ) : null}
    </div>
  )
}

