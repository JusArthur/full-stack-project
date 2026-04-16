import { useState } from "react";

interface PostFormProps {
  addPost: (author: string, content: string) => Promise<void>;
  user: any;
}

export default function PostForm({ addPost, user }: PostFormProps) {
  const defaultName = user ? user.firstName || user.username || "Member" : "";

  const [author, setAuthor] = useState(defaultName);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const finalAuthor = user ? defaultName : `${author.trim()} (Guest)`;

    try {
      await addPost(finalAuthor, content);
      setContent("");
      if (!user) setAuthor("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-[#E6E0D8] mb-10 text-left"
    >
      <h3 className="text-2xl font-bold text-[#3B2316] mb-5">
        Leave a Message
      </h3>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-5 border border-red-100">
          {error}
        </div>
      )}

      {!user && (
        <div className="mb-5">
          <label
            htmlFor="author"
            className="block text-[#3B2316] font-semibold mb-2"
          >
            Name:
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Guest Name"
            className="w-full p-3 border border-[#E6E0D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-gray-50 transition-all"
          />
        </div>
      )}

      {user && (
        <p className="mb-5 text-[#3B2316] opacity-80 bg-gray-50 p-3 rounded-xl border border-[#E6E0D8]">
          Posting as: <span className="font-bold">{defaultName}</span>
        </p>
      )}

      <div className="mb-6">
        <label
          htmlFor="content"
          className="block text-[#3B2316] font-semibold mb-2"
        >
          Message:
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows={4}
          className="w-full p-3 border border-[#E6E0D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-gray-50 transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#C8102E] text-white text-lg font-bold px-8 py-4 rounded-full hover:bg-[#A60C25] transition-all transform hover:scale-[1.02] shadow-md"
      >
        Submit Post
      </button>
    </form>
  );
}
