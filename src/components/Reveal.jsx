import { useEffect, useRef, useState } from 'react'

/**
 * Plays the blur-fade-up entrance once the element scrolls into view.
 * Elements above the fold can opt out of waiting with `immediate`.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  immediate = false,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(immediate)

  useEffect(() => {
    if (immediate || shown) return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [immediate, shown])

  return (
    <Tag
      ref={ref}
      className={`${shown ? 'animate-blur-fade-up' : 'pre-reveal'} ${className}`}
      style={shown ? { animationDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
