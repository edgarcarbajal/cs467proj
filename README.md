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
Make sure you have Python installed and Django installed in the machine you will be running the backend. Django is the framework used for the backend which needs Python to run.

#### Installing Python  
Get the latest version of Python at https://www.python.org/downloads/. You can verify if you have python installed by typing into your command line/shell environment `python` or `python3`. You should see the REPL environment as shown below: 
```
Python 3.x.y
[Complier Type X, Version Y] on kernelname
Type "help", "copyright", "credits" or "license" for more information.
>>> 
```
Whatever command stored in your `$PATH` environment variable (`python` or `python3`) works use that for the rest of the commands below. This document will stick with using `python3` as the default command.

#### Installing Django
Install the official Django release with `pip`. `pip` might already be included in your version of Python. If it is, then make sure it is at the latest version by using the following command: 
```
python3 -m pip install --upgrade pip
```

If you do not have `pip` installed, install it in their website: https://pip.pypa.io/en/latest/installation/.

Once `pip` installatin is verified by typing in 
```
python3 -m pip --version
```

Then you can install Django using the following command:  
```
python3 -m pip install django
```
 
You can check if django was installed successfully by using the following command
```
python3 -m django --version
```
You should see a number detailing the version. 

#### Installing Django REST Framework
We are using Django mainly as a backend API server. We use RESTful APIs to connect frontend with the backend database, and thus need Django Rest Framework to use it.  

The prerequisites to installing this framework are below (which you should already have installed):
- Django
- Python
- pip


To install it, just run the command below.
```
python3 -m pip install djangorestframework
```

This should cover the backend dependencies needed to start running the backend. For more detailed install instructions, see the Django Installation docs at https://docs.djangoproject.com/en/5.0/topics/install/#installing-distribution-package.


## Running Project

### Frontend  
Nothing here yet...

### Backend 

#### Starting the API Server
To start the server, run the following commands in the terminal/shell. (Assuming your current directory is the root directory of the repository)
```
cd backend/cs467backendServer

python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```
*Will make a script for this later...*

#### Stopping the Server
To stop the server, just press `Ctrl` and `C` keys together in the terminal/shell where the server was started at.


---
More will be added later on, as project progresses.
