# System Hotel API

![1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2e901fe6-ee11-42dc-8827-a21fe59d962d/1.png)

## DESCRIPTION

---

### **What is System Hotel?**

 API developed to create and manage Hotels system

### **Project** **details**

 Project developed using the following technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://nodejs.org/en/)
- [TypeORM](https://nodejs.org/en/)

## INSTRUCTIONS

---

### Requirements

 **Make sure to have installed on your machine:**

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Docker](https://expo.io/)

 **1 - Clone project:**

      $ git clone [git@github.com](mailto:git@github.com):CapstoneM4/System-Hotel.git

 **2 - Installing dependencies:**

     ****run in project terminal: **yarn install**

 **3 - Create and configure .env:**

    create an .env file inside the src folder, set the variables following the instructions in

    .env.example

![env-example.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f9d8014f-47f0-4f06-8f59-991ec04efd8e/env-example.png)

**4 - Run locally with Docker:**

    run in project terminal: 

       **docker compose up** 

       **docker exec api_system_hotel yarn typeorm migration:run -d src/data-source.ts**

   access on: `http://localhost:3000/hotel`
