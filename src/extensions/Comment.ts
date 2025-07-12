import { Mark, mergeAttributes } from "@tiptap/core";

export const Comment = Mark.create({
  name: "comment",

  addAttributes() {
    return {
      content: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-comment]",
        getAttrs: (el) => ({
          content: (el as HTMLElement).getAttribute("data-comment"),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const commentText = HTMLAttributes.content || "";
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        class: "comment",
        "data-comment": commentText,
      }),
      ["span", { class: "commented-text" }, 0],
      ["span", { class: "inline-comment" }, ` [${commentText}]`],
    ];
  },
});
