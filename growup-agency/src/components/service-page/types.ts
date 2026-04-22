
export interface ServicePageData {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;

  ctaPrimary: string;
  ctaSecondary: string;
  ctaSecondaryLink: string;

  projects: {
    label: string;
    title: string;
    allLink: string;
    items: {
      slug: string;
      title: string;
      tagline: string;
      client: string;
      image: string;
    }[];
  };

  process: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    steps: {
      title: string;
      text: string;
    }[];
  };

  offers: {
    label: string;
    title: string;
    subtitle: string;
    points: string[];
    image: string;
    imageAlt: string;
  }[];

  

  faq: {
    titleLine1: string;
    titleLine2: string;
    items: {
      question: string;
      answer: string;
    }[];
  };

  brief: {
    title: string;
    text: string;
    link: string;
    button: string;
  };
}
export interface ServiceOffer {
  label: string;
  title: string;
  subtitle: string;
  points: string[];
  image: string;
  imageAlt: string;
}