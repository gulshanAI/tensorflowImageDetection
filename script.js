const img = document.getElementById("img");
const output = document.getElementById("output");
const uploadedImage = document.getElementById("uploadedImage");

uploadedImage.addEventListener("change", (e) => {
  img.src = URL.createObjectURL(e.target.files[0]);
  loadModel();
});

const loadModel = async () => {
  try {
    const model = await cocoSsd.load();
    const predictions = await model.detect(img);
    if (Array.isArray(predictions)) {
      console.log("Predictions: ", predictions);
      let outputString = "";
      predictions.forEach((prediction) => {
        outputString += `<div class="text-xl mt-2 text-white text-center uppercase ml-2 bg-slate-900 px-3 py-1 rounded-xl">${
          prediction["class"]
        } - ${Math.round(prediction["score"] * 100)}%</div>`;
      });
      output.innerHTML = outputString;
    }
  } catch (e) {
    console.log(e);
  }
};
loadModel();
