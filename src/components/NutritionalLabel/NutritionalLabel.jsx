import * as React from "react"
import { nutritionFacts } from "../../constants"
import "./NutritionalLabel.css"

export function NutritionalLabel(props) {
  return (
    <div className="nutritional-label">
      <h3 className="title">Nutrition Facts</h3>

      <h4 className="item-name">{props.item.item_name}</h4>

      <ul className="fact-list">
        {/* WRITE CODE HERE */}
      {nutritionFacts.map((item) => {
              return (
                <NutritionalLabelFact
                      description = {item}
                      menuItem = {props.item}
                      />
              )
            })}
      </ul>
    </div>
  )
}

export function NutritionalLabelFact(props) {
  return (
    <li className="nutrition-fact">
      <span className="fact-label">
        {props.description.label}

      </span>{" "}
      <span className="fact-value">
        {props.menuItem[props.description.attribute]}
        
        </span>
    </li>
  )
}

export default NutritionalLabel
