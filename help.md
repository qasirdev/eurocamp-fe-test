
### For CORS issues:

`open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`

Go to Developer tools → Settings → Console → tick "Selected context only". The warnings will be hidden. You can see them again by unticking the same box.

The "Selected context only" means only the top, iframe, worker and extension contexts. Which is all that you'll need, the vast majority of the time.

### Jest setup
npm i -D @testing-library/jest-dom @testing-library/react @testing-library/user-event jest jest-environment-jsdom ts-jest  @jest/globals @types/jest 

npm i next@13.4.10 //to avoide jest error

<!--
https://khizerrehandev.medium.com/how-to-configure-redux-toolkit-with-nextjs-using-typescript-384531fa7501
https://github.com/MitterYourTechMate/materialui-table-pagination/blob/main/src/App.js
-->
