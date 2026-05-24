export interface ArtItem {
  title: string;
  year: string;
  imageUrl: string;
  caption: string;
  postSlug?: string;
}

export const artItems: ArtItem[] = [
  {
    title: "THE RIDE",
    year: "2017",
    imageUrl: "/images/The-Ride-New-Best.jpg",
    caption: "Photo taken in Far West Texas (Photo: Sal)",
    postSlug: "rio-grande-reflections",
  },
  {
    title: "COVINA",
    year: "2020",
    imageUrl: "/images/COVINA_FINAL.jpg",
    caption: "Photo taken in Covina, California (Photo: Sal)",
    postSlug: "covina-artpoem",
  },
  {
    title: "TRAILBREAKING",
    year: "2018",
    imageUrl: "/images/trailbreaking-final.jpg",
    caption: "Photo taken in the Iroquoia section of the Bruce trail (Photo: Sal)",
  },
  {
    title: "HIGHWAY OF THE IROQUOIS",
    year: "2017",
    imageUrl: "/images/Highway-of-the-Iroquois.jpg",
    caption: "Photo taken on Silver Lake, Ontario (Photo: Sal)",
  },
  {
    title: "FLOAT",
    year: "2018",
    imageUrl: "/images/FLOAT_final.jpg",
    caption: "Photo taken in the Iroquoia section of the Bruce trail (Photo: Sal)",
  },
  {
    title: "THE UNIVERSE DOESN'T GIVE A FUCK",
    year: "2024",
    imageUrl: "/images/the-universe-doesnt-give-a-fuck.jpg",
    caption: "Photo: John Kraus",
  },
  {
    title: "ROUNDING THE BEND",
    year: "2025",
    imageUrl: "/images/rounding-the-bend.jpg",
    caption: "Photo taken in Niagara, Ontario (Photo: Sal)",
  },
];
