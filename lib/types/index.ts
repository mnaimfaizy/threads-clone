// Common types used across the application

export interface UserProfile {
  id: string;
  objectId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  onboarded?: boolean;
}

export interface ThreadData {
  _id: string;
  text: string;
  author: {
    _id: string;
    id: string;
    name: string;
    image: string;
  };
  community?: {
    _id: string;
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: Date;
  parentId?: string | null;
  children: ThreadData[];
}

export interface CommunityData {
  _id: string;
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  createdBy: string;
  members: UserProfile[];
}

export interface ServerActionResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  isNext: boolean;
  totalCount?: number;
}
