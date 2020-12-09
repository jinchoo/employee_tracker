# employee_tracker

![GitHub license](https://img.shields.io/badge/Made%20by-%40jinchoo-orange)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Introduction

- As a student dveloper, the project was to creat a employee manager.

## Table of Contents

1.  Description
2.  Techologies

## Description:

1.  It is important for small business to have employee manager that make it esay to view and interact with information stored in databases.
2.  Design the following database schema containing three tables:

    - **department**:

      - **id** - INT PRIMARY KEY
      - **name** - VARCHAR(30) to hold department name

    - **role**:

      - **id** - INT PRIMARY KEY
      - **title** - VARCHAR(30) to hold role title
      - **salary** - DECIMAL to hold role salary
      - **department_id** - INT to hold reference to department role belongs to

    - **employee**:

      - **id** - INT PRIMARY KEY
      - **first_name** - VARCHAR(30) to hold employee first name
      - **last_name** - VARCHAR(30) to hold employee last name
      - **role_id** - INT to hold reference to role employee has
      - **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

3.  Build a command-line application:

    - Add departments, roles, employees

    - View departments, roles, employees

    - Update employee roles

    - Delete departments, roles, and employees

4.  To deliever employee manager:

    - Use the NPM package to connect to your MySQL database and perform queries.

    - Use InquirerJs NPM package to interact with the user via the command-line.

    - Use console.table to print MySQL rows to the console.

    - Need to perform a variety of SQL JOINS.

5.  Techologies:
    - JavaScript
    - Node JS
    - VS-Code Editor
    - MySQL
    - MySQL WorkBanch
    - GitHUb Repository
    - npm packages

![](./employee_manager.gif)

## Repository

- [Project Repo](https://github.com/jinchoo/employee_tracker)
