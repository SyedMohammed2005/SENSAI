"use client";
// This makes the component run on the client side (browser)

import { useState } from "react";
// React hook to manage component state

import MDEditor from "@uiw/react-md-editor";
// Markdown editor component for writing and previewing content

import { Button } from "@/components/ui/button";
// Custom Button component

import { Edit, Monitor } from "lucide-react";
// Icons used for Edit and Preview modes


// Component that shows and edits the cover letter content
const CoverLetterPreview = ({ content }) => {

  // State to store current markdown content
  const [value, setValue] = useState(content);

  // State to control mode: "preview" or "edit"
  const [mode, setMode] = useState("preview");

  return (
    <div className="py-4 space-y-3">

      {/* Button to toggle between Edit and Preview mode */}
      <Button 
        onClick={() => setMode(mode === "preview" ? "edit" : "preview")}
      >
        {/* Show different icon based on mode */}
        {mode === "preview" ? <Edit /> : <Monitor />}

        {/* Show different text based on mode */}
        {mode === "preview" ? " Edit" : " Preview"}
      </Button>

      {/* Markdown Editor Component */}
      <MDEditor
        value={value}          // Current content
        onChange={setValue}    // Update content when user types
        preview={mode}         // Control whether it's in edit or preview mode
        height={700}           // Set editor height
      />

    </div>
  );
};

// Export component so it can be used in other files
export default CoverLetterPreview;