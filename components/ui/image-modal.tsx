"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageModalProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  title: string
}

export function ImageModal({ images, currentIndex, isOpen, onClose, title }: ImageModalProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex)

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose()
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 border-white/20 hover:bg-black/70"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {activeIndex + 1} / {images.length}
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 border-white/20 hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 border-white/20 hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Main Image */}
            <motion.img
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={images[activeIndex]}
              alt={`${title} - Screenshot ${activeIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement
                target.src = '/placeholder.jpg'
              }}
            />

            {/* Image Title */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-4 py-2 rounded-full text-sm max-w-md text-center">
              {title} - Screenshot {activeIndex + 1}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-black/50 p-2 rounded-lg">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-12 h-8 rounded overflow-hidden border-2 transition-all ${
                      index === activeIndex ? 'border-white' : 'border-white/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement
                        target.src = '/placeholder.jpg'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}