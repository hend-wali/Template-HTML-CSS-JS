//local storage
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main--color", mainColors);

  // remove active from all list item
  document.querySelectorAll(".colors-list li").forEach((el) => {
    el.classList.remove("active");

    // add active on color in local storage
    if (el.dataset.color === mainColors) {
      el.classList.add("active");
    }
  });
}
//background random option
let backgroundOption = true;

//var to control intervale background
let backgroundInterval;

//check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  //remove active class from all span
  document.querySelectorAll(".random-bakgrounds span").forEach((el) => {
    el.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-bakgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-bakgrounds .no").classList.add("active");
  }
}

//click on Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle Class Fa-spin For Rotation on Self
  this.classList.toggle("fa-spin");

  // Toggle Class Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};

//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // set color on root
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );

    //set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    //remove active from all li children
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    //add active on one
    e.target.classList.add("active");
  });
});

//switch random background option
const randomBackgrounds = document.querySelectorAll(".random-bakgrounds span");

randomBackgrounds.forEach((sp) => {
  sp.addEventListener("click", (e) => {
    //remove active from all li children
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    //add active on one
    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImg();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
      0;
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

//get Array of images
let imgArray = ["img1.jpeg", "img2.png", "img3.jpeg", "img4.jpg", "img5.jpg"];

//fct to randomize images
function randomizeImg() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //get random number
      let randomNumber = Math.floor(Math.random() * imgArray.length);

      // change background image_url
      landingPage.style.backgroundImage =
        'url("images/' + imgArray[randomNumber] + '")';
    }, 1000);
  }
}
randomizeImg();

//skills selector
let skills = document.querySelector(".skills");

window.onscroll = function () {
  // skills offset Top
  let skillsOffsetTop = skills.offsetTop;

  // skills outer height
  let skillsOuterHeight = skills.offsetHeight;

  //window height
  let windowHeight = this.innerHeight;

  //window ScrollTop
  let windowScrollTop = this.scrollY;

  if (
    windowScrollTop >
    skillsOffsetTop + skillsOuterHeight - windowHeight - 100
  ) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//create popup with images
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = "popup-overlay";

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Create The Popup Box
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To The Heading
      imgHeading.appendChild(imgText);

      // Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box To Body
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");

    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);

    // Add Class To Close Button
    closeButton.className = "close-button";

    // Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});
