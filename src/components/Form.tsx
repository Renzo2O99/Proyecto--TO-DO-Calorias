import { Dispatch, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { categories } from "../data/category"
import type { Activity } from "../types/types"
import { ActivityActions, ActivityState } from "../reducers/activityReducer"
import { motion } from "framer-motion"
import { FaPizzaSlice, FaDumbbell, FaClipboardList, FaFire } from 'react-icons/fa'

interface FormProps {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  caloriesNumber: 0,
  caloriesForm: '',
  date: '' // Añade el campo de fecha
}

export const Form = ({dispatch, state}: FormProps) => {
  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.find(
        stateActivity => stateActivity.id === state.activeId
      )
  
      if (selectedActivity) {
        setActivity(selectedActivity)
      }
    }
  }, [state.activeId])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const isNumberField = ['category', 'caloriesNumber'].includes(e.target.id)
    
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () => {
    const { name, caloriesForm, date } = activity
    return name.trim() !== '' && +caloriesForm > 0 && date !== ''
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({
      type: 'save-activity',
      payload: { newActivity: activity }
    })

    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto px-6 py-8 rounded-xl shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
      }}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="category" className="block text-white font-bold text-lg">
            🏷️ Categoría:
          </label>
          <div className="relative">
            <select 
              name="category" 
              id="category"
              value={activity.category} 
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 text-gray-900 bg-white/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {categories.map(category => (
                <option 
                  key={category.id}
                  value={category.id}
                >
                  {`${category.icon} ${category.name}`}
                </option>
              ))}
            </select>
            {activity.category === 1 ? 
              <FaPizzaSlice className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" /> :
              <FaDumbbell className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            }
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="block text-white font-bold text-lg">
            📝 Actividad:
          </label>
          <div className="relative">
            <input 
              type="text" 
              id="name"
              value={activity.name} 
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 text-gray-900 bg-white/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Cardio, etc..."
            />
            <FaClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="caloriesForm" className="block text-white font-bold text-lg">
            🔥 Calorías:
          </label>
          <div className="relative">
            <input 
              type="number" 
              id="caloriesForm"
              value={activity.caloriesForm} 
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 text-gray-900 bg-white/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ej. de Calorías: 300, 500, 900, etc..."
            />
            <FaFire className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="block text-white font-bold text-lg">
            📅 Fecha:
          </label>
          <div className="relative">
            <input 
              type="date" 
              id="date"
              value={activity.date} 
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 text-gray-900 bg-white/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <input 
            type="submit"
            disabled={!isValidActivity()} 
            value={activity.category === 1 ? "🍽️ Guardar Comida" : "💪 Guardar Ejercicio"}
            className="w-full my-6 py-3 px-4 bg-indigo-700 text-white font-bold uppercase rounded-full cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-indigo-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
          />
        </motion.div>
      </form>
    </motion.div>
  )
}
