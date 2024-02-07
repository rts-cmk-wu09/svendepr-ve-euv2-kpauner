<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://raw.githubusercontent.com/rts-cmk-wu09/svendepr-ve-euv2-kpauner/master/public/logo.png" alt="Logo" width="80" height="80"/>
    
<h3 align="center">Fitness verden</h3>

  <p align="center">
    Exams project frontend developer at RTS 2013
    <br />
    <a href="https://65c3e3b565c172184a802299--quiet-licorice-a74f42.netlify.app/"><strong>Explore the website »</strong></a>
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Product Name Screen Shot][product-screenshot]

Fitness Verden is a small chain of fitness centers that is undergoing a major expansion. The company
wants to offer their customers a digital experience that will help them increase enrollment in their
fitness classes. Fitness Verden has commissioned a mobile web app where it is possible for users to
find and sign up for different classes held in the fitness centers.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Clone the repository, install the dependencies with npm install. The project was made with
pocketbase as backend so you will need to add environment variables - example included

```sh
  npm install
```

| user  | password |
| ----- | -------- |
| user1 | 12345    |
| user2 | 12345    |
| user3 | 12345    |
| user4 | 12345    |

The menu acts as a login screen if you're not logged in. Above are possible users. **note the 5
character password**

<!-- USAGE EXAMPLES -->

## Tech stack

Fitness verden uses Next.js for server-side rendering and routing, TypeScript for static typing,
React Query for fetching data, React Hook Form for form handling, Tailwind CSS for styling,
PocketBase as backend, and Zod for data validation.

### Built With

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Pocketbase](https://img.shields.io/badge/PocketBase-B8DBE4?style=for-the-badge&logo=PocketBase&logoColor=white)
![Zod Badge](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=fff&style=for-the-badge)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TECH STACK -->

## Next.js

Next.js is a React framework that enables server-side rendering, static site generation, and routing
out of the box.

## Tanstack Query/React-query

Simplifies data fetching and caching, contains tools to ease the art of querying and errorhandling.
Although you do need a couple of extra steps to utlize Tanstack Query in a server environment, it's
well worth it.

## React-hook-form

React Hook Form is a library for building forms in React with easy-to-use hooks. It provides a
straightforward approach to form validation, handling form submission, and managing form states.

## Zod

Zod is a TypeScript schema declaration and validation library. It allows me to define data schemas
and validate incoming data against those schemas, ensuring consistency and a central source of truth
for the data types present in my application.

```sh
import { z } from "zod"

export const AuthSchema = z.object({
  username: z.string().min(1, { message: "Username required" }),
  password: z.string().min(5, { message: "Password has to be atleast 5 characters" }),
})

export type AuthSchemaTypes = z.infer<typeof AuthSchema>
```

First i define my schema, in this case i'm doing a login authentication with username and password
so i'm naming it AuthSchema. I plan on passing an object containing a username and password
therefore the z.object. First username, should be a string with min 1 character (just a way of
saying, it cant be empty), and a message incase the criteria isn't met. The same is done for
password, which should contain atleast 5 characters.

zod has the ability to infer the types based on the Schema which i've done at the end, i export it
so i can use the types all over my project, like the auth form.

Zod can do so much more, but this is the structure of a login schema, note that a register schema
would look different. I.e. passwordConfirm in addition to password and a refine method.

```sh
export const RegisterAuthSchema = z.object({
    email: z.string().min(5, {message: "Email should be at least 5 characters long",}).email(),
    password: z.string().min(5, {message: "password must be atleast 5 characters long",}),
    passwordConfirm: z.string(),
})
  .refine((data) => data.password === data.passwordConfirm, {
    message: "passwords do not match",
    path: ["passwordConfirm"],
  });

export type RegisterAuthTypes = z.infer<typeof RegisterAuthSchema>;
```

## Tailwind

Tailwind CSS is a utility-first CSS framework that provides a set of pre-defined utility classes to
style my components. It allow me to quickly build custom designs without writing CSS from scratch.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Khend Pauner - find my contactinfo in the rts schedules app

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]:
  https://raw.githubusercontent.com/rts-cmk-wu09/svendepr-ve-euv2-kpauner/master/public/repo-fitnessverden-img.png

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/TNGAV1oz)
