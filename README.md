# cs467proj
Semester Project for NIU CSCI 467 - Intro to Software Engineering

This is a repo that contains all of the files of our semester project for CSCI 467.
Each separate section of material is on its own directory, for example, Use Case Model materials are in the `usecasemodel_files`, specifications like ER Diagrams for a database would be in `spec_files`, etc.

The project is the fullstack web(?) application for a Plant company that sells various plants. The application is for the workers at the company to create view, and finalize sales and orders of the companies products.


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

#### Installing MariaDb
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


### Development packages to install
If you will be working on frontend or backend of this repo, install the following Node module globally using the following command:
```
npm install -g nodemon
```

This package will restart the node server (frontend with react, or backend with express) anytime new changes are detected in any of the files. This eliminates the need to manually restart the server to see new changes. Do not install this if you are not planning to modify/develop the files in this repo.

## Running Project

### Frontend  
Nothing here yet...

### Backend 

#### Starting MariaDB server
*(This process might differ depending on your OS & the source of your MariaDB installation)*  
To start the MariaDB server, just run the following command (macOS MariaDB from brew package repo).
```
mysql.server start
```

This will start the server manually (not automatically), with no service to restart the server if it ever turn off, for development purposes. If you need a constant database connection, please consult the MariaDB website & other resources to implement a service to have the database running always on a specific computer.

To stop the server, the best way is to login to the server as an admin account, and run the following server command.
```
SHUTDOWN WAIT FOR ALL REPLICAS;
```

This will reliably disconnect all clients and then shutdown the server. There are commands to use in the terminal similar to the one used to start the server, however they might not always work (at least for macOS version installed from brew package repo).

#### Starting backend server
Run the Express API backend by doing to following commands (assuming working directory is root of this repository).
```
cd backendAPI
node app.js
```

Most likely it will be running on the following URL: `localhost:8000`.

This way is to run the backend without restarting server anytimes files are updated. If you want to see the changes reflected if files updated, run `nodemon` instead, as shown below.
```
nodemon app.js
```

#### Stopping backend server
Just hit `Ctrl` + `C` on the terminal where you ran the command to start the server to stop it.


---
More will be added later on, as project progresses.
