import React, { useState } from 'react';
import axios from 'axios';

function Apps() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        
      const response = await axios.post('http://localhost:5000/you/download', { url }, { responseType: 'blob' });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(downloadUrl);
      setMessage('Video downloaded successfully.');
    } catch (error) {
      setMessage('An error occurred while downloading the video.');
    }
  };

  return (
    <div className="container">
      <h1>YouTube Video Downloader</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={handleInputChange} placeholder="Enter YouTube video URL" />
        <button type="submit">Download</button>
      </form>
      {message && <p className="message">{message}</p>}
      {downloadLink && (
        <div className="download-link">
          <p>Download Link:</p>
          <a href={downloadLink} download="video.mp4">
            Download Video
          </a>
        </div>
      )}
    </div>
  );
}


export default Apps;
