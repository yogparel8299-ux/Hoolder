"use client";

import { useState } from "react";
import { supabaseBrowser } from "../lib/supabase/browser";

export function DatasetUploadFields() {
  const [uploading, setUploading] = useState(false);
  const [path, setPath] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);

  async function uploadFile(file: File) {
    setUploading(true);

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storagePath = `uploads/${Date.now()}-${safeName}`;

    const { error } = await supabaseBrowser.storage
      .from("datasets")
      .upload(storagePath, file, {
        upsert: false
      });

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    setPath(storagePath);
    setFileName(file.name);
    setFileSize(file.size);
    setUploading(false);
  }

  return (
    <div className="card">
      <h3>Dataset File</h3>
      <p>Upload CSV, JSON, TXT or ZIP file for your dataset listing.</p>

      <input
        className="input"
        type="file"
        accept=".csv,.json,.txt,.zip"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
        }}
      />

      {uploading ? <p>Uploading...</p> : null}
      {path ? <p>Uploaded: {fileName}</p> : null}

      <input type="hidden" name="storage_path" value={path} />
      <input type="hidden" name="file_name" value={fileName} />
      <input type="hidden" name="file_size_bytes" value={fileSize} />
    </div>
  );
}
