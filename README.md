# Welcome to the Workout Cookbook Project!
This team Ada Lovelace's submission for the Girl Develop It 2nd Annual Hackathon. The Workout Cookbook is a platform that pairs a mobile app with Alexa. The mobile app uploads and catalogs "workout recipes" that the user defines. Alexa, in turn, assists the user in guiding them through a chosen workout recipe. Users can perform their favorite workout routines from the comfort of their homes and have a fun fitness journey!

# Installation
## Mobile App
The mobile app is built on React Native. Its source code can be found in the `react-native` folder. Run the following to install app dependencies:
```
yarn install
```
### Running the app
In the `react-native` folder, run
```
yarn start
```
This will launch the Expo server on your local machine and gives you the ability to test the mobile app on both iOS and Android simulators as well as on actual phone hardware.

## Alexa Skill
The Alexa skill handler is a lambda function using the Node.js runtime. It can be viewed in `index.js`.

### Deployment
Create an AWS account to create a lambda function that hooks into an Alexa Skills kit.

# Contributing
TBD