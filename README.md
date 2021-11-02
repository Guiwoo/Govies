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

## React Query amazing

https://react-query.tanstack.com
queryclient can manage all things

## Header does not re-render

// header does not re-render the reason why useEffect use twice

## Linking url

1. You can connect to link youtube out of your app
   const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
   // await Linking.openURL(baseUrl);
   or
2. You can connect to youtube in your app by openBrowserAsync
   await WebBrowser.openBrowserAsync(baseUrl);
