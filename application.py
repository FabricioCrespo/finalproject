#=============================FIANL PROJECT========================================
#==========================WEB PROGRAMMING========================
#=========================NAME: JONNATHAN FABRICIO CRESPO YAGUANA=============
#==========================DATE: DECEMBER 2019=================================

#=========IMPORT STATEMENTS======================
import os
from flask import Flask, session, render_template, request, jsonify, redirect
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from functools import wraps #Para login_required

#=================FLASK STATEMENTS====================================

app = Flask(__name__)

app.config["SECRET_KEY"] = "my secret key"

engine = create_engine("postgres://kjkmtwcexbgcrx:522c649866896ff5bddbbbb0c53f2dec216fb496e6590bdce81f42e5aba9f313@ec2-174-129-253-47.compute-1.amazonaws.com:5432/d98hjgkripkjc5")
db = scoped_session(sessionmaker(bind=engine))

#-=====================DEFINE A DECORATOR TO AVOID CACHE=======================================

@app.after_request
def add_header(response):
    # response.cache_control.no_store = True
    if 'Cache-Control' not in response.headers:
        response.headers['Cache-Control'] = 'no-store'
    return response

def login_required(f):
    """
    Decorate routes to require login.

    http://flask.pocoo.org/docs/1.0/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("username") is None:
            return redirect("/identify")
        return f(*args, **kwargs)
    return decorated_function
#=====================DEFINE ROUTES============================

@app.route("/")
@login_required
def index():
    return render_template("index.html")

@app.route("/identify")
def identify():
    return render_template("signup.html")

@app.route("/login", methods=["POST"])
def login():

    #Get form information
    username = request.form.get("username") #variable recibida del campo username de indeX.html
    password= request.form.get("password")
    #Session close
    #session.pop('user', None)
    session.clear()

    # Make sure user exist.
    if db.execute("SELECT * FROM users1 WHERE (username = :username) and (password = :password)", {"username":username, "password":password}).rowcount==0:
        return render_template("error.html", message="Username or password invalid")
    #Make sure acount_state is inactive
    """ if db.execute("SELECT * FROM users1 WHERE (username = :username) and (password = :password) and (count_state='True')", {"username":username, "password":password}).rowcount==1:
        return render_template("error.html", message="You have already login in your account") """
    #ACTIVE SESSION
    session['username']=username
    session.permanent = True
    #If user login, count_state=True
    db.execute("UPDATE users1 SET count_state=True  WHERE (username = :username) and (password = :password)", {"username":username, "password":password})
    db.commit()
    return render_template("personal_account.html")

@app.route("/begin_to_search")
@login_required
def begin_to_search():
    return render_template("search.html")

@app.route("/signup", methods=["POST"])
def signup():

    #Get information
    id1=request.form.get("id")
    username1 = request.form.get("username1") #variable recibida del campo username de indeX.html
    password1= request.form.get("password1")
    name = request.form.get("name") #variable recibida del campo username de indeX.html
    lastname= request.form.get("lastname")

    db.execute("INSERT INTO users1(id, username, password, name, last_name) VALUES (:id1, :username, :password, :name, :lastname)",
            {"id1":id1,"username": username1, "password":password1, "name":name, "lastname": lastname})
    db.commit()
    return render_template("success.html")

@app.route("/logout", methods=["get"])
@login_required
def logout():
    #Get username
    user1=session['username']
    #Update user_account
    db.execute("UPDATE users1 SET count_state=False  WHERE (username = :username)", {"username":user1})
    db.commit()
    #close session
    session.pop('user', None)
    session.clear()
    return render_template("sucess_exit.html")

#=====================RENDER JS CODE============================
@app.route("/fog_effect", methods=["POST"])
@login_required
def fog_effect():
    return render_template("fog_effect.html")

@app.route("/texture", methods=["POST"])
@login_required
def texture():
    return render_template("texture.html")