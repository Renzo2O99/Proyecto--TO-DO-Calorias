import { useEffect, useMemo, useReducer } from "react";
import { Form } from "./components/Form";
import { activityReducer, initialState } from "./reducers/activityReducer";
import { ActivityList } from "./components/ActivityList";
import { motion } from "framer-motion";
import { CalorieTracker } from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = useMemo(() => {
    return state.activities.length > 0
  }, [state.activities])

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.2
      }
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
  };

  return (
    <>
      <motion.header
        className="bg-gradient-to-r from-purple-600 to-indigo-600 py-8 px-4 shadow-lg"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-5 md:space-y-0">
          <motion.h1 
            className="text-2xl font-extrabold text-white uppercase tracking-wide md:text-3xl"
            variants={itemVariants}
          >
            Contador de Calorías
          </motion.h1>
          <button 
            disabled={!canRestartApp}
            onClick={() => dispatch({type: 'restart-app'})}
            className={`bg-white text-indigo-600 py-2 px-6 rounded-full font-bold text-sm uppercase tracking-wide ${canRestartApp ? 'transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-100' : 'disabled:opacity-60'}`}>
            Reiniciar App
          </button>
        </div>
      </motion.header>

      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form 
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="mx-auto max-w-[800px] bg-gradient-to-b from-indigo-900 to-purple-900 m-10 md:rounded-lg">
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl py-10 ">
            <CalorieTracker 
              activities={state.activities}
            />
          </div>
      </section>

      <section className="p-10 pt-5 mx-auto max-w-4xl">
        {state.activities.length === 0 ? (
          <h2 className="text-3xl font-bold text-slate-600 text-center mb-5 md:text-4xl">No hay actividades aún...</h2>
        ) : (
          <ActivityList 
            activities={state.activities}
            dispatch={dispatch}
          />
        )}
      </section>
    </>
  );
}

export default App;