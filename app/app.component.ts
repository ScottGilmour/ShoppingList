import { Component } from '@angular/core';
import { FetchRecipeService } from './fetch-recipe.service';
import { Ingredient } from './ingredient';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'my-app',
  template: `
  <recipe-form></recipe-form>
  <grocery-list></grocery-list> 
  `,
})

export class AppComponent  {

  /*
  getIngredients(): void {
    this.recipeService.getRecipe().subscribe(ingredients => this.ingredients = ingredients);
  }

  ngOnInit(): void {
    this.getIngredients();
  }
  */
}
