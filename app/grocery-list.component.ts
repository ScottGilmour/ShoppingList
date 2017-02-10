import { Component } from '@angular/core';
import { Ingredient } from './ingredient';
import { GroceryService } from './grocery.service';

@Component({
  selector: 'grocery-list',
  templateUrl: './grocery-list.component.html'
})

export class GroceryListComponent  {
  ingredients: Ingredient[];

  constructor(private groceryService: GroceryService) {
      this.groceryService.getIngredients().subscribe(ingredients => this.ingredients = ingredients);
  }



  /*
  getIngredients(): void {
    this.recipeService.getRecipe().subscribe(ingredients => this.ingredients = ingredients);
  }

  ngOnInit(): void {
    this.getIngredients();
  }
  */
}
