import React, { useState } from 'react';

const Slideshow = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative max-w-xl mx-auto">
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`}
                className="w-full h-96 object-cover rounded-lg" />
            <button onClick={goToPrevious}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full focus:outline-none">
                &#10094;
            </button>
            <button onClick={goToNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full focus:outline-none">
                &#10095;
            </button>
        </div>
    );
};

export default Slideshow;