// Function to initialize the page
function initializePage() {
  const audio = document.getElementById("background-music")

  const domContentLoaded = new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", resolve)
  })

  const audioReady = new Promise((resolve) => {
    audio.addEventListener("canplaythrough", resolve)
  })

  Promise.all([domContentLoaded, audioReady]).then(() => {
    // Detect browser language and set the language accordingly
    const userLang = navigator.language || navigator.userLanguage
    const lang = userLang.startsWith("tr") ? "tr" : "en"
    setLanguage(lang)

    // Show the container after everything is loaded
    document.querySelector(".container").style.display = "block"
  })

  // Fallback to set language if audio event doesn't trigger
  setTimeout(() => {
    const userLang = navigator.language || navigator.userLanguage
    const lang = userLang.startsWith("tr") ? "tr" : "en"
    setLanguage(lang)

    // Show the container after the fallback
    document.querySelector(".container").style.display = "block"
  }, 1000)
}

function setLanguage(language) {
  console.log("Setting language to:", language)
  console.log("Commitments object:", commitments[language])

  document.getElementById("title").innerText = commitments[language].title
  const storyContainer = document.getElementById("story")
  storyContainer.innerHTML = ""
  commitments[language].story.forEach((part) => {
    if (part.title) {
      const partTitle = document.createElement("h2")
      partTitle.innerText = part.title
      storyContainer.appendChild(partTitle)
    }
    if (Array.isArray(part.paragraphs)) {
      part.paragraphs.forEach((paragraph) => {
        const partParagraph = document.createElement("p")
        partParagraph.innerHTML = paragraph
        storyContainer.appendChild(partParagraph)
      })
    } else {
      const partParagraph = document.createElement("p")
      partParagraph.innerHTML = part.paragraph
      storyContainer.appendChild(partParagraph)
    }
  })

  // Update footer message
  document.getElementById("footer-message").innerText =
    commitments[language].footer

  // Update selected button
  document.querySelectorAll(".language-selector button").forEach((button) => {
    button.classList.remove("selected")
  })
  document
    .querySelector(`.language-selector button[data-lang="${language}"]`)
    .classList.add("selected")
}

// Function to play audio
function playAudio() {
  const audio = document.getElementById("background-music")
  audio.play().catch((error) => {
    console.error("Error playing audio:", error)
  })
}
