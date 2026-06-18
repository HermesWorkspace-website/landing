export interface Founder {
  id: number;
  founderId: string;
  firstName: string;
  lastName: string;
  role: string;
  title: string;
  summaryBio: string;
  fullBio: string[];
  quote: string;
  focusAreas: string[];
  accentColor: string;
  avatarInitials: string;
  photo: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
  };

  principles?: {
    title: string;
    body: string;
  }[];

  vision?: {
    heading: string;
    paragraphs: string[];
  };

}
