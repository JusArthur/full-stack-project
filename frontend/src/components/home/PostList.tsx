import type { CommunityPost } from "./types/communitypost";

interface PostListProps {
  posts: CommunityPost[];
  onRemovePost: (id: string) => void;
}

export function PostList({ posts, onRemovePost }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-[#3B2316] opacity-60 italic">
        No messages yet. Be the first to post!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-[#3B2316] text-xl font-bold mb-4">Community Board</h3>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-white p-5 rounded-lg shadow-sm border border-[#E6E0D8] flex justify-between items-start group hover:shadow-md transition-all"
          >
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-[#3B2316]">{post.author}</span>
                <span className="text-xs text-gray-500">
                  • {post.timestamp.toLocaleDateString()}
                </span>
              </div>
              <p className="text-[#3B2316] leading-relaxed">{post.content}</p>
            </div>

            <button
              onClick={() => onRemovePost(post.id)}
              className="text-gray-400 hover:text-[#C8102E] font-semibold text-sm px-2 py-1 rounded hover:bg-[#F7F3E9] transition-colors"
              aria-label="Delete post"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
