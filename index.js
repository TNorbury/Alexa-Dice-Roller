"use strict";

var Alexa = require("alexa-sdk");

var handlers = {
    'LaunchRequest': function() {
        this.response.speak("Hello, Welcome to Dice Roller. How many dice should I roll?").listen("How many dice should I roll?");
        this.emit(':responseReady');
    },

    'DiceRollIntent': function() {
        var numDice;
        var diceSides;
        
        // If the numDice argument hasn't been given, then assume that we are only
        // rolling one dice
        if (!this.event.request.intent.slots.numDice.hasOwnProperty("value")) {
            numDice = 1;
        }
        else {
            numDice = +this.event.request.intent.slots.numDice.value;           
        }
        
        // If the diceSides argument wasn't given, then assume that it's a 
        // six-sided die
        if (!this.event.request.intent.slots.diceSides.hasOwnProperty("value")) {
            diceSides = 6;
        }
        else {
            diceSides = +this.event.request.intent.slots.diceSides.value;
        }
        
        // This will keep track of the running total of the dice rolls;
        var rollTotal = 0;
        
        for (var i = 0; i < numDice; i++) {
            // "Roll" the dice and add the value to the running total
            rollTotal += Math.floor(Math.random() * diceSides) + 1;
        }
        
        // Tell the user what they rolled
        this.response.speak("You rolled " + numDice + " " + diceSides 
            + " sided dice for a total of" + rollTotal);
        
        this.emit(':responseReady');
    }
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};