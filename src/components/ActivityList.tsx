import { Activity } from "../types/types"
import { categories } from "../data/category"
import { useMemo } from "react"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activityReducer"

interface ActivityListProps {
  activities: Activity[],
  dispatch: React.Dispatch<ActivityActions>
}

export const ActivityList = ({activities, dispatch}: ActivityListProps) => {
  const categoryName = useMemo(() => (
    category: Activity['category']) => 
    categories.map(
      cat => cat.id === category ? `${cat.icon} ${cat.name}` : ''
    ), [activities]
  )
  
  return (
    <>
      <h2 className="text-3xl font-bold text-slate-600 text-center mb-5 md:text-4xl">Comida y Actividades</h2>

      {activities.map(activity => (
        <div key={activity.id} className="relative md:mt-10">
          <p className="inline-flex items-center text-md text-gray-900 tracking-wide py-2 px-6 my-5 rounded-full font-bold bg-violet-500 md:text-lg md:hidden">
            {activity.date}
          </p>

          <div className="max-w-[500px] rounded-md mx-auto px-5 py-10 mb-10 bg-white">
            <div className="flex justify-between relative">
              <div className="flex space-y-2 max-w-36">
                <p className={`flex items-center -ml-10 -mt-8 -left-8 px-5 rounded-md text-white uppercase font-bold 
                ${activity.category === 1 ? 'bg-lime-600' : 'bg-orange-600'}`}>
                  {categoryName(+activity.category)}
                </p>
              </div>

              <div className="flex gap-4 -mt-6 items-center">
                <button>
                  <PencilSquareIcon
                    className="h-8 w-8 text-gray-800"
                    onClick={() => dispatch({type: 'set-activeId', payload: {id: activity.id}})}
                  />
                </button>

                <button>
                  <XCircleIcon
                    className="h-8 w-8 text-red-500"
                    onClick={() => dispatch({type: 'delete-activity', payload: {id: activity.id}})}
                  />
                </button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 py-5 md:text-3xl">
                {activity.name}
              </p>

              <div className="font-black text-xl text-indigo-700 md:text-3xl">
                {activity.caloriesForm} {''}
                <span>Calorías</span>
              </div>
            </div>
          </div>
        </div>


      ))}
    </>
  )
}
