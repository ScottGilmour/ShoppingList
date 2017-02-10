import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Recipe } from './recipe';
import { FetchRecipeService } from './fetch-recipe.service';
import { GroceryService } from './grocery.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'recipe-form',
  templateUrl: './recipe-form.component.html',
  animations: [
    trigger('enterList', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class RecipeFormComponent {
  constructor(private recipeService: FetchRecipeService, private groceryService: GroceryService) { }
  recipes: any;
  queryString = '';
  submitted = false;
  addButtonState = false;
  addIngredientsButtonState = false;

  createRange(number: number) {
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  onAddAll(ingredients: any) {
    this.addIngredientsButtonState = true;
    this.groceryService.addIngredients(ingredients).subscribe(ingredients => console.log(ingredients));
  }

  addIngredientsToRecipe(id: number, res: string[]) {
    this.addButtonState = false;
    this.addIngredientsButtonState = false;
    for (let x = 0; x < this.recipes.response.results.length; x++) {
      if (this.recipes.response.results[x].recipe_id == id) {
        this.recipes.response.results[x].ingredients = res;
        console.log(this.recipes.response.results[x]);
      }
    }
  }

  onRemove(id: number) {
    for (let x = 0; x < this.recipes.response.results.length; x++) {
      if (this.recipes.response.results[x].recipe_id == id) {
        console.log(this.recipes.response.results[x]);
        this.recipes.response.results.splice(x, 1);
      }
    }
  }

  onAdd(url: string, id: number) {
    this.addButtonState = true;
    this.addIngredientsButtonState = false;
    console.log('adding recipe');
    this.recipeService.addRecipe(url).subscribe(results => this.addIngredientsToRecipe(id, results));
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.queryString);
    this.recipeService.getRecipe(this.queryString).subscribe(recipes => this.recipes = recipes);
  }
}
