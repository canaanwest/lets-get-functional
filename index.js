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
 */
 

// customer data is located in the array >>> customers;
 

//NUMBER 1: Find the number of males
function maleCustomers(people){
    var dudes = _.reduce(people, (prevDudes, currentPerson, i, people)=>{
        if(currentPerson["gender"] === "male"){ return prevDudes += 1} else {return prevDudes;}}, 0);
    
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
 
 return "The average balance of the customers is $" + Math.round(avgBalance*100)/100;
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

console.log(nameStartsWith("a")); 



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
        }})
    return "There were " +count+ " friends of customers whose names began with " + char + "."
    
}

//return "There are " + numberOfFriends + " friends whose names begin with " + char + ".";



console.log(friendsWithNames(customers, "d"));


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

console.log(friendsWith(customers, "Olga Newton"));




//NUMBER 9: DO OVER w/ Recursion: Find out which 3 tags were the most common among customers;
function whichTags2(people){
    var theTags = {}; 
    var inOrder = [];
    //this block of code gets all of the tags into an array for counting
    _.each(people, function(person, i, people){
        if (people[i].hasOwnProperty("tags")){
            _.each(people[i]["tags"], function(tag, j, tags){
                if (!theTags.hasOwnProperty(tag)){
                 theTags[tag] = 1;   
                } else {
                    theTags[tag] += 1;
                }
            })
        }
    })


    var greatestOccurance = 0;
    _.each(theTags, function(timesOccured, tag, theTags){
        if (theTags[tag] > greatestOccurance){
            greatestOccurance = theTags[tag];
        }
    })
    
    
    function pushToInOrder(greatestOccurance){
        if (greatestOccurance === 0){
            return inOrder;
        }
        
        for (var keys in theTags){
            if(theTags[keys] === greatestOccurance){
                inOrder.push(keys);
            }
        }
       
        return pushToInOrder(greatestOccurance-1)

    }
    
    pushToInOrder(greatestOccurance);
    var top3 = _.first(inOrder, 3);
    return "The top 3 tags are " + top3;
}

console.log(whichTags2(customers));




//NUMBER 10: Find a summary of genders using the .reduce funciton.
function genderBreakdown(people){
    var genders = {};
    _.reduce(people, function(total, nextInLine, i){
        if (!genders.hasOwnProperty(people[i]["gender"])){
            return genders[people[i]["gender"]] = 1;
        } else if (genders.hasOwnProperty(people[i]["gender"])){ 
            return genders[people[i]["gender"]] += 1;
        } else {return total;
    }}
    , 0)
        
    
    return genders;
     
};

console.log(genderBreakdown(customers));