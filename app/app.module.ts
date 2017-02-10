import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { RecipeFormComponent }  from './recipe-form.component';
import { GroceryListComponent }  from './grocery-list.component';
import { FetchRecipeService } from './fetch-recipe.service';
import { GroceryService } from './grocery.service';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
   ],
  declarations: [ AppComponent, RecipeFormComponent, GroceryListComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ FetchRecipeService, GroceryService ]
})
export class AppModule { }
