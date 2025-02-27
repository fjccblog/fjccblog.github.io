# Struggle

### Set up attendance with Google Excels
* it is a good article to follow as template ``` https://dev.to/tuasegun/submitting-custom-form-data-to-google-sheets-via-react-js-19al ```

### env variable undefined
* need to add ```REACT_APP_``` in front of your variable
* env variable are captured on build time, not on deployment
* reactjs runs in the browser, so it can't read env variables at the running time
* ```https://create-react-app.dev/docs/adding-custom-environment-variables/```

### Timezone in Date()
* should avoid using offset because time zone and daylight saving rules may change.
* ```https://stackoverflow.com/questions/1091372/getting-the-clients-time-zone-and-offset-in-javascript```

### Images on the album page
* Initial thought: Since we already have facebook page with posts of lots of pictures, then I can just copy the source link of each picture, save them all in a json for each album.
* Found out those links are not permanent links, they will expire after a couple days for security reason.
* Facebook might have a API to fetch all the data ? couldn't find a solution yet [Jan 2024]
* Immediate solution: download all the pictures, and upload to Google photos. Then use ```https://www.publicalbum.org/blog/embedding-google-photos-albums``` to find out the source links.
* Modify codes into a array of links.

### images with CORB issue
* ```https://chromium.googlesource.com/chromium/src/+/master/services/network/cross_origin_read_blocking_explainer.md#What-kinds-of-requests-are-CORB_eligible```
object or emded pose less risk of leaking data

* trying to use ```<object/>``` to prevent sometimes CORB issue, but the image doens't auto-resize with css

```<div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
  <object data={data[albumIndex]} type='image/jepg' aria-labelledby='pic' className='albumObj'
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
      <img
        src={data[albumIndex]} // Replace with your image URL
        alt="new year"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
  </object>
</div>
```

### Time comsuming to copy link of each flickr pictures
* write a web scrapping tool / code to shorten the time

```
const puppeteer = require('puppeteer');

let url = 'https://www.flickr.com/photos/132430613@N08/albums/72157688357615070';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  const styles = await page.$$eval('div.photo-list-photo-view', el => el.map(x => x.getAttribute('style')));
  // only taking inside url("//...")
  // also add "https:" to the very start
  const urlArr = styles.map(el => "https:" + el.split('url("')[1].split('")')[0]);
  console.log(urlArr)
  await browser.close();
})();
```


### deploy React to GitHub Pages
* most of the part is very straigt forward with ```https://github.com/gitname/react-gh-pages```
* The only difference is that this repo has frontend and backend folder, even though at this moment, the backend folder is empty
* When deployed to Github Pages, the url is ```https://fjccblog.github.io/fjccWebsite```, but that is not the url we want, because it will affect other parts/Links of the Router in the DOM
* Therefore I add the a route to redirect to home page, just for the purpose to "auto-correct" the router problem
```
  <Route path="/fjccWebsite">
    <Redirect to="/" />
  </Route>
```
* run ``` npm run deploy``` in the frontend folder when the changes are up to date, but this will save the version of your current branch, not strictly on the main branch. However, there is always an option to switch to main branch before deploy.

### Modal is covered by address bar in mobile
* seem like we have new viewport units lvh, svh and dvh, ```https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser```,  ```svh``` indeed fixes the problem
