import {PieChart, Pie, Cell, Tooltip} from 'recharts'
import {Trash2Icon, Edit} from 'lucide-react'
import { Link } from 'react-router-dom'
import { budgetAPI } from '../services/api.js'
import toast from 'react-hot-toast'

const Colors = {
    normal : ["#00C49F", "#FF8042"],
    warning: ["#FF4C4C", "#D3D3D3"]
}

const BudgetCard = ({category, budget, spent, warning}) => {
    const remaining = Math.max(budget-spent,0)

    const data = [
        {name: "Spent", value: spent},
        {name: "Remaining", value: remaining},
    ]
    
    return (
        <div 
          className={`bg-white shadow-md rounded-2xl p-4 flex flex-col items-center border-2 ${warning ? "border-red-500 hover:shadow-red-300" : "border-green-400 hover:shadow-green-200"} hover:scale-105 `}>
            <h3 className="text-xl font-semibold">{category.charAt(0).toUpperCase() +category.slice(1)}</h3>
            <p className="text-sm text-gray-600">Budget: ${budget}</p>
            <p className="text-sm text-gray-600">Spent: ${spent}</p>

            <PieChart width = {150} height= {150}>
                <Pie 
                 data={data}
                 innerRadius={40}
                 outerRadius={60}
                 dataKey="value"
                 paddingAngle={5}
                >
                    {data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          fill = {warning ? Colors.warning[index] : Colors.normal[index]}
                        />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    )
}

const BudgetGrid = ({ budgets,setBudgets}) => {
  const handleDelete = async(id) => {  
        try {
          if(window.confirm("Are you sure you want to delete this budget?")){
            await budgetAPI.deleteBudget(id)
            toast.success("Budget deleted successfully")
            setBudgets(prevBudgets => prevBudgets.filter(b => b._id !== id))
          }
        } catch (error) {
          toast.error("Failed to delete budget")
          console.log(error)
        }
    }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {budgets.map((b) => (
        <div key={b._id}>
          <BudgetCard
            category={b.category}
            budget={b.budget}
            spent={b.spent}
            warning={b.warning}
            id = {b._id}
          />
          <div className="mx-auto flex items-center mt-2 ml-2">
            <Link to = {`/edit-budget/${b._id}`} className="text-blue-500 hover:text-blue-300 flex items-center space-x-1 mr-5 ">
              <Edit size = {16} />
              <span>Edit</span>
            </Link>
            <button 
              onClick={() => handleDelete(b._id)}
              className="text-red-500 hover:text-red-300 flex items-center space-x-1">
              <Trash2Icon size = {16} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetGrid;