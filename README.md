# cs467proj
Semester Project for NIU CSCI 467 - Intro to Software Engineering

This is a repo that contains all of the files of our semester project for CSCI 467.
Each separate section of material is on its own directory, for example, Use Case Model materials are in the `usecasemodel_specs`, specifications like ER Diagrams for a database would be in `db_specs`, and both under the root folder `spec_files`, etc.

The project is the fullstack web(?) application for a Plant Repair company that sells various plant repair services. The application is for the workers at the company to create view, and finalize sales and orders of the companies products.


---
If you want to run the frontend and backend of this project on your own machine, follow the following steps:

## Installation

Make sure you have Git installed, and can run commands in a command line/shell environment. Download this project using the following command:
```
git clone https://github.com/edgarcarbajal/cs467proj.git
```

### Frontend Dependencies  
Nothing here yet.

### Backend Dependencies  
Make sure you have MySQL, Node.js, Express.js installed. Steps are shown below. Any commands in the terminal, make sure your working
directory is the the `backendAPI` folder.

#### Installing MariaDB
Download and install MariaDB database management system using your package repository, or by using the following website: https://mariadb.org/download/.

Once installed, set up your database credentials however you please. Once you have set up the credentials, run the `.sql` files in the `db_init` directory to create the necessary tables, and/or fill in the tables with dummy data.

**NOTE**: Make sure to put those credentials in your own `.env` file that you create in `backendAPI` directory. There is a `.env-template` file that shows you a template on how you would fill in the values.

#### Installing Node
Download and install Node.js using your package repository, or by using the following website: https://nodejs.org/en/download.
You should have both node, and npm (nope package manager) installed in your system. Check by seeing that you have the latest version of node, and npm using the following commands.
```
node -v
npm -v
```

#### Installing remaining dependencies
The repo should already have Express listed to be installed locally (inside the `package-lock.json`) among other dependencies. To install these dependencies locally for the first time, type the following:
```
npm ci
```
You should see a new `node_modules` folder appear.

If some dependencies not installed/saved inside `package-lock.json`, then just run the following command:
```
npm install --save <name of dependency>
```


## Running Project

### Frontend  
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

##### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Backend 

#### Starting MariaDB server
*(This process might differ depending on your OS & the source of your MariaDB installation)*  
To start the MariaDB server, just run the following command (macOS MariaDB from brew package repo).
```
mysql.server start
```

This will start the server manually (not automatically), with no service to restart the server if it ever turn off, for development purposes. If you need a constant database connection, please consult the MariaDB website & other resources to implement a service to have the database running always on a specific computer.

To stop the server, the best way is to login to the server as an admin account, and run the following server command (prepend `\g` and a space to the command).
```
shutdown wait for all replicas;
```

This will reliably disconnect all clients and then shutdown the server. There are commands to use in the terminal similar to the one used to start the server, however they might not always work (at least for macOS version installed from brew package repo).

#### Starting backend server
Run the Express API backend by doing to following commands (assuming working directory is root of this repository).
```
cd backendAPI
npm run start
```

Most likely it will be running on the following URL: `localhost:8000`.

This way is to run the backend without restarting server anytimes files are updated. If you want to see the changes reflected if files updated, run the `dev` script instead.
```
npm run dev
```

You can see what each script does, by looking at the `scripts` category inside of `package.json`.

#### Stopping backend server
Just hit `Ctrl` + `C` on the terminal where you ran the command to start the server to stop it.


---
More will be added later on, as project progresses.
