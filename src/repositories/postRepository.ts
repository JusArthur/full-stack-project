import { portTestData } from "../testData/postTestData";
import type { CommunityPost } from "../components/home/types/communitypost";

// mock the database
let posts = [...portTestData];

export const postRepository = {
    async getAll(): Promise<CommunityPost[]> {
        return new Promise((resolve) => setTimeout(() => resolve(posts), 500)); // Simulate async delay
    },
    async add(post: CommunityPost): Promise<CommunityPost> {
        posts.unshift(post);
        return post;
    },
    async delete(id: string): Promise<void> {
        posts = posts.filter(p => p.id !== id);
    }
};