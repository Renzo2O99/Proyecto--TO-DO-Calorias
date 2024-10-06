export interface Category {
  id: number
  icon: string
  name: string
}

export interface Activity {
  id: string
  category: number
  name: string
  caloriesNumber: number
  caloriesForm: string
  date: string
}