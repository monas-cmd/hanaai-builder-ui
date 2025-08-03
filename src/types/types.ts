export interface UserData {
  name: string;
  businessName: string;
  domain: string;
  colorPalette: string;
  theme: string;
  websiteType: 'static' | 'dynamic';
  isPublished: boolean;
}

export type BuilderStep = 
  | 'welcome' 
  | 'name' 
  | 'business' 
  | 'domain' 
  | 'colors' 
  | 'theme' 
  | 'type' 
  | 'preview' 
  | 'publish';