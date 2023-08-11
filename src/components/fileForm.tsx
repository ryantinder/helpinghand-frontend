import React, { useState } from "react";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Submit the form or do something else with the file data
  };

  if (selectedFile) {
    // Do something with the selected file, such as upload it to a server
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelected} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default FileUpload;
