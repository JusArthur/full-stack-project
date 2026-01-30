import { useState } from "react";
import { Link } from "react-router-dom";
import { PostForm } from "../home/PostForm";
import { PostList } from "../home/PostList";
import type { CommunityPost } from "../home/types/communitypost";

export function HomePage() {
  // Initial dummy state to show the list functionality
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      author: "Team Hortons",
      content:
        "Welcome to our new community board! Let us know what you think about our menu.",
      timestamp: new Date(),
    },
  ]);

  // Handler for adding elements
  const handleAddPost = (newPost: CommunityPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Handler for removing elements
  const handleRemovePost = (idToDelete: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== idToDelete));
  };

  return (
    <main id="main" className="mx-auto max-w-6xl px-5 py-10">
      {/* Hero / Landing Section */}
      <section className="text-center py-16 md:py-24 bg-white rounded-3xl shadow-xl border border-[#E6E0D8] mb-16 relative overflow-hidden">
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#3B2316] mb-6 tracking-tight">
            Team <span className="text-[#C8102E]">Hortons</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#3B2316] max-w-3xl mx-auto leading-relaxed opacity-80 mb-10">
            Fresh coffee, fresh donuts, and fresh code.{" "}
            <br className="hidden md:block" />
            The best way to start your sprint.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/menu"
              className="bg-[#C8102E] text-white text-lg font-bold px-8 py-4 rounded-full hover:bg-[#A60C25] transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              View Menu 🍩
            </Link>
            <Link
              to="/orders"
              className="bg-[#3B2316] text-white text-lg font-bold px-8 py-4 rounded-full hover:bg-[#2A180F] transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              Start Order ☕
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section: Community Board */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center mb-10 border-t border-[#E6E0D8] pt-10">
          <h2 className="text-3xl font-bold text-[#3B2316] mb-3">
            Community Board
          </h2>
          <p className="text-[#3B2316] opacity-70">
            Leave a note for the team or see what others are saying.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-8">
          <PostForm onAddPost={handleAddPost} />

          <PostList posts={posts} onRemovePost={handleRemovePost} />
        </div>
      </section>
    </main>
  );
}
