import type { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faComment, faVideo } from "@fortawesome/free-solid-svg-icons";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
import { faStrikethrough } from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import { useState } from "react";
import { CommentInput } from "./components/CommentInput.tsx";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar = ({ editor }: ToolbarProps) => {


  const [showPopup, setShowPopup] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  if (!editor) return null;

  const handleCommentClick = () => {
    const { from, to } = editor.state.selection;
    if (from === to) return;

    const domSelection = window.getSelection();
    const range = domSelection?.getRangeAt(0);
    if (range) {
      const rect = range.getBoundingClientRect();
      setPos({ x: rect.left, y: rect.bottom });
    }

    setShowPopup(true);
  };

  const submitComment = (content: string) => {
    editor.chain().focus().setMark("comment", { content }).run();

    setShowPopup(false);
  };

  const addVideo = () => {
    const url = prompt("Paste a video URL");
    if (!url || !editor) return;

    editor.chain().focus().setVideoEmbed(url).run();
  };

  

  return (
    <div className="toolbar">
      <FontAwesomeIcon
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`toolbar-button ${
          editor.isActive("bold") ? "is-active" : ""
        }`}
        icon={faBold}
      />
      <FontAwesomeIcon
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`toolbar-button ${
          editor.isActive("italic") ? "is-active" : ""
        }`}
        icon={faItalic}
      />
      <FontAwesomeIcon
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`toolbar-button ${
          editor.isActive("strike") ? "is-active" : ""
        }`}
        icon={faStrikethrough}
      />
      <FontAwesomeIcon
        onClick={handleCommentClick}
        className={`toolbar-button`}
        icon={faComment}
      />
      <FontAwesomeIcon
        onClick={addVideo}
        className={`toolbar-button`}
        icon={faVideo}
      />
      {showPopup && (
        <div style={{ position: "absolute", top: pos.y + 5, left: pos.x }}>
          <CommentInput onSubmit={submitComment} />
        </div>
      )}
    </div>
  );
};
