"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@/components/Profile";

const UserProfile = ({params}) => {
  const searchParams = useSearchParams();

  const userName = searchParams.get("name")

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };

    if (params?.id) fetchPosts();
  }, []);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${!loading ? userName : ""} profile page. Explore ${userName}'s exceptional prompts and be inspired!`}
      data={posts}
    />
  );
};

export default UserProfile;
