import { Injectable } from "@angular/core";

import { Recipe } from "./recipes.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Buttered Pasta', 
            'A timeless classic', 
            'https://www.allrecipes.com/thmb/oWrKte1auLsqVEcnxa8z1vCZdDU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/67700_RichPastaforthePoorKitchen_ddmfs_4x3_2284-220302ec8328442096df370dede357d7.jpg',
            [
                new Ingredient('Pasta', 1),
                new Ingredient('Butter', 1),
                new Ingredient('Parmesan Cheese', 1)
            ]),
        new Recipe(
            'Flan',
            'Fruity Flan',
            'https://natashaskitchen.com/wp-content/uploads/2023/04/Flan-Recipe-SQ.jpg',
            [
                new Ingredient('Condensed Milk', 1),
                new Ingredient('Evaporated Milk', 1),
                new Ingredient('Heavy Whipping Cream', 1),
                new Ingredient('Vanilla Extract', 1),
                new Ingredient('Eggs', 4)
            ])
      ];

    constructor(private slService: ShoppingListService) {

    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}