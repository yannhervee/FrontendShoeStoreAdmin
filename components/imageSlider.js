import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto"> {/* Adjust the max width as needed */}
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="w-full h-auto px-4">
            {/* Ensure each image tag follows your specific class requirements */}
            <img src={image.url} alt={`Product Image ${index}`} className="w-full rounded-lg mb-4" />
          </div>
        ))}
      </Slider>
    </div>
  );
};


const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
};

export default ImageSlider;
