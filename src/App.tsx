import Mention from "@tiptap/extension-mention";
import "./App.scss";
import suggestion from "./suggestion";

import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { Toolbar } from "./Toolbar";
import "./App.scss";
import { Comment } from "./extensions/Comment";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Color from "@tiptap/extension-color";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";

export default () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion,
      }),
      Comment,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Text,
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      Link.configure({
        protocols: [
          {
            scheme: "tel",
            optionalSlashes: true,
          },
        ],
      }),
      Dropcursor,
      Image,
    ],
    content: `
      <p>
        Try to select <em>this text</em> to see what we call the bubble menu.
      </p>
      <p>
        Neat, isn’t it? Add an empty paragraph to see the floating menu.
      </p>
    `,
    onSelectionUpdate({ editor }) {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to, " ");
      console.log(text, "asdsada");
    },
  });

  return (
    <>
      {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <Toolbar editor={editor} />
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};
