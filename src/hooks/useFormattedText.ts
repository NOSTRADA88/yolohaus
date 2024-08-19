import { useCallback } from "react";
import {
  CardDescription,
  CardDescriptionParagraph,
  CardDescriptionText,
} from "../interfaces";

const useFormattedText = () => {
  const truncateText = useCallback(
    (text: string | undefined, limit: number) => {
      if (!text) return "";
      return text.length <= limit ? text : text.substring(0, limit);
    },
    []
  );

  const getFirstTwoParagraphsText = useCallback(
    (blogText: CardDescription[]) => {
      const paragraphs = blogText
        .filter(
          (block): block is CardDescriptionParagraph =>
            block.type === "paragraph"
        )
        .slice(0, 2);

      const text = paragraphs
        .map((paragraph) =>
          paragraph.children
            .map((child: CardDescriptionText) => truncateText(child.text, 300))
            .join(" ")
        )
        .join(" ");

      return text + (paragraphs.length > 1 ? "..." : "");
    },
    [truncateText]
  );

  return { truncateText, getFirstTwoParagraphsText };
};

export default useFormattedText;
