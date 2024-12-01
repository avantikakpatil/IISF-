import React, { useState } from "react";

const DataUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        // Logic to upload file
        console.log("File uploaded:", file.name);
        alert(`File "${file.name}" uploaded successfully!`);
    };

    return (
        <div>
            <h1>Upload Data</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload</button>
        </div>
    );
};

export default DataUpload;
