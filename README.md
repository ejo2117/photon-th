# Takehome Assignment

## Overview

This is a React frontend powered by a given Node.js backend that allows users to view, create, and update patients and prescriptions. There are two groups of users that can interact with this tool, as outlined below:

**Provider**

As a provider, you are able to create new patients and write prescriptions for those patients. You can also see your other patients and the status of their previously written prescriptions

**Pharmacist**

As a pharmacist, you can see all prescriptions and move them through the different states (pending, in progress, and filled).

### Details

-   This front end makes use of the [Chakra UI library](https://chakra-ui.com/) for design and components
-   Both users, Providers and Pharmacists, are able to complete all actions outlined above in this front end

### Running the App

In order to run the application, you must follow these steps:

1. [Ensure npm and node.js are installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Once installed, run `npm install` to install the required dependencies
3. Afterwards, run `npm run start`, and both the frontend and backend will begin running. Your browser should automatically open to the frontend at [localhost:8080](http://localhost:8080), and the backend server should be reachable at [localhost:3000](http://localhost:3000)
