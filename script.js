const uploadbox = document.querySelector(".upload-box");
fileInput = uploadbox.querySelector("input");
previewImg = uploadbox.querySelector("img");
widthinput = document.querySelector(".width input");
heightinput = document.querySelector(".height input");
ratioinput = document.querySelector(".ratio input");
qualityinput = document.querySelector(".quality input");
downloadbutton = document.querySelector(".download-btn");
let ogimageratio;

const loadfile = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    widthinput.value = previewImg.naturalWidth;
    heightinput.value = previewImg.naturalHeight;
    ogimageratio = previewImg.naturalWidth / previewImg.naturalHeight;
    console.log(heightinput);
    document.querySelector(".wrapper").classList.add("active");
  });
};

widthinput.addEventListener("keyup", () => {
  const height = ratioinput.checked
    ? widthinput.value / ogimageratio
    : heightinput.value;
  heightinput.value = Math.floor(height);
});

heightinput.addEventListener("keyup", () => {
  const width = ratioinput.checked
    ? heightinput.value * ogimageratio
    : widthinput.value;
  widthinput.value = Math.floor(width);
});

const resizeanddownload = () => {
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const ctx = canvas.getContext("2d");

  const imgquality = qualityinput.checked ? 0.7 : 1.0;

  canvas.width = widthinput.value;
  canvas.height = heightinput.value;

  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

  a.href = canvas.toDataURL("image/jpeg", imgquality);
  a.download = new Date().getTime();
  a.click();
};

fileInput.addEventListener("change", loadfile);
uploadbox.addEventListener("click", () => fileInput.click());
downloadbutton.addEventListener("click", resizeanddownload);
