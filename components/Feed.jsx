"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

// Component to display a list of Prompt Cards
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  // State hooks for search text and posts
  const [searchText, setSearchText] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);

  // Function to fetch all prompts/posts from the API
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
    setDisplayedPosts(data);
  };

  // useEffect hook to fetch all posts once the component is mounted
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to filter posts based on a provided data (can be tag or username)
  const filteredPosts = (data) => {
    const regex = new RegExp(data, 'i');

    return allPosts.filter(post =>
      regex.test(post.creator.username) ||
      regex.test(post.prompt) ||
      regex.test(post.tag)
    );
  }

  // Function to handle changes in the search bar
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setTimeout(() => {
      const filtered = filteredPosts(e.target.value);
      setDisplayedPosts(filtered);
    }, 500);
  }

  // Function to handle when a tag is clicked, initiating a search
  const handleTagClick = (tag) => {
    setSearchText(tag);
    setTimeout(() => {
      const filtered = filteredPosts(tag);
      setDisplayedPosts(filtered);
    }, 500);
  }

  return (
    <section className="feed">
      {/* Search bar */}
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* Display list of filtered prompt cards */}
      <PromptCardList
        data={displayedPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
}

export default Feed;
