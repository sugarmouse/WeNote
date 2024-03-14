"use client";

import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import { PartialBlock, BlockNoteEditor } from "@blocknote/core";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  initialData: string | undefined;
  onChange: (value: string) => void;
  editable?: boolean;
}

export default function Editor({ initialData, onChange , editable=true }: EditorProps) {
  const resolvedTheme = useTheme();
  const { edgestore } = useEdgeStore();

  const handleImageUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialData ? JSON.parse(initialData) : undefined,
    uploadFile: handleImageUpload,
  });

  return (
    <div>
      <BlockNoteView
        editable={editable}
        theme={resolvedTheme?.theme === "dark" ? "dark" : "light"}
        editor={editor}
        onChange={() => onChange(JSON.stringify(editor.document, null, 2))}
        
      />
    </div>
  );
}
