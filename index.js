const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');
const https = require('https');

const skillBuilder = Alexa.SkillBuilders.custom();
var workoutOutput;
var timeOutput;
var workoutDescription;
var jsonIn;

const LaunchRequestHandler = {
  canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();
        const speechOutput = `${requestAttributes.t('WELCOME')}`;
        return responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};



/////////////////
// NEW STUFF
/////////////////
const ExerciseIntentHandler = {
    /** this is an internal function to call the database */
     getData() {
        // Get the workouts to say
        return new Promise((resolve, reject) => {
            https.get('https://wu2pmkh798.execute-api.us-east-1.amazonaws.com/production/recipes', (res) => {
              console.log('statusCode:', res.statusCode);
              
              res.on('data', (d) => {
                  resolve(JSON.parse(d))
              });
         
        
            }).on('error', (e) => {
              reject(e);
            });
        })
    },

    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        //console.log(request);
        return request.type === 'IntentRequest' && request.intent.name === 'DiscoverExerciseIntent';
    },

    async handle(handlerInput) {
        const data = await this.getData().then(d => { return d } )
        const request = handlerInput.requestEnvelope.request;

        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        
        let time = '5';
        
        if (request.intent.slots.time.value){
            time = request.intent.slots.time.value;
        }
        
        const sessionAttributes = attributesManager.getSessionAttributes();
        const speechOutput = `Have fun!`;
        console.log('here');

        
        return responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();
    },
};

const ExerciseListIntentHandler = {
    /** this is an internal function to call the database */
     getData() {
        // Get the workouts to say
        return new Promise((resolve, reject) => {
            https.get('https://wu2pmkh798.execute-api.us-east-1.amazonaws.com/production/recipes', (res) => {
              console.log('statusCode:', res.statusCode);
              
              res.on('data', (d) => {
                  resolve(JSON.parse(d))
              });
         
        
            }).on('error', (e) => {
              reject(e);
            });
        })
    },

    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'DiscoverExerciseListIntent';
    },

    async handle(handlerInput) {
        const data = await this.getData().then(d => { return d } )

        let str_output = 'Your cookbooks are ';
        var i; 
        for (let i = 0; i < data.workouts.length; i++)  
        { 
            if (i <  (data.workouts.length - 1)){
                str_output = str_output + ' ' + data.workouts[i].name + ',';
            }
            
            else{
                str_output = str_output + ' and ' + data.workouts[i].name;
            }
            
            console.log(i); 
            console.log(data.workouts[i].name); 
            console.log(data.workouts[i].time);
            
        } 
        jsonIn = data;
        str_output = str_output + '. Please choose a workout.';
        
        console.log(str_output); 

        const request = handlerInput.requestEnvelope.request;
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        
        const sessionAttributes = attributesManager.getSessionAttributes();
        const speechOutput = str_output;
        return responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();
    },
};

const cardioResponseHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'CardioIntent';
    },

    async handle(handlerInput) {
        workoutOutput = 'Cardio';
        let str_output = 'How long would you like to do cardio for?';
        
        const request = handlerInput.requestEnvelope.request;
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        
        const sessionAttributes = attributesManager.getSessionAttributes();
        const speechOutput = str_output;
        return responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();
    },
};


const strengthResponseHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'StrengthIntent';
    },

    async handle(handlerInput) {
        workoutOutput = 'Strength';
        let str_output = 'How long would you like to do strength for?';
        
        const request = handlerInput.requestEnvelope.request;
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        
        const sessionAttributes = attributesManager.getSessionAttributes();
        const speechOutput = str_output;
        return responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();
    },
};

const HIITResponseHandler = {
    /** this is an internal function to call the database */
     
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'HIITIntent';
    },

    async handle(handlerInput) {
        workoutOutput = 'HIT';

        let str_output = 'How long would you like to do hit for?';
        
        const request = handlerInput.requestEnvelope.request;
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        
        const sessionAttributes = attributesManager.getSessionAttributes();
        const speechOutput = str_output;
        return responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();
    },
};

const TimeHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'timeIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();
        let time = '5';
        
        if (request.intent.slots.time.value){
            time = request.intent.slots.time.value;
        }
        
        timeOutput = time;
        
        workoutOutput;
        const workoutTotalTime = jsonIn['workouts'].filter(w => w.name === workoutOutput).pop().total_time
        const instructions = jsonIn['workouts'].filter(w => w.name === workoutOutput).pop().instructions
        console.log(instructions);
        console.log(instructions[0].type);
        const workoutMultiple = (time/parseInt(workoutTotalTime));

        var strOutput = "OK! Your steps are: ";
        
        for (let i = 0; i < instructions.length; i++)  
        { 
            if (i <  (instructions.length)){
                let workoutLength = Math.ceil(parseInt(instructions[i].time)*workoutMultiple);
                strOutput = strOutput + instructions[i].step + ' for ' + workoutLength + ' minutes, ' ;
            }
            
            else{
                
            }
        } 
        
        strOutput = strOutput +  "Tell me when you're done with your workout";
        
        console.log(strOutput);
        console.log(instructions.length);
        
        const speechOutput =  strOutput;//`Ok! Starting workout ${instructions[0].step} for ${time} minutes. Tell me when you're done`;
        return responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();
    },
};


const DoneHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'DoneIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();
        

        const speechOutput =  `Great job doing ${workoutOutput} for ${timeOutput} minutes! Send results to your app?` ;

        return responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();

    },
};

const YesHandler = {
    /** this is an internal function to call the database */
     postData(data) {
        // Get the workouts to say
        
        let postData = JSON.stringify(data)
        
        let options = {
            hostname: 'wu2pmkh798.execute-api.us-east-1.amazonaws.com',
            path: '/production/history',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return new Promise((resolve, reject) => {
            let req = https.request(options, (res) => {
              console.log('statusCode:', res.statusCode);
              
              res.on('data', (d) => {
                  resolve(JSON.parse(d))
              });
            }).on('error', (e) => {
              reject(e);
            });
            //end of request
            
            req.write(postData)
            req.end()
        })
    },
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'YesIntent';
    },
    async handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();
        
        /////////////////
        // SEND DATA HERE
        /////////////////
        let dataToBackend = {
            datetime: new Date().toJSON(),
            length: timeOutput,
            workout: workoutOutput
        }
        
       const postOutput = await this.postData(dataToBackend).then(d => { return d } )
       console.log(postOutput)

        const speechOutput =  "I've sent your workout details to your app." ;

        return responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();

    },
};

const NoHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'NoIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();
        

        const speechOutput =  "Data not sent. Tell me if you would like to try another workout!" ;
        return responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();

    },
};




/////////////////////////////////////////


const AboutIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AboutIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();

        return responseBuilder
            .speak(requestAttributes.t('ABOUT'))
            .reprompt(requestAttributes.t('ABOUT'))
            .getResponse();
    },
};


const HelpHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();
        return responseBuilder
            .speak(requestAttributes.t('HELP'))
            .reprompt(requestAttributes.t('HELP'))
            .getResponse();
    },
};

const StopHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
            && (request.intent.name === 'AMAZON.NoIntent'
            || request.intent.name === 'AMAZON.CancelIntent'
            || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();
        return responseBuilder
            .speak(requestAttributes.t('STOP'))
            .getResponse();
    },
};

const SessionEndedHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Error handled: ${error.message}`);
        console.log(` Original request was ${JSON.stringify(request, null, 2)}\n`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const FallbackHandler = {

  // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.

  //              This handler will not be triggered except in that locale, so it can be

  //              safely deployed for any locale.

  canHandle(handlerInput) {

    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'

      && request.intent.name === 'AMAZON.FallbackIntent';

  },

  handle(handlerInput) {

    return handlerInput.responseBuilder

      .speak(FALLBACK_MESSAGE)

      .reprompt(FALLBACK_REPROMPT)

      .getResponse();

  },

};

const languageStrings = {
    en: {
        translation: {
            WELCOME: 'Welcome to WorkoutCookbook!',
            HELP: 'Say cookbooks to hear your list of workouts',
            ABOUT: 'ABOUT MESSAGE!',
            STOP: 'Okay, see you next time!',
        },
    },
    // , 'de-DE': { 'translation' : { 'TITLE'   : "Local Helfer etc." } }
};


const data = {
    workouts: [
        
        {
            name: 'cardio',
            total_time: 10,
            instructions: [
                {
                    step: 'Burpees',
                    time: 5
                },
                {
                    step: 'Run in place',
                    time: 5
                }
                ]
        },
        {
            name: 'strength',
            total_time: 10,
            instructions: [
                {
                    step: 'Curls',
                    time: 5
                    
                },
                {
                    step: 'Squats',
                    time: 5
                    
                }
                ]
        }
    
    ]
    
     

    
};

const SKILL_NAME = 'WorkoutCookbook';
const FALLBACK_MESSAGE = `The ${SKILL_NAME} skill can\'t help you with that. What can I help you with?`;
const FALLBACK_REPROMPT = 'What can I help you with?';



// 3. Helper Functions ==========================================================================




function getWeather(callback) {
    const req = https.request(myAPI, (res) => {
        res.setEncoding('utf8');
        let returnData = '';

        res.on('data', (chunk) => {
            returnData += chunk;
        });
        res.on('end', () => {
            const channelObj = JSON.parse(returnData).query.results.channel;

            let localTime = channelObj.lastBuildDate.toString();
            localTime = localTime.substring(17, 25).trim();

            const currentTemp = channelObj.item.condition.temp;

            const currentCondition = channelObj.item.condition.text;

            callback(localTime, currentTemp, currentCondition);
        });
    });
    req.end();
}

function randomArrayElement(array) {
    let i = 0;
    i = Math.floor(Math.random() * array.length);
    return (array[i]);
}

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true,
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.t(...args);
        };
    },
};


exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    ExerciseIntentHandler,
    ExerciseListIntentHandler, // list exercises
    cardioResponseHandler, // cardio
    strengthResponseHandler, // respond if strength
    HIITResponseHandler, // respond if hitt
    TimeHandler,
    DoneHandler,
    NoHandler,
    YesHandler,
    AboutIntentHandler,
    HelpHandler,
    StopHandler,
    FallbackHandler,
    SessionEndedHandler
    
  )
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(LocalizationInterceptor)
  .lambda();
