import React, { useEffect, useState } from "react";
import "./ImageCarousel.css";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

const ImageCarousel = ({ url, limit, page }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchImages(url) {
      setLoading(true);
      try {
        const response = await fetch(`${url}?page=${page}&limit=${limit}`);
        const data = await response.json();

        if (data) {
          setImages(data);
        }
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (url !== "") fetchImages(url);
  }, [url, limit, page]);

  function handlePrevClick() {
    // if currentslide is set to item in first position then the prev click should point to last item
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  function handleNextClick() {
    // if currentSlide is at last item then the next click should point to first item in the list
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  if (loading) {
    return <div>Loading data... Please Wait</div>;
  }

  if (errorMsg !== null) {
    return <div>Error occured ! {errorMsg}</div>;
  }

  console.log(images);
  return (
    <>
      <div className="imageCarousel">
        <FaCircleArrowLeft
          className="arrow arrow-left"
          onClick={handlePrevClick}
        />
        {images.map((image, index) => {
          return (
            <div key={index} className="imageCarousel__image">
              <img
                className={
                  currentSlide === index
                    ? "current-image"
                    : "current-image hide-current-image"
                }
                src={image.download_url}
                alt={image.download_url}
              />
            </div>
          );
        })}
        <FaCircleArrowRight
          className="arrow arrow-right"
          onClick={handleNextClick}
        />
        <span className="circle-indicators">
          {images && images.length
            ? images.map((_, imageIndex) => (
                <button
                  key={imageIndex}
                  className={
                    currentSlide === imageIndex
                      ? "current-indicator"
                      : "current-indicator inactive-indicator"
                  }
                  onClick={() => setCurrentSlide(imageIndex)}
                ></button>
              ))
            : null}
        </span>
      </div>
      <div className="image-indicators">
        {images && images.length
          ? images.map((imageItem, imgIdx) => (
              <button
                key={imgIdx}
                className={
                  currentSlide === imgIdx
                    ? "image-indicator active"
                    : "image-indicator"
                }
                onClick={() => setCurrentSlide(imgIdx)}
              >
                <img
                  src={imageItem.download_url}
                  alt={imageItem.download_url}
                />
              </button>
            ))
          : null}
      </div>
    </>
  );
};

export default ImageCarousel;
