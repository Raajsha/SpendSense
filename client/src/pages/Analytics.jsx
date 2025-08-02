import {useState, useEffect, useMemo} from 'react'
import { budgetAPI, transactionAPI } from '../services/api.js'
import {BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    Pie, PieChart, Cell, ComposedChart, Line, LineChart
} from 'recharts'
import { Filter } from 'lucide-react'
import toast from 'react-hot-toast'

const Analytics = () => {
    const now = new Date()
    const [loading, setLoading] = useState(true)
    const [budgets, setBudgets] = useState([])
    const [txns, setTxns] = useState([])
    const [selectedMonth, setSelectedMonth] = useState(`${now.getMonth()}`)
    const [selectedCategory, setSelectedCategory] = useState('')
    
    const months = [
    { value: '0', label: 'January' },
    { value: '1', label: 'February' },
    { value: '2', label: 'March' },
    { value: '3', label: 'April' },
    { value: '4', label: 'May' },
    { value: '5', label: 'June' },
    { value: '6', label: 'July' },
    { value: '7', label: 'August' },
    { value: '8', label: 'September' },
    { value: '9', label: 'October' },
    { value: '10', label: 'November' },
    { value: '11', label: 'December' }
  ];


    const startofMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endofMonth = new Date(now.getFullYear(), now.getMonth()+ 1, 0)

    const start = startofMonth.toISOString().split('T')[0]
    const end = endofMonth.toISOString().split('T')[0]
    useEffect(() => {
        fetchTxnsBudgets();
    },[])

    const fetchTxnsBudgets = async() => {
        try {
            const {data: Txns} = await transactionAPI.getTxn({
                start: start,
                end: end 
            })
            const {data: Budgets} = await budgetAPI.getWarnings()
            setTxns(Txns)
            setBudgets(Budgets)
            console.log(Txns)
            console.log(Budgets)
        } catch (error) {
            console.log(error)
            toast.error("Failed to load data")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        filterTxns()
    },[selectedCategory,selectedMonth])

    const filterTxns = async() => {
        setLoading(true)
        try {
            if(selectedMonth === 'all'){
                const {data: filteredTxns} = await transactionAPI.getTxn({
                category: selectedCategory,
                start : new Date(now.getFullYear(), 1, 1),
                end: new Date(now.getFullYear(), 12, 0)
                })
                setTxns(filteredTxns)
                console.log(filteredTxns)
            } else {
                const {data: filteredTxns} = await transactionAPI.getTxn({
                category: selectedCategory,
                start : new Date(now.getFullYear(), selectedMonth || now.getMonth(), 1),
                end: new Date(now.getFullYear(), (Number(selectedMonth) || now.getMonth())+1, 0)
                })
                setTxns(filteredTxns)
                console.log(filteredTxns, selectedMonth)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to load filtered transactions")
        } finally {
            setLoading(false)
        }
    }
    const aggregatedTxns = useMemo(() => {
        return (txns.filter(t => t.type === 'expense')).reduce((acc,txn) => {
        const existing = acc.find(item => item.category === txn.category)
        if(existing) {
            existing.amount += txn.amount 
        } else {
            acc.push({category: txn.category, amount : txn.amount})
        }
        return acc
        },[])
    },[txns])

    const totalIncome = txns.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = txns.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    const incomeExpenseData = [
        {name : 'Income', value : totalIncome, color : "#10b981"},
        {name : 'Expense', value : totalExpenses, color: "#ef4444"}
    ]

    const dailyTrends = useMemo(() => {        
        const dailyData = {};
        const daysInMonth = new Date(now.getFullYear(), parseInt(selectedMonth) + 1, 0).getDate();
        
        // Initialize all days
        for (let day = 1; day <= daysInMonth; day++) {
        dailyData[day] = { 
            day: `${day}`, 
            total: 0, 
            count: 0,
            food: 0,
            transportation : 0,
            entertainment : 0,
            shopping : 0,
            other : 0
        };
        }
        
        txns
        .filter(t => t.type === 'expense')
        .forEach(transaction => {
            const day = new Date(transaction.date).getDate();
            dailyData[day].total += transaction.amount;
            dailyData[day].count += 1;
            if(['food','transportation','entertainment','shopping'].includes(transaction.category)){
                dailyData[day][transaction.category] += transaction.amount; 
            } else {
                dailyData[day].other += transaction.amount  
            }
        });

        return Object.values(dailyData).sort((a, b) => parseInt(a.day) - parseInt(b.day));
    }, [txns, selectedMonth]);

  return (
    <div className='max-w-5xl mx-auto p-3'>
        <h1 className="text-3xl font-bold text-center">
            <span className="bg-gradient-to-r from-white via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Analytics
            </span>
        </h1>
        <p className='text-gray-400 text-lg text-center mt-2'>
            Analyze your spending patterns
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
            <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-blue-300" />
                <h2 className="text-xl font-semibold text-white">Filters</h2>
                </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Month</label>
                    <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value = "" className='bg-slate-800 opacity-50' disabled>Select a month</option>
                    {months.map(month => (
                        <option key={month.value} value={month.value} className="bg-slate-800">{month.label}</option>
                    ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Budget Category</label>
                    <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value = "" className='bg-slate-800'>
                            Select a Category
                        </option>
                    {budgets.map(budget => (
                        <option key={budget.category} value={budget.category} className="bg-slate-800">
                        {budget.category.charAt(0).toUpperCase() + budget.category.slice(1)}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            <div style = {{width: '100%', height : 300}} className = "bg-white/20 border border-white/30 rounded-lg pb-10 ">
            <h1 className="text-white text-lg font-bold p-2 text-center">Spending by Category</h1>
                <ResponsiveContainer width = "100%" height = "100%">
                    <BarChart
                        width = {100}
                        height = {300}
                        data = {aggregatedTxns}
                        margin = {{
                            top: 10,
                            bottom: 10,
                            left: 10,
                            right: 40,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke = "#ffffff20"/>
                        <XAxis dataKey= "category" stroke='#cbd5e1'/>
                        <YAxis stroke = "#cbd5e1"/>
                        <Tooltip contentStyle={{
                            backgroundColor : '#1e293b',
                            border : '1px solid #475569',
                            borderRadius : '8px',
                            color : '#ffffff' 
                        }}
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}/>
                        <Bar dataKey="amount" fill = "#0f23fc" activeBar = {<Rectangle fill = "#0f23fc" stroke = "blue" />} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div style = {{width: '100%', height : 300}} className = "bg-white/20 border border-white/30 rounded-lg pb-10">
                <h1 className="text-white text-lg font-bold p-2 text-center">Income vs Expense</h1>
                <ResponsiveContainer width = "100%" height = "100%">
                    <PieChart>
                        <Pie
                            data ={incomeExpenseData}
                            cx = "50%"
                            cy = "50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {incomeExpenseData.map((entry, index) => {
                                return <Cell key = {`cell-${index}`} fill = {entry.color} />
                            })}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e293b', 
                                border: '1px solid #475569',
                                borderRadius: '8px',
                                color: '#ffffff'
                            }}
                            formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                        />
                        <Legend />  
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div style = {{width: '100%', height : 300}} className = "bg-white/20 border border-white/30 rounded-lg pb-10">
                <h1 className="text-white text-lg font-bold p-2 text-center">
                    Budget vs Actual
                </h1>
                <ResponsiveContainer width = "100%" height = "100%">
                    <ComposedChart data={budgets}>
                        <CartesianGrid strokeDasharray="3 3" stroke = "#ffffff20"/>
                        <XAxis dataKey= "category" stroke='#cbd5e1'/>
                        <YAxis stroke = "#cbd5e1"/>
                        <Tooltip contentStyle={{
                            backgroundColor : '#1e293b',
                            border : '1px solid #475569',
                            borderRadius : '8px',
                            color : '#ffffff' 
                        }}
                        formatter={(value,name) => [`$${value.toLocaleString()}`]}/>
                        <Bar dataKey = "budget" fill = "#60a5fa" name = "Budget" />
                        <Bar dataKey = "spent" stackId = 'a' fill = "#ef4444" name = "Spent" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <div style = {{width: '100%', height : 300}} className = "bg-white/20 border border-white/30 rounded-lg pb-10">
                <h1 className="text-white text-lg font-bold p-2 text-center">Daily spending and breakdown</h1>
                <ResponsiveContainer width = "100%" height = "100%">
                    <ComposedChart data = {dailyTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke = "#ffffff20"/>
                        <XAxis dataKey = "day" stroke = "#cbd5e1"/>
                        <YAxis stroke = "#cbd5e1"/>
                        <Tooltip contentStyle={{
                            backgroundColor : '#1e293b',
                            border : '1px solid #475569',
                            borderRadius : '8px',
                            color : '#ffffff'
                            }}
                            formatter={(value,name) => [`$${value.toLocaleString()}`,name]}/>
                        <Line 
                            type="monotone" 
                            dataKey="total" 
                            stroke="#10B981" 
                            strokeWidth={3}
                            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                        />
                        <Bar dataKey="food" stackId="a" fill="#3b82f6" name="Food" />
                        <Bar dataKey="transport" stackId="a" fill="#10b981" name="Transport" />
                        <Bar dataKey="entertainment" stackId="a" fill="#f59e0b" name="Entertainment" />
                        <Bar dataKey="shopping" stackId = "a" fill = "" name = "Shopping" />
                        <Bar dataKey="other" stackId="a" fill="#ef4444" name="Other" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}

export default Analytics
