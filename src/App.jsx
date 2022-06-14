import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import { Header } from "./components/Header/Header"
import { Instructions } from "./components/Instructions/Instructions"
import { Chip } from "./components/Chip/Chip"
import { useState } from "react"
import { NutritionalLabel } from "./components/NutritionalLabel/NutritionalLabel"

import { createDataSet } from "./data/dataset"
import "./App.css"
import { process_params } from "express/lib/router"

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()
export function App() {

  const [selectedCategory, setSelectedCategory] = useState(0)

  /*
  const selectCategory = (category) => {
    setSelectedCategory(category)
    console.log("selectedCategory: ", selectedCategory)
  }
  */

  const [selectedRestaurant, setSelectedRestaurant] = useState(0)

  /*
  const selectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant)
    console.log("selectedRestaurant: ", selectedRestaurant)
  }
  */

  const [selectedMenuItem, setSelectedMenuItem] = useState(0)

  /*
  const selectMenuItem = (menuItem) => {
    setSelectedMenuItem(menuItem)

    console.log(selectedMenuItem);
  }
  */

  const instructionsToDisplay = () => {
    if(selectedRestaurant === 0 && selectedCategory === 0){
      return appInfo.instructions.start
    } else if(selectedRestaurant === 0) {
      return appInfo.instructions.onlyCategory
    } else if(selectedCategory === 0) {
      return appInfo.instructions.onlyRestaurant
    } else if(selectedMenuItem === 0) {
      return appInfo.instructions.noSelectedItem
    } else {
      return appInfo.instructions.allSelected
    }
  }

 const currentMenuItems = data.filter(item => {
    return (
      item.food_category == selectedCategory &&
      item.restaurant == selectedRestaurant
    )
  });

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((category) => {
            return (
              <Chip key = {category}
                    label = {category}
                    
                    isActive = {selectedCategory === category}
                    onClick = {() => {
                      setSelectedCategory(category)
                      setSelectedMenuItem(0)
                    }}

                    onClose = {(e) => {
                      e.stopPropagation()
                      setSelectedCategory(0)
                    }}
                    />
            )          
            })}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
      <Header title = {appInfo.title}
              tagline = {appInfo.tagline}
              description = {appInfo.description} />
        

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
            {restaurants.map((restaurant) => {
            return (
              <Chip key = {restaurant}
                    label = {restaurant}
                    isActive = {selectedRestaurant === restaurant}
                    onClick = {() => {
                      setSelectedRestaurant(restaurant)
                      setSelectedMenuItem(0)        
                    }}

                    onClose = {(e) => {
                      e.stopPropagation()
                      setSelectedRestaurant(0)
                    }}
                    />
            )      
            })}
            </div>
        </div>

        <Instructions instructions = { instructionsToDisplay() } />

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {/* YOUR CODE HERE */}
            {currentMenuItems.map((item) => {
              return (
                <Chip key = {item.item_name}
                      label = {item.item_name}
                      isActive = {selectedMenuItem === item}
                      onClick = {() => setSelectedMenuItem(item)}
                      onClose = {(e) => {
                        e.stopPropagation()
                        setSelectedMenuItem(0)
                      }}
                      />
              )
            })}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
            {/* YOUR CODE HERE */}
            <NutritionalLabel item = {selectedMenuItem}
            />
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
