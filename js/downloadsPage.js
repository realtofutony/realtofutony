// List of files in the downloads folder
const files = [
    { name: "Birthday in September_TEST.mp3", description: "bday in sept test" },
    { name: "promo_income_new1.mp4", description: "income vid 1" },
    { name: "promo_income_new2.mp4", description: "income vid 2" },
    { name: "music_bdayConcert_chords.pdf", description: "bug fest Chords" },
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