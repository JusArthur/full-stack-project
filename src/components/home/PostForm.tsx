import { useState } from "react";
import type { CommunityPost } from "./types/communitypost";

interface PostFormProps {
  onAddPost: (post: CommunityPost) => void;
}

export function PostForm({ onAddPost }: PostFormProps) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!author.trim() || !content.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    const newPost: CommunityPost = {
      id: crypto.randomUUID(),
      author: author.trim(),
      content: content.trim(),
      timestamp: new Date(),
    };

    onAddPost(newPost);

    // Reset form
    setAuthor("");
    setContent("");
    setError("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-[#E6E0D8] mb-8">
      <h3 className="text-[#3B2316] text-xl font-bold mb-4">
        Leave a Note for the Team
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-semibold text-[#3B2316] mb-1"
          >
            Your Name
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border border-[#E6E0D8] rounded focus:outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-semibold text-[#3B2316] mb-1"
          >
            Message
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full p-2 border border-[#E6E0D8] rounded focus:outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]"
            placeholder="What's on your mind?"
          />
        </div>

        {error && <p className="text-[#C8102E] text-sm font-medium">{error}</p>}

        <button
          type="submit"
          className="bg-[#C8102E] text-white px-6 py-2 rounded-full font-bold hover:bg-[#A60C25] transition-colors cursor-pointer"
        >
          Post Message
        </button>
      </form>
    </div>
  );
}
