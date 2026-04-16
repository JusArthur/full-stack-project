import type { CommunityPost } from "./types/communitypost";

interface PostListProps {
  posts: CommunityPost[];
  deletePost: (id: string) => Promise<void>;
  user: any;
}

const ADMIN_USER_ID = "user_YOUR_ADMIN_CLERK_ID_HERE";

export default function PostList({ posts, deletePost, user }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-3xl border border-[#E6E0D8] shadow-sm">
        <p className="text-lg text-[#3B2316] opacity-70">
          No posts yet. Be the first to say hello!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {posts.map((post) => {
        const isOwner = user && user.id === post.userId;
        const isAdmin = user && user.id === ADMIN_USER_ID;
        const canDelete = isOwner || isAdmin;

        return (
          <div
            key={post.id}
            className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#E6E0D8] hover:shadow-md transition-shadow relative"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold text-[#3B2316]">
                  {post.author}
                </h4>
                <span className="text-sm text-[#3B2316] opacity-60">
                  {new Date(post.timestamp).toLocaleString()}
                </span>
              </div>

              {canDelete && (
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-sm font-bold text-[#C8102E] hover:text-white hover:bg-[#C8102E] border border-[#C8102E] px-4 py-1.5 rounded-full transition-colors focus:outline-none"
                >
                  Delete
                </button>
              )}
            </div>

            <p className="text-[#3B2316] opacity-90 whitespace-pre-wrap leading-relaxed text-lg">
              {post.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}
