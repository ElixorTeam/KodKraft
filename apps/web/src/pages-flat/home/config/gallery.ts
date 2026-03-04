import GalleryImage1 from "@/shared/assets/gallery/gallery-1.webp";
import GalleryImage2 from "@/shared/assets/gallery/gallery-2.webp";
import GalleryImage3 from "@/shared/assets/gallery/gallery-3.webp";
import GalleryImage4 from "@/shared/assets/gallery/gallery-4.webp";
import GalleryImage5 from "@/shared/assets/gallery/gallery-5.webp";
import GalleryImage6 from "@/shared/assets/gallery/gallery-6.webp";
import GalleryImage7 from "@/shared/assets/gallery/gallery-7.webp";
import GalleryImage8 from "@/shared/assets/gallery/gallery-8.webp";
import GalleryImage9 from "@/shared/assets/gallery/gallery-9.webp";
import GalleryImage10 from "@/shared/assets/gallery/gallery-10.webp";

const gallery = [
  {
    images: [
      {
        src: GalleryImage1,
        alt: "Фото из урока"
      }
    ]
  },
  {
    type: "grid",
    images: [
      {
        src: GalleryImage2,
        alt: "Фото из урока"
      },
      {
        src: GalleryImage3,
        alt: "Фото из урока"
      },
      {
        src: GalleryImage4,
        alt: "Фото из урока"
      },
      {
        src: GalleryImage5,
        alt: "Фото из урока"
      }
    ]
  },
  {
    type: "grid",
    images: [
      {
        src: GalleryImage6,
        alt: "Фото из урока"
      },
      {
        src: GalleryImage7,
        alt: "Фото из урока"
      },
      {
        src: GalleryImage8,
        alt: "Фото из урока"
      },
      {
        src: GalleryImage9,
        alt: "Фото из урока"
      }
    ]
  },
  {
    images: [
      {
        src: GalleryImage10,
        alt: "Фото из урока"
      }
    ]
  }
];

export { gallery };
