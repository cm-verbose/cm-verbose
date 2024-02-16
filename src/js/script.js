class Main {
  constructor() {
    this.zoomableImages = document.querySelectorAll("[data-zoomable-image]");
    this.previewWindow = document.querySelector("#preview-window"); 
    this.closePreviewDiv = document.querySelector("#close-preview"); 
    this.ini();
  }

  ini() {
    this.setImagePreviews();
  }

  /** @description opens window with image in a new view */
  setImagePreviews() {
    for (const image of this.zoomableImages) {
      image.addEventListener("click", () => {
        this.displayPreviewWindow(); 
        const src = image.src; 
        const newImage = document.createElement("img"); 
        newImage.src = src; 
        newImage.width = 1000
        this.previewWindow.appendChild(newImage); 
      });
    }
    this.closePreviewDiv.addEventListener("click", () => {
      this.closePreviewWindow(); 
      this.previewWindow.innerHTML = ""; 
    });
  }

  /** @description makes the image preview window visible */
  displayPreviewWindow(){
    this.previewWindow.style.display = "block";
    this.closePreviewDiv.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  closePreviewWindow(){
    this.previewWindow.style.display = "none";
    this.closePreviewDiv.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

new Main();
