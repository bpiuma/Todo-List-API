# ![alt text](https://assets.breatheco.de/apis/img/images.php?blob&random&cat=icon&tags=breathecode,32) Todo List API

We are going to build one API to manage tasks (Todo List). Similar to this api: [http://assets.breatheco.de/apis/fake/todos/](http://assets.breatheco.de/apis/fake/todos/)

## 💻 Installation

Use the python/flask or node/express boilerplate, clone the repository on Gitpod to avoid any local issues in your computer because you will need to have MySQL or PostgreSQL and python 3.7+ installed (already installed on Gitpod).

## 📝 Instructions

Create an API that connects to a MySQL database and implements the [Following Endpoints](http://assets.breatheco.de/apis/fake/todos/).

1. `[GET] /todos/user/<username>` Get list of todo's for a particular user.
2. `[POST] /todos/user/<username>` Create a new todo list of a particular user.
3. `[PUT] /todos/user/<username>` Update the entire list of todo's of a particular user.
4. `[DELETE] /todos/user/<username>` Delete a user and all of their todo's.

## 📖 Fundamentals

This exercise will make you practice the following fundamentals:

1. Building an RESTful API.
2. Building a database with SQLAlchemy or Expressjs/TypeOrm.
3. Database Migrations.
