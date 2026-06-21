import type { Preview } from "@storybook/react";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "canvas-light",
      values: [
        { name: "canvas-light",  value: "#ffffff" },
        { name: "canvas-cream",  value: "#fbfbf5" },
        { name: "canvas-night",  value: "#000000" },
        { name: "canvas-elevated-dark", value: "#0a0a0a" },
      ],
    },
    layout: "centered",
    docs: {
      theme: undefined,
    },
    controls: {
      matchers: {
        color: /(background|color|fill|stroke)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
