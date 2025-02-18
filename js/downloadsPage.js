// List of files in the downloads folder
const files = [
    { name: "GRjoyride_musicVideo_FINAL.mp4", description: "GR joyride music video" },
  ];
  
  // Get the container where download links will be added
  const downloadList = document.getElementById("download-list");
  
  // Loop through the files and create download links
  files.forEach(file => {
    console.log(file); // Check if this logs the file objects
    const fileElement = document.createElement("div");
    fileElement.classList.add("download-item");
  
    fileElement.innerHTML = `
      <p>${file.description}</p>
      <a href="downloads/${file.name}" download class="download-button">Download</a>
    `;
  
    downloadList.appendChild(fileElement);
  });