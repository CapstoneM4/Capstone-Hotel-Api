# System Hotel API


![1](https://user-images.githubusercontent.com/91641613/204641172-6ee3f094-7d9a-4207-b9a7-30a50d876f9d.png)

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

      $ git clone git@github.com:CapstoneM4/System-Hotel.git

 **2 - Installing dependencies:**

     run in project terminal: yarn install

 **3 - Create and configure .env:**

    create an .env file inside the src folder, set the variables following the instructions in

    .env.example

     
![env-example](https://user-images.githubusercontent.com/91641613/204641101-b0e6defb-f320-409e-89e4-30338faf1c0e.png)


**4 - Run locally with Docker:**

    run in project terminal: 

       docker compose up

       docker exec api_system_hotel yarn typeorm migration:run -d src/data-source.ts

   access on: `http://localhost:3000/hotel`
