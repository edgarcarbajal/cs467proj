# cs467proj
Semester Project for NIU CSCI 467 - Intro to Software Engineering

This is a repo that contains all of the files of our semester project for CSCI 467.
Each separate section of material is on its own directory, for example, Use Case Model materials are in the `usecasemodel_specs`, specifications like ER Diagrams for a database would be in `db_specs`, and both under the root folder `spec_files`, etc.

The project is the fullstack web(?) application for a Plant Repair company that sells various plant repair services. The application is for the workers at the company to create view, and finalize sales and orders of the companies products.


See the project in action, without installing, by watching a showcase video [here!](https://youtu.be/eB9ECEpifno)

---
If you want to run the frontend and backend of this project on your own machine, follow the following steps:

## Installation

Make sure you have Git installed, and can run commands in a command line/shell environment. Download this project using the following command:
```
git clone https://github.com/edgarcarbajal/cs467proj.git
```

### Universal Dependencies
Here are a list of dependencies needed by both Frontend and Backend stacks, and how to install them.

#### Installing Node
Download and install Node.js using your package repository, or by using the following website: https://nodejs.org/en/download.
You should have both node, and npm (nope package manager) installed in your system. Check by seeing that you have the latest version of node, and npm using the following commands.
```
node -v
npm -v
```

### Frontend Dependencies  
Make sure you have Node.js, React.js, and any other React-related dependency that is needed (these are usually created by `create-react-app`.)

### Backend Dependencies  
Make sure you have MySQL, Node.js, Express.js installed. Steps are shown below. Any commands in the terminal, make sure your working
directory is the the `backendAPI` folder.

#### Installing MariaDB
Download and install MariaDB database management system using your package repository, or by using the following website: https://mariadb.org/download/.

Once installed, set up your database credentials however you please. Once you have set up the credentials, run the `.sql` files in the `db_init` directory to create the necessary tables, and/or fill in the tables with dummy data.

**NOTE**: Make sure to put those credentials in your own `.env` file that you create in `backendAPI` directory. There is a `.env-template` file that shows you a template on how you would fill in the values.


### Installing dependencies
The repo should already have dependencies like React for the frontend, or Express for the backend listed to be part of the project via their respective `package-lock.json` files, among other dependencies.  To install these dependencies locally for the first time, type the following inside the respective `frontend` or `backendAPI` folder depending what you intend to run:
```
npm ci
```
You should see a new `node_modules` folder appear.

If some dependencies not installed/saved inside `package-lock.json`, then just run the following command:
```
npm install --save <name of dependency>
```

This will save the dependency to the `package-lock.json` file for future installation.


## Running Project

### Frontend  
Frontend project + this README section (Frontend) was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The full README output has been trimmed here, but you can still find orginal README in the `/frontend` directory.

In the directory `/frontend` , you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### Backend 

#### Starting MariaDB server
*(This process might differ depending on your OS & the source of your MariaDB installation)*  
To start the MariaDB server, just run the following command (macOS MariaDB from brew package repo).
```
mysql.server start
```

This will start the server manually (not automatically), with no service to restart the server if it ever turn off, for development purposes. If you need a constant database connection, please consult the MariaDB website & other resources to implement a service to have the database running always on a specific computer.

#### Instructions for first time setup:
---
If this is your first time setting up the project and running this project's backend, then you need to setup the database tables, and the environment variables for the backend server.  

In the terminal, `cd` to the `db_init` directory. Then in that directory login as admin to the MariaDB server. In here run the following commands:

- To create the database and the empty tables:
```
\. projdb_create.sql
```
(**Warning: THIS WILL DELETE AND OLD TABLES UNDER THE SAME NAMES**)


- To initialize the database with dummy data:
```
\. projdb_init.sql
```
If you decide to use the dummy data, account usernames are written in the insert SQL query, and plaintext passwords for those accounts to the side as comments.


After this, in the directory `backendAPI`, there is a file named `.env-template`. This file contains all of the environment variables that the backend server will try to read from a file named `.env`.  
**Make sure to make the file `.env` with the same variable names as `.env-template` and replace the values with values pertaining to your setup!**

---


To stop the server, the best way is to login to the server as an admin account, and run the following server command (prepend `\g` and a space to the command).
```
shutdown;
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
