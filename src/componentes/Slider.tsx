import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import './css/Slider.css';

function Slider() {
  const images = [
    {
      original: "/img/tiendamusica1.jpg",
      thumbnail: "/img/tiendamusica1.jpg",
    },
    {
      original: "/img/tiendamusica2.png",
      thumbnail: "/img/tiendamusica2.png",
    },
    {
      original: "/img/tiendamusica3.jpg",
      thumbnail: "/img/tiendamusica3.jpg",
    },
  ];

  return (
    <div className="slider-container"> {/* Aplica la clase al div */}
      <ImageGallery items={images} />
    </div>
  );
}

export default Slider;

