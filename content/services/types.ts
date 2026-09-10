export type ServiceSubsection = {
  heading: string;
  paragraphs: string[];
};

export type ServiceSection = {
  heading: string;
  level?: 2 | 3;
  paragraphs: string[];
  subsections?: ServiceSubsection[];
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  name: string;
  image: string;
  shortDescription: string;
  heroLine: string;
  commonIssues: string[];
  brands: string[];
  body: string[];
  sections?: ServiceSection[];
  faqs?: ServiceFaq[];
  seo: {
    title: string;
    description: string;
  };
};
