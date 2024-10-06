import { useMemo } from "react"
import { Activity } from "../types/types"
import { CalorieDisplay } from "./CalorieDisplay"

interface CalorieTrackerProps {
  activities: Activity[]
}

export const CalorieTracker = ({activities}: CalorieTrackerProps) => {
  const caloriesConsumed = useMemo(() => activities.reduce(
    (total, activity) => activity.category === 1 ? total + +activity.caloriesForm : total, 0 
  ) ,[activities])

  const caloriesBurned = useMemo(() => activities.reduce(
    (total, activity) => activity.category === 2 ? total + +activity.caloriesForm : total, 0 
  ) ,[activities])

  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

  return (
    <>
      <h2 className="text-3xl font-black text-white text-center md:text-4xl md:mb-5">
        Resumen de Calorías
      </h2>

      <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-around">
        <CalorieDisplay 
          calories={caloriesConsumed}
          text={"Consumidas"}
        />
        
        <CalorieDisplay 
          calories={caloriesBurned}
          text="Quemadas"
        />
        
        <CalorieDisplay 
          calories={netCalories}
          text="Diferencia"
        />
      </div>
    </>
  )
}
