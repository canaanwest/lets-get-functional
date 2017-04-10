#!/usr/bin/env node
const _ = require("lodown-canaanwest");

'use strict';

const customers = require("./data/customers.json");


/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 * 
 * Code and test your solutions in index.js. Customer data is available to you in the Array, customers. 
 * Utilizing your lodown library, write functions that take the Array of customers and return the following (console.log() the results):



5Find the average balance of all the customers.

7Find how many customers’ friends’ names begin with an arbitrary letter. Write a function to answer this question, then log an answer.

8Find the names of all customers who are friends with a given customer (by name). i.e. Which customers have that customer’s name in their friends list?

 */
 
 
 // customer data is located in the array >>> customers;
 
//NUMBER 1: Find the number of males

function maleCustomers(people){
    var dudes = _.reduce(people, (prevDudes, currentDude, i)=>{
        if(people[i]["gender"] === "male"){ return prevDudes += 1} else { return prevDudes;}}, 0);
        
        return "There are " + dudes + " male customers."
}    

console.log(maleCustomers(customers));






//NUMBER 2: Find the number of females

function femaleCustomers(people){  
    var ladies = _.reduce(people, (prevGals, currentGal, i) => 
        {if(people[i]["gender"] === "female"){return prevGals += 1} else { return prevGals }}, 0);
        
        
    return "There are " + ladies + " female customers. "
}

console.log(femaleCustomers(customers));




//NUMBER 3: Find the name and age of the oldest customer

function oldestCustomer(people){
var oldAge = 0;
var oldName = "";
_.each(people, function(val, i, col){
    if (people[i]["age"] > oldAge){
        oldAge = people[i]["age"];
        oldName = people[i]["name"];
    }});

return "The oldest person is " + oldName+ ", at " +oldAge+ " years old."
}

console.log(oldestCustomer(customers));



//NUMBER 4: Find the name and age of the youngest customer. 

function youngestPerson(people){
var youngAge = 200;
var youngName = "";

_.each(people, function(val, i, col){
    if (people[i]["age"] < youngAge){
        youngAge = people[i]["age"];
        youngName = people[i]["name"];
    } else if (people[i]["age"] === youngAge){
        youngName += " and " + people[i]["name"]; 
    }
})
    return "The youngest people are " + youngName + ", at " + youngAge + " years old.";
    
}

console.log(youngestPerson(customers));


//NUMBER 5: Write a function that finds the average of the customers' bank accounts.
function balance(people){
    var monies = []; //made a new array to keep out function pure-ish
    var newMoney = [];
    var total = 0;
    var avgBalance = 0;
    
    _.each(people, function(cust, i, people){   ///made a new var push to isolate the process of pushing to new array
        monies.push(cust["balance"].slice(1, cust["balance"].length).replace(/,/g, ""));}) //this removed the $ and the ,  prove with console.log
        
    _.each(monies, function(amt, i, coll){newMoney.push(Number.parseFloat(amt));});
    _.each(newMoney, function(val, i, newMoney){ total += val; avgBalance = total/(i+1)})
 
 return "The average balance of the customers is " + avgBalance + " dollars.";
}
console.log(balance(customers));




//NUMBER 6: Write a function that takes a character and returns the number of names that start with that Character.
function nameStartsWith(char){
    var count = 0;
    _.each(customers, function(name, i, col){
        if (customers[i]["name"].charAt(0).toUpperCase() === char.toUpperCase()){
            count += 1; 
        }  
}) 
return "There are " + count + " names that start with " + char.toUpperCase();
};

console.log(nameStartsWith("b")); 



//NUMBER 7: Find how many customers' friends' names start with an arbitrary letter. 
//customers[i]>>friends[j]
function friendsWithNames(people, char){
    var allFriends = []; 
    var count = 0;
    //this block of code gets all of the tags into an array for counting
    _.each(people, function(person, i, people){
        if (people[i].hasOwnProperty("friends")){
            _.each(people[i]["friends"], function(friend, j, friends){
                allFriends.push(friend);
            })
        }
    })
    
    _.each(allFriends, function(friendObj, i, allFriends){
        if (allFriends[i]["name"].charAt(0).toUpperCase() === char.toUpperCase()){
            count += 1;
        }
    })
    return "There were " +count+ " friends of customers whose names began with " + char + "."
    
}

//return "There are " + numberOfFriends + " friends whose names begin with " + char + ".";



console.log(friendsWithNames(customers, "S"));


//NUMBER 8: Find all customers who are friends with a given customer.
function friendsWith(people, person){ //@params: list of people, customer whose name we're looking for in friends lists
    var customersFriends = [];
    _.each(people, function(customer, i , people){
        if (people[i].hasOwnProperty("friends")){
            _.each(people[i]["friends"], function(friend, j, friends){
                if (people[i]["friends"][j]["name"] === person){
                    customersFriends.push(people[i]["name"]);
                }
            })
        }
    })
   return person + " was found in the friends list of " + customersFriends; 
}

console.log(friendsWith(customers, "Shelly Walton"));




//NUMBER 9: Find out which 3 tags were the most common among customers;
function whichTags(people){
    var theTags = []; 
    //this block of code gets all of the tags into an array for counting
    _.each(people, function(person, i, people){
        if (people[i].hasOwnProperty("tags")){
            _.each(people[i]["tags"], function(tag, j, tags){
                theTags.push(tag);
            })
        }
    })
    
    var sansDups = _.unique(theTags);   // this gets them into an array without duplicates
    var occurance = {};                 //empty object for pushing to.
    _.each(sansDups, function(tag, i, sansDups){
        occurance[tag] = 0; //sets every unique tag up with a value pair of 0.
    })
    
    
    _.each(theTags, function(tag, i, theTags){
        _.each(sansDups, function(sDup, j, sansDups){
          if (theTags[i] === sansDups[j]){
              occurance[sansDups[j]] += 1;      //this allows the function to count the occurances by adding 1 for each occurance
          }  
        })
    })
    
    //need a function that identifies the one with the greatest occurance.
    var greatestOccurance = 0;
    var popTag = "";
    _.each(occurance, function(timesOccured, tag, occurance){
        if (occurance[tag] > greatestOccurance){
            greatestOccurance = occurance[tag];
        }
    })
    
    var mostPopular = [];
    _.each(occurance, function(timesOccured, tag, occurance){
        if (timesOccured === greatestOccurance){
            mostPopular.push(tag);
            popTag += tag + ", "
        }
    })

    
    //console.log(greatestOccurance)        //test
    //console.log(popTag);                  //test
   // console.log(`There were ${mostPopular.length} most popular tags. They were ${popTag} with ${greatestOccurance} customers each.`)
    return "There were " + mostPopular.length + " most popular tags. They were " +popTag+ " with " +greatestOccurance+ " customers each."
    
    //want to iterate throughout the tags and get them all into a single array
    //want to count the number of times a given tag happens in an array
}; 

console.log(whichTags(customers));


//NUMBER 10: Find a summary of genders using the .reduce funciton.
function genderBreakdown(people){
    var genders = {};
    _.each(people, function(person, i, people){
        if (genders.hasOwnProperty(person["gender"]) === false){
            genders[person["gender"]] = 0; 
        }
    })
    
    _.reduce(people, function(total, nextInLine, i){
        if (genders.hasOwnProperty(people[i]["gender"])){
            return genders[people[i]["gender"]] += 1;
        } else { return total;
    }}
    , 0)
        
    
    return genders;
     
};

console.log(genderBreakdown(customers));