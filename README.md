## PreLoad

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) =>
images.map((image) => {
if (typeof image === "string") {
return Image.prefetch(image);
//on the web await Image.petch()
}
return Asset.loadAsync(image);
});
