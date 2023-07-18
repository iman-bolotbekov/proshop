import React, { useState, useEffect } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'
import { IProduct } from '../../../models/models'
import { Link } from 'react-router-dom'

interface Slide {
  url: string
  name: string
  brand: string
  productId: number
}

interface CarouselTwoProps {
  topProducts: IProduct[]
}

const Carousel: React.FC<CarouselTwoProps> = ({ topProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides = topProducts.map((topProduct) => {
    return {
      url: topProduct.image_url,
      name: topProduct.name,
      brand: topProduct.brand,
      productId: topProduct.id,
    }
  }) as Slide[]

  const prevSlide = () => {
    const newIndex = (currentIndex + slides.length - 1) % slides.length
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [currentIndex])

  return (
    <div className="max-w-[1400px] h-[35rem] md:h-[40rem] w-full m-auto py-16 px-4 relative group z-20">
      <Link to={`/product/${slides[currentIndex].productId}`}>
        <div
          style={{
            backgroundImage: `url(${slides[currentIndex].url})`,
          }}
          className="w-full h-full bg-center bg-cover bg-no-repeat duration-500 rounded-lg relative"
        >
          <h2 className="title-2 absolute bottom-[7rem] left-[25rem]">
            {slides[currentIndex].name}
          </h2>
          <h3 className="title-3 absolute bottom-[5rem] left-[38rem]">
            {slides[currentIndex].brand}
          </h3>
        </div>
      </Link>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex justify-center py-2 w-full absolute bottom-20">
        {slides.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`text-2xl cursor-pointer ${
              currentIndex === slideIndex ? 'text-gray-200' : ''
            }`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
