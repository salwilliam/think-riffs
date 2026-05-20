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
    imageUrl: "https://salwilliam.com/wp-content/uploads/2020/06/The-Ride-New-Best.png",
    caption: "Photo taken in Far West Texas (Photo: Sal)",
    postSlug: "rio-grande-reflections",
  },
  {
    title: "COVINA",
    year: "2020",
    imageUrl: "https://salwilliam.com/wp-content/uploads/2020/06/COVINA_FINAL.png",
    caption: "Photo taken in Covina, California (Photo: Sal)",
    postSlug: "covina-artpoem",
  },
  {
    title: "TRAILBREAKING",
    year: "2018",
    imageUrl: "https://salwilliam.com/wp-content/uploads/2020/06/trailbreaking-final.png",
    caption: "Photo taken in the Iroquoia section of the Bruce trail (Photo: Sal)",
  },
  {
    title: "HIGHWAY OF THE IROQUOIS",
    year: "2017",
    imageUrl: "https://salwilliam.com/wp-content/uploads/2021/08/Highway-of-the-Iroquois.png",
    caption: "Photo taken on Silver Lake, Ontario (Photo: Sal)",
  },
  {
    title: "FLOAT",
    year: "2018",
    imageUrl: "https://salwilliam.com/wp-content/uploads/2020/06/FLOAT_final.png",
    caption: "Photo taken in the Iroquoia section of the Bruce trail (Photo: Sal)",
  },
  {
    title: "THE UNIVERSE DOESN'T GIVE A FUCK",
    year: "2024",
    imageUrl: "https://salwilliam.com/wp-content/uploads/2018/01/the-universe-doesnt-give-a-fuck.png",
    caption: "Photo: John Kraus",
  },
];
