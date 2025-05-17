const form = document.querySelector("#meme-form");
const errorBox = document.querySelector("#form-errors");
const memeGallery = document.querySelector("#meme-gallery");

// Live preview elements
const imagePreview = document.querySelector("#image-preview");
const previewTopText = document.querySelector("#meme-top-text");
const previewBottomText = document.querySelector("#meme-bottom-text");

// Hide preview image and text on initial load
imagePreview.style.display = "none";
previewTopText.style.opacity = "0";
previewBottomText.style.opacity = "0";

// Function to auto-fit text inside its container
function autoFitText(element, maxFontSize = 24, minFontSize = 8) {
  const parent = element.parentElement;
  element.style.fontSize = `${maxFontSize}px`;

  while (
    (element.scrollHeight > parent.clientHeight / 2 ||
      element.scrollWidth > parent.clientWidth) &&
    parseFloat(element.style.fontSize) > minFontSize
  ) {
    element.style.fontSize = `${parseFloat(element.style.fontSize) - 1}px`;
  }
}

// Live update for image preview
document.querySelector("#image-url").addEventListener("input", (e) => {
  const url = e.target.value.trim();
  if (url === "") {
    imagePreview.style.display = "none";
    imagePreview.src = "";
  } else {
    imagePreview.src = url;
    imagePreview.style.display = "block";
  }
});

// Live update for top and bottom text with show/hide and scaling
document.querySelector("#top-text").addEventListener("input", (e) => {
  const value = e.target.value.trim();
  previewTopText.textContent = value;
  previewTopText.style.opacity = value ? "1" : "0";
  autoFitText(previewTopText);
});

document.querySelector("#bottom-text").addEventListener("input", (e) => {
  const value = e.target.value.trim();
  previewBottomText.textContent = value;
  previewBottomText.style.opacity = value ? "1" : "0";
  autoFitText(previewBottomText);
});

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  errorBox.innerHTML = "";

  const inputs = form.querySelectorAll("input");
  let formIsValid = true;

  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      formIsValid = false;
      const message = input.dataset.error || "Please fill out this field.";
      errorBox.innerHTML += `<p>${message}</p>`;
      input.classList.add("input-error");
    } else {
      input.classList.remove("input-error");
    }
  });

  if (formIsValid) {
    const imageUrl = document.querySelector("#image-url").value;
    const topTextValue = document.querySelector("#top-text").value;
    const bottomTextValue = document.querySelector("#bottom-text").value;

    // Create meme element
    const meme = document.createElement("div");
    meme.classList.add("meme");

    meme.innerHTML = `
      <div class="meme-container">
        <img src="${imageUrl}" alt="Meme Image" />
        <div class="meme-text top">${topTextValue}</div>
        <div class="meme-text bottom">${bottomTextValue}</div>
        <button class="delete-meme">✖</button>
      </div>
    `;

    // Add delete button functionality
    meme.querySelector(".delete-meme").addEventListener("click", () => {
      meme.remove();
    });

    // Append meme to gallery
    memeGallery.appendChild(meme);

    // Auto-fit text on the final meme
    const newTop = meme.querySelector(".meme-text.top");
    const newBottom = meme.querySelector(".meme-text.bottom");
    autoFitText(newTop);
    autoFitText(newBottom);

    // Reset form and preview
    form.reset();
    imagePreview.style.display = "none";
    imagePreview.src = "";
    previewTopText.textContent = "";
    previewTopText.style.opacity = "0";
    previewBottomText.textContent = "";
    previewBottomText.style.opacity = "0";
  }
});

// Live input validation
form.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("input-error");
    errorBox.innerHTML = "";
  });
});
