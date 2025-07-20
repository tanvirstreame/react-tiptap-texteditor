import React, { useState } from "react";

export const CommentInput = ({ onSubmit }: { onSubmit: (content: string) => void }) => {
  const [text, setText] = useState("");

  return (
    <div style={{
      background: "white",
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "5px",
      position: "absolute",
      zIndex: 1000,
    }}>
      <textarea
        rows={5}
        value={text}
        placeholder="Write your comment..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => onSubmit(text)}>Comment</button>
    </div>
  );
};
