export interface CommunityPost {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  userId?: string | null;
}
