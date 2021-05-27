# Getting Started with Create React App

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Hosting the app on Heroku

1. Go to the file directory 
2. Execute git init
3. Execute git add .
4. Execute git commit -m "Initial commit"
5. Execute heroku create --buildpack https://github.com/mars/create-react-app-buildpack.git
6. Execute git push heroku master
7. Execute heroku open
8. The application will be launched successfully.
