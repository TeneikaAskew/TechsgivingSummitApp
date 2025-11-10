
export enum SessionType {
  Keynote = 'Keynote',
  Workshop = 'Workshop',
  DesignTrack = 'Design Track',
  AIMLTrack = 'AI & ML Track',
}

export interface Session {
  id: string;
  time: string;
  type: SessionType;
  title: string;
  location: string;
  bookmarked: boolean;
  day: 'Nov 22' | 'Nov 23' | 'Nov 24';
}

export interface Sponsor {
  id: string;
  name: string;
  industry: string;
  logo: string;
  tags: string[];
}
