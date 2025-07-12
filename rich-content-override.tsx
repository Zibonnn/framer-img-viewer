import { Override } from "framer"
import { useState, useEffect } from "react"

// Image Lightbox Override for Rich Content
export const ImageLightbox: Override = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [currentImage, setCurrentImage] = useState("")

    useEffect(() => {
        const handleImageClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.tagName === "IMG") {
                e.preventDefault()
                e.stopPropagation()
                const img = target as HTMLImageElement
                setCurrentImage(img.src)
                setIsOpen(true)
            }
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false)
            }
        }

        // Add click listeners to all images
        const images = document.querySelectorAll('[data-framer-component-type="RichText"] img')
        images.forEach(img => {
            img.addEventListener("click", handleImageClick)
            // Add styles
            const imgElement = img as HTMLImageElement
            imgElement.style.cursor = "pointer"
            imgElement.style.transition = "transform 0.3s ease"
            imgElement.style.borderRadius = "8px"
            
            // Add hover effect
            imgElement.addEventListener("mouseenter", () => {
                imgElement.style.transform = "scale(1.05)"
            })
            imgElement.addEventListener("mouseleave", () => {
                imgElement.style.transform = "scale(1)"
            })
        })

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            images.forEach(img => {
                img.removeEventListener("click", handleImageClick)
            })
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return {
        style: {
            position: "relative",
        },
        children: [
            // Original content
            undefined,
            // Lightbox modal
            isOpen && (
                <div
                    key="lightbox"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                        zIndex: 999999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => setIsOpen(false)}
                >
                    <img
                        src={currentImage}
                        alt="Lightbox"
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            objectFit: "contain",
                            borderRadius: "8px",
                            boxShadow: "0 0 50px rgba(0,0,0,0.5)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            color: "white",
                            fontSize: "30px",
                            fontWeight: "bold",
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            borderRadius: "50%",
                            cursor: "pointer",
                        }}
                        onClick={() => setIsOpen(false)}
                    >
                        ×
                    </div>
                </div>
            ),
        ],
    }
}

// Alternative simpler version
export const SimpleImageLightbox: Override = () => {
    useEffect(() => {
        const addLightboxToImages = () => {
            const images = document.querySelectorAll('[data-framer-component-type="RichText"] img')
            
            images.forEach((img, index) => {
                const imgElement = img as HTMLImageElement
                
                // Skip if already processed
                if (imgElement.dataset.lightboxProcessed) return
                
                // Mark as processed
                imgElement.dataset.lightboxProcessed = "true"
                
                // Add styles
                imgElement.style.cursor = "pointer"
                imgElement.style.transition = "all 0.3s ease"
                imgElement.style.borderRadius = "8px"
                
                // Add hover effect
                imgElement.addEventListener("mouseenter", () => {
                    imgElement.style.transform = "scale(1.05)"
                    imgElement.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)"
                })
                
                imgElement.addEventListener("mouseleave", () => {
                    imgElement.style.transform = "scale(1)"
                    imgElement.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
                })
                
                // Add click handler
                imgElement.addEventListener("click", (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    
                    // Create lightbox
                    const lightbox = document.createElement("div")
                    lightbox.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.9);
                        z-index: 999999;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    `
                    
                    // Create image
                    const lightboxImg = document.createElement("img")
                    lightboxImg.src = imgElement.src
                    lightboxImg.alt = imgElement.alt
                    lightboxImg.style.cssText = `
                        max-width: 90%;
                        max-height: 90%;
                        object-fit: contain;
                        border-radius: 8px;
                        box-shadow: 0 0 50px rgba(0,0,0,0.5);
                    `
                    
                    // Create close button
                    const closeBtn = document.createElement("div")
                    closeBtn.innerHTML = "×"
                    closeBtn.style.cssText = `
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        color: white;
                        font-size: 30px;
                        font-weight: bold;
                        width: 50px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: rgba(0,0,0,0.5);
                        border-radius: 50%;
                        cursor: pointer;
                    `
                    
                    // Add elements
                    lightbox.appendChild(lightboxImg)
                    lightbox.appendChild(closeBtn)
                    document.body.appendChild(lightbox)
                    
                    // Close handlers
                    const closeLightbox = () => {
                        lightbox.remove()
                        document.removeEventListener("keydown", handleKeyDown)
                    }
                    
                    const handleKeyDown = (e: KeyboardEvent) => {
                        if (e.key === "Escape") closeLightbox()
                    }
                    
                    lightbox.addEventListener("click", (e) => {
                        if (e.target === lightbox || e.target === closeBtn) {
                            closeLightbox()
                        }
                    })
                    
                    document.addEventListener("keydown", handleKeyDown)
                })
            })
        }
        
        // Initial run
        addLightboxToImages()
        
        // Re-run on content changes
        const observer = new MutationObserver(() => {
            setTimeout(addLightboxToImages, 100)
        })
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        })
        
        return () => observer.disconnect()
    }, [])
    
    return {}
} 