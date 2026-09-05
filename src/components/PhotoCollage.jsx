import { motion } from 'framer-motion';
import { fadeSlideUp } from '../animations';

const photos = [
  { src: '/photo-car.jpg', alt: 'Turquoise vintage car detail', rotation: '-rotate-[7deg]' },
  { src: '/photo-japan.jpg', alt: 'Mount Fuji and a Japanese pagoda', rotation: 'rotate-[7deg]' },
];

export default function PhotoCollage() {
  return (
    <motion.div
      variants={fadeSlideUp}
      className="relative mx-auto mt-[28px] h-[320px] w-full max-w-[620px] max-[809px]:h-[245px]"
      aria-label="Recent photography"
    >
      {photos.map((photo, index) => (
        <motion.figure
          key={photo.src}
          whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className={`absolute top-[34px] w-[48%] bg-white p-[10px] pb-[42px] shadow-[0_14px_26px_rgba(0,0,0,0.18)] ${index === 0 ? 'left-[5%]' : 'right-[5%] top-0'} ${photo.rotation} max-[809px]:p-[7px] max-[809px]:pb-[31px]`}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
          <figcaption className="absolute inset-x-[10px] bottom-[10px] text-center font-serif-accent text-[15px] leading-none text-[#171717] max-[809px]:inset-x-[7px] max-[809px]:bottom-[7px] max-[809px]:text-[10px]">
            One of my recent photography
          </figcaption>
        </motion.figure>
      ))}
    </motion.div>
  );
}
