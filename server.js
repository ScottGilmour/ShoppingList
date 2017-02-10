var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
const util = require('util');
var app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var list = [];

const FOOD_API_RECIPES = 'https://api.food.com/external/v1/nlp/search';
const USE_FILTER = true;

app.use('/node_modules', express.static('node_modules'));
app.use('/', express.static('.'));
app.use(express.static('app'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.get('/list', function(req, res) {

  if (USE_FILTER) {
    list.forEach(function(item, index, array) {
      list.forEach(function(item2, index2, array2) {
        if (item == item2 && index != index2) {

            //theyre a match, we have to determine the amount, unit & ingredient
            //remove a tags to work with

            var cleanedItem, cleanedItem2;
            cleanedItem = item.replace(/<(?!b\s*\/?)[^>]+>/g, '');
            cleanedItem2 = item2.replace(/<(?!b\s*\/?)[^>]+>/g, '');

            console.log(cleanedItem + '\n' + cleanedItem2);

            //order should be amount > unit > ingredient
            //seperated by white space
            cleanedItem = cleanedItem.split(' ');
            cleanedItem2 = cleanedItem2.split(' ');
            console.log(cleanedItem + '\n' + cleanedItem2);

            //bunch of empty elements, remove
            cleanedItem.forEach(function(element, i, arr) {
              if (cleanedItem[i] == '') {
                cleanedItem.splice(i, 1);
              }
            });

            cleanedItem2.forEach(function(element, i, arr) {
              if (cleanedItem2[i] == '') {
                cleanedItem2.splice(i, 1);
              }
            });

            console.log(cleanedItem + '\n' + cleanedItem2);

            function createIngredientFromArray(arr) {
              var ingredient = {}

              //if first element is a number, we are going to take it as the amount
              if (cleanedItem.length > 0 && parseInt(arr[0])) {
                ingredient.amount = parseInt(arr[0]);
              } else if (String(arg[0])) {
                ingredient.ingredient = String(arr[0]);
              }

              //if second is, uh, say a cup? we can assume type? maybe string?
              if (String(arr[1])) {
                ingredient.type = String(arr[1]);
              }

              //last is string, ingredient
              if (String(arr[2])) {
                ingredient.ingredient = String(arr[2]);
              }

              return ingredient;
            }

            var ingredient = createIngredientFromArray(cleanedItem);
            var ingredient2 = createIngredientFromArray(cleanedItem2);

            console.log(ingredient);
            console.log(ingredient2);

            //oh god adding
            //if the type is the same, just + the amount's?
            //if no type, just add amount
            function addTwoIngredients(ing, ing2) {
              var res = {};
              if (ing.type == ing2.type && ing.ingredient == ing2.ingredient) {
                res.type = ing.type;
                res.amount = ing.amount + ing2.amount;
                res.ingredient = ing.ingredient;
              }

              return res;
            }

            finalIngredient = addTwoIngredients(ingredient, ingredient2);
            if (finalIngredient.amount && finalIngredient.ingredient) {
              /*
              list.forEach(function(item, index, array) {
                list.forEach(function(item2, index2, array2) {
              */

              //replace first with finalIngredient, remove second from array.
              list[index] = finalIngredient.amount + ' ' + (finalIngredient.type ? finalIngredient.type : '') + ' ' + finalIngredient.ingredient;
              list.splice(index2, 1);
              console.log(finalIngredient);
            }




        }
      });
    });
  }

    res.send(list);
});

app.post('/list', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    var ingredients = JSON.parse(req.body.bodyText);

    /*
      TODO super duper complex comparsion and type conversion code shit
    */

    for (ingredient of ingredients) {
      list.push(ingredient);
    }


    res.send(list);
});

app.post('/recipe', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    var requestURL = FOOD_API_RECIPES + '?searchTerm=' + req.body.query + '&pn=1&sortBy=recommended';

    request(requestURL, function(error, response, html) {
      if (!error) {
        var result = JSON.parse(html);
        res.send(JSON.stringify(result));
      } else {
        console.log(error);
        res.sendStatus(400);
      }
    });
});

app.post('/recipe/add', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  if (!req.body.url) return res.sendStatus(200);

  request(req.body.url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      var results = [];

      $('li[data-ingredient]').each(function(i, element) {
        var cleanedResult = '';
        cleanedResult += $(this).html().replace(/<(?!a\s*\/?)[^>]+>/g, '').trim();
        cleanedResult += '</a>';
        results.push(cleanedResult);
      });

      res.send(results);
    } else {
      console.log(error);
      res.sendStatus(400);
    }
  });
});

app.listen(3030, function() {
  console.log('runnin on 3030');
});
