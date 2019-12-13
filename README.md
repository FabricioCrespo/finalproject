# Final Project
Web Programming with Python and JavaScript

#=============================FINAL PROJECT========================================
#==========================WEB PROGRAMMING========================
#=========================NAME: JONNATHAN FABRICIO CRESPO YAGUANA=============
#==========================DATE: DECEMBER 2019=================================

This project is about the creation of a web application of free style. My decision was create a web page for a repository of a graphic course in WEBGL. This web application let us manage the students. 

Flask is provided for this project. It let us load different pages to access to information.

My project1 has two python files. The first one has the application. Here are declared the different routes for the web application and the instruccions to access to the database too. The second one is the file import.py which let us import all the students to the database.

There is sql file called database.sql. Here are all the queries to create tables or get information from de database serve.

There is a folder called templates. It has the different HTML files that I have used to render the app.routes.They are:
---author.html: display all the books matches with the authors of the data base. The same funcionality for title.html and isbn.html

---index.html to begin to search webgl examples.

---error.html It is a template for display error with a particular message.

--success.html. Let users go to a page to login after theur signup.

--personal_account.html. It displays a welcome message to users and has a button to begin to search webgl examples.

--layout: it is the principal format to display the others html files. It has the import statement such as style.css, the bootstraps, etc.

--texture.html It is used render the WEBGL example throught the canvas. JS was used here. The same for fog_effect.html

Finally, there is the folder called static. It has the stylesheet.css and images that I has used for the design of the web application. Also, here are js files to render the webgl examples.

Thank you for readme. I hope that you enjoy the web application.


======================IMPORTANT=================================
Run on the console:
export FLASK_APP=application.py
export FLASK_DEBUG=1
flask run