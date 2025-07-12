import { Node, mergeAttributes, type Command } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    videoEmbed: {
      setVideoEmbed: (url: string) => ReturnType;
    };
  }
}

export const VideoEmbed = Node.create({
  name: "videoEmbed",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      type: {
        default: "iframe",
      },
      width: {
        default: "100%",
      },
      height: {
        default: "315",
      },
      frameborder: {
        default: "0",
      },
      allowfullscreen: {
        default: true,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "iframe[src]",
      },
      {
        tag: "video[src]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const attrs = mergeAttributes(HTMLAttributes, {
      width: "200",
      height: "200",
    });

    if (attrs.type === "html5" || (attrs.src && attrs.src.endsWith(".mp4"))) {
      return ["video", { ...attrs, controls: true }];
    }

    return [
      "iframe",
      {
        ...attrs,
        frameborder: "0",
        allowfullscreen: "true",
      },
    ];
  },

  addCommands() {
    return {
      setVideoEmbed:
        (url: string): Command =>
        ({ commands }) => {
          let src = url;
          let type: "iframe" | "html5" = "iframe";

          if (url.includes("watch?v=")) {
            const videoId = url.split("watch?v=")[1].split("&")[0];
            src = `https://www.youtube.com/embed/${videoId}`;
          } else if (url.includes("youtu.be/")) {
            const videoId = url.split("youtu.be/")[1].split("?")[0];
            src = `https://www.youtube.com/embed/${videoId}`;
          } else if (url.includes("/shorts/")) {
            const videoId = url.split("/shorts/")[1].split("?")[0];
            src = `https://www.youtube.com/embed/${videoId}`;
          } else if (url.includes("vimeo.com")) {
            const id = url.split("/").pop()?.split("?")[0];
            if (id) {
              src = `https://player.vimeo.com/video/${id}`;
            }
          } else if (url.endsWith(".mp4") || url.includes(".mp4")) {
            type = "html5";
          }

          return commands.insertContent({
            type: "videoEmbed",
            attrs: {
              src,
              type,
            },
          });
        },
    };
  },
});
