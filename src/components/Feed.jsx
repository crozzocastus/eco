import React from "react";
import PostCard from "./PostCard";

const Feed = ({ posts = [], currentUser, onSelectActivity }) => (
  <div className="flex flex-col gap-6">
    {posts.map((post, idx) => (
      <PostCard
        key={idx}
        {...post}
        userRole={post.userRole}
        userJoinedAt={post.userJoinedAt}
        userAvatarUrl={post.userAvatarUrl}
        likes={post.likes}
        currentUser={currentUser}
        activities={post.activities}
        onSelectActivity={onSelectActivity}
      />
    ))}
  </div>
);

export default Feed;
