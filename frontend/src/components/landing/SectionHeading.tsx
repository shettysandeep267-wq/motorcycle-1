import { motion } from 'framer-motion'

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
    <motion.div
      className="max-w-2xl"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow ? (
        <p className="text-[#ff7a00] font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
          {eyebrow}
        </p>
      ) : null}
      <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-[#ff7a00] to-amber-300/80" />
      <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-white/60 text-sm sm:text-base leading-relaxed">{description}</p>
      ) : null}
    </motion.div>
  )
}
