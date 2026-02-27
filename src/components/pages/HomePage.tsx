import { Link } from "react-router-dom";
import { PostForm } from "../home/PostForm";
import { PostList } from "../home/PostList";
import { useCommunityPosts } from "../../hooks/useCommunityPosts";

export function HomePage() {
  /**
   * Using Hook-Service-Repository architecture.
   * The hook manages state, validation logic, and data access.
   */
  const { posts, addPost, removePost, isLoading, error } = useCommunityPosts();

  return (
    <main id="main" className="mx-auto max-w-6xl px-5 py-10">
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

      {/* Community Board Section */}
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
          <PostForm onAddPost={addPost} />

          {isLoading ? (
            <p className="text-center">Loading posts...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <PostList posts={posts} onRemovePost={removePost} />
          )}
        </div>
      </section>
    </main>
  );
}
