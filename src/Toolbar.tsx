import type { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faComment } from "@fortawesome/free-solid-svg-icons";
import { faItalic } from '@fortawesome/free-solid-svg-icons'
import { faStrikethrough } from '@fortawesome/free-solid-svg-icons'
import "./App.scss";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null;

  const addComment = () => {
    if (editor.state.selection.empty) {
      alert("Please select text to comment on.");
      return;
    }

    const content = prompt("Enter your comment");
    if (!content) return;

    editor.chain().focus().setMark("comment", { content }).run();
  };

  return (
    <div className="toolbar">
      <FontAwesomeIcon
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`toolbar-button ${editor.isActive("bold") ? "is-active" : ""}`}
        icon={faBold}
      />
      <FontAwesomeIcon
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`toolbar-button ${editor.isActive("italic") ? "is-active" : ""}`}
        icon={faItalic}
      />
      <FontAwesomeIcon
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`toolbar-button ${editor.isActive("strike") ? "is-active" : ""}`}
        icon={faStrikethrough}
      />
      <FontAwesomeIcon
        onClick={addComment}
        className={`toolbar-button`}
        icon={faComment}
      />
    </div>
  );
};
