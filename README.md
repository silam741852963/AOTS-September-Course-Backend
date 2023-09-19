# AOTS-September-Course-Backend
## Ho Chi Minh City University of Technology
This serves as the backend infrastructure for a course project centered around apartment rentals.
## Dev team note
### Setting up
1. Install nodemon globally as a package.
   ```console
   npm i -g nodemon
   ```
2. Install the necessary dependencies.
   ```console
   npm i
   ```
3. Execute nodemon to monitor changes in your project.
   ```console
   npm run dev
   ```
### config folder
+ allowedOrigins: Modify this file to authorize access to your backend, especially when utilizing the frontend to send API requests.
+ corsOption: I aim to ensure a seamless connection between this backend and the frontend without encountering any errors.
+ dbConn: Establish a connection to the database. I've included the database URL in the .env file, which will be shared with the team for the project.
### git
1. Create a new branch with your name as the name.
2. Make your contributions on this branch.
3. Open a pull request to merge your changes.

