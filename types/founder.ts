export interface Founder {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  title: string;
  bio: string;
  quote: string;
  focusAreas: string[];
  accentColor: string;
  avatarInitials: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
  };
}
