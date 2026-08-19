import React, { useState, useEffect, useRef } from 'react'
import { Plus, TrendingUp, Dumbbell, BookOpen, Calendar, ChevronLeft, ChevronRight, Menu, X, Target, Flame, Search, BarChart3, LineChart, PieChart, Download, Upload, Moon, Sun, Edit2, Trash2, BarChart2, MessageSquare, Loader2, Star, Check, Zap } from 'lucide-react'
import { LineChart as RechartsLineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

const defaultQuotes = [
  "Action is the foundational key to all success. — Pablo Picasso",
  "You don't have to be extreme, just consistent. — Anonymous",
  "Amateurs sit and wait for inspiration, the rest of us just get up and go to work. — Stephen King",
  "Focus is a matter of deciding what things you're not going to do. — John Carmack",
  "The secret of getting ahead is getting started. — Mark Twain",
  "Simplicity boils down to two steps: Identify the essential. Eliminate the rest. — Leo Babauta",
  "Don't judge each day by the harvest you reap but by the seeds that you plant. — Robert Louis Stevenson",
  "You get what you focus on, so focus on what you want. — Anonymous",
  "Well done is better than well said. — Benjamin Franklin",
  "You miss 100% of the shots you don't take. — Wayne Gretzky",
  "Done is better than perfect. — Sheryl Sandberg",
  "Energy flows where attention goes. — Tony Robbins",
  "If you spend too much time thinking about a thing, you'll never get it done. — Bruce Lee",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit. — Will Durant",
  "Discipline is choosing between what you want now and what you want most. — Abraham Lincoln",
  "Lost time is never found again. — Benjamin Franklin",
  "The bad news is time flies. The good news is you're the pilot. — Michael Altshuler",
  "You don't find time. You make time. — Anonymous",
  "Either you run the day, or the day runs you. — Jim Rohn",
  "Start where you are. Use what you have. Do what you can. — Arthur Ashe",
  "It is not enough to be busy; so are the ants. The question is: What are we busy about? — Henry David Thoreau",
  "Action will destroy your anxiety. — Ian K. Smith",
  "Focus on being productive instead of busy. — Tim Ferriss",
  "The way to get started is to quit talking and begin doing. — Walt Disney",
  "Risk comes from not knowing what you're doing. — Warren Buffett",
  "Small disciplines repeated with consistency every day lead to great achievements gained slowly over time. — John C. Maxwell",
  "Time is what we want most, but what we use worst. — William Penn",
  "You can't build a reputation on what you're going to do. — Henry Ford",
  "Inaction breeds doubt and fear. Action breeds confidence and courage. — Dale Carnegie",
  "An ounce of action is worth a ton of theory. — Ralph Waldo Emerson",
  "Efficiency is doing things right; effectiveness is doing the right things. — Peter Drucker",
  "Success usually comes to those who are too busy to be looking for it. — Henry David Thoreau",
  "Do the hard jobs first. The easy jobs will take care of themselves. — Dale Carnegie",
  "Tomorrow is often the busiest day of the week. — Spanish Proverb",
  "Never mistake activity for achievement. — John Wooden",
  "You may delay, but time will not. — Benjamin Franklin",
  "Action is the real measure of intelligence. — Napoleon Hill",
  "A goal is a dream with a deadline. — Napoleon Hill",
  "If you want to make an easy job seem mighty hard, just keep putting off doing it. — Olin Miller",
  "The best way out is always through. — Robert Frost",
  "Things may come to those who wait, but only the things left by those who hustle. — Abraham Lincoln",
  "Work hard in silence, let your success be your noise. — Frank Ocean",
  "Success is the sum of small efforts, repeated day in and day out. — Robert Collier",
  "Start before you're ready. — Steven Pressfield",
  "You don't need a new plan, you need execution. — Anonymous",
  "Strive for progress, not perfection. — David Perell",
  "Procrastination is the thief of time. — Edward Young",
  "To think too long about doing a thing often comes to nothing. — Marco Polo",
  "Action is a high-cost, high-risk game. But it is far safer than inaction. — Harry Truman",
  "What you do today can improve all your tomorrows. — Ralph Marston",
  "Motivation is what gets you started. Habit is what keeps you going. — Jim Ryun",
  "The most effective way to do it, is to do it. — Amelia Earhart",
  "You can't plow a field by turning it over in your mind. — Irish Proverb",
  "Execution is everything. — John Doerr",
  "If you are not moving forward, you are moving backward. — Herb Brooks",
  "The critical ingredient is getting off your butt and doing something. — Nolan Bushnell",
  "Ideas are easy. Implementation is hard. — Guy Kawasaki",
  "Dream big. Start small. But most of all, start. — Simon Sinek",
  "Don't count the days, make the days count. — Muhammad Ali",
  "Make each day your masterpiece. — John Wooden",
  "You grow through what you go through. — Anonymous",
  "Great acts are made up of small deeds. — Lao Tzu",
  "Skill is only developed by hours and hours of work. — Usain Bolt",
  "Action cures fear. — David J. Schwartz",
  "You don't have to see the whole staircase, just take the first step. — Martin Luther King Jr.",
  "The impediment to action advances action. What stands in the way becomes the way. — Marcus Aurelius",
  "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus. — Alexander Graham Bell",
  "To think is easy. To act is hard. But the hardest thing in the world is to act in accordance with your thinking. — Johann Wolfgang von Goethe",
  "Fall seven times, stand up eight. — Japanese Proverb",
  "Do what you can, with what you have, where you are. — Theodore Roosevelt",
  "Everything is hard before it is easy. — Goethe",
  "If you want something done, give it to a busy person. — Laura Hillenbrand",
  "Plans are only good intentions unless they immediately degenerate into hard work. — Peter Drucker",
  "No man was ever great by imitation. — Samuel Johnson",
  "Absorb what is useful, discard what is not, add what is uniquely your own. — Bruce Lee",
  "You can't connect the dots looking forward; you can only connect them looking backward. — Steve Jobs",
  "If you're going through hell, keep going. — Winston Churchill",
  "Your time is limited, so don't waste it living someone else's life. — Steve Jobs",
  "Persistence is not a long race; it is many short races one after the other. — Walter Elliot",
  "Keep your eyes on the stars, and your feet on the ground. — Theodore Roosevelt",
  "Be stubborn about your goals and flexible about your methods. — Anonymous",
  "Success is walking from failure to failure with no loss of enthusiasm. — Winston Churchill",
  "The man who moves a mountain begins by carrying away small stones. — Confucius",
  "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
  "Everything you've ever wanted is on the other side of fear. — George Addair",
  "Opportunities don't happen, you create them. — Chris Grosser",
  "It does not matter how slowly you go as long as you do not stop. — Confucius",
  "Hard work beats talent when talent doesn't work hard. — Tim Notke",
  "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success. — James Cameron",
  "Life is what happens to you while you're busy making other plans. — John Lennon",
  "The only place where success comes before work is in the dictionary. — Vidal Sassoon",
  "Do what you love and you'll never work a day in your life. — Marc Anthony",
  "People who are crazy enough to think they can change the world, are the ones who do. — Rob Siltanen",
  "Failure is simply the opportunity to begin again, this time more wisely. — Henry Ford",
  "We become what we think about. — Earl Nightingale",
  "The best revenge is massive success. — Frank Sinatra",
  "Logic will get you from A to B. Imagination will take you everywhere. — Albert Einstein",
  "Safety is mostly a superstition. It does not exist in nature. — Helen Keller",
  "Too many people spend money they haven't earned, to buy things they don't want, to impress people they don't like. — Will Rogers",
  "An unexamined life is not worth living. — Socrates"
]

function LoadingScreen({ darkMode, quotes }) {
  const [quote, setQuote] = useState('')
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const quotesArray = quotes && quotes.length > 0 ? quotes.map(q => q.text) : defaultQuotes
    const randomQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)]
    setQuote(randomQuote)
  }, [quotes])

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} z-50`}>
      <div className="text-center max-w-lg px-8">
        <div className="mb-8">
          <Loader2 className={`w-16 h-16 mx-auto ${darkMode ? 'text-blue-500' : 'text-blue-600'} animate-spin`} />
        </div>
        
        <div className="mb-6">
          <div className={`w-full h-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'} rounded-full overflow-hidden`}>
            <div 
              className={`h-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} transition-all duration-300`}
              style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            />
          </div>
        </div>

        <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 leading-relaxed`}>
          {quote}
        </p>
        
        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Loading your personal tracker...
        </p>
      </div>
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768)
  const [darkMode, setDarkMode] = useState(false)
  const [selectedNumberForChart, setSelectedNumberForChart] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sectionOrder, setSectionOrder] = useState([
    'dashboard', 'metrics', 'workouts', 'journal', 'skates', 'calendar', 'goalsetter', 'onerm', 'analytics', 'chatbot', 'quotes'
  ])
  const [draggedSection, setDraggedSection] = useState(null)
  const [data, setData] = useState({
    numbers: [],
    metrics: [],
    workouts: [],
    journal: [],
    scheduled: [],
    goals: [],
    goalHistory: [],
    streaks: {},
    skates: [],
    deletedItems: [],
    actionHistory: [],
    targets: [],
    targetHistory: [],
    quotes: []
  })

  const logAction = (action, itemType, itemName, details = {}) => {
    try {
      const now = new Date()
      const actionEntry = {
        id: Date.now(),
        action: action || 'unknown',
        itemType: itemType || 'unknown',
        itemName: itemName || 'unnamed',
        details: details || {},
        timestamp: now.toISOString(),
        localDate: now.toLocaleDateString()
      }
      setData(prev => {
        if (!prev || !Array.isArray(prev.actionHistory)) {
          return prev
        }
        return {
          ...prev,
          actionHistory: [
            actionEntry,
            ...prev.actionHistory
          ].slice(0, 10000) // Keep only last 10,000 actions
        }
      })
    } catch (error) {
      console.error('Error logging action:', error)
    }
  }

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('trackerData')
      if (saved) {
        try {
          const parsedData = JSON.parse(saved)
          
          // Validate parsed data is an object
          if (!parsedData || typeof parsedData !== 'object') {
            console.error('Invalid data structure in localStorage')
            localStorage.removeItem('trackerData')
            throw new Error('Invalid data structure')
          }
          
          // Ensure all required arrays exist with proper defaults
          const safeData = {
            numbers: Array.isArray(parsedData.numbers) ? parsedData.numbers : [],
            metrics: Array.isArray(parsedData.metrics) ? parsedData.metrics : [],
            workouts: Array.isArray(parsedData.workouts) ? parsedData.workouts.map(w => ({
              ...w,
              difficulty: w.difficulty || 0
            })) : [],
            journal: Array.isArray(parsedData.journal) ? parsedData.journal : [],
            scheduled: Array.isArray(parsedData.scheduled) ? parsedData.scheduled : [],
            goals: Array.isArray(parsedData.goals) ? parsedData.goals : [],
            goalHistory: Array.isArray(parsedData.goalHistory) ? parsedData.goalHistory : [],
            streaks: (parsedData.streaks && typeof parsedData.streaks === 'object') ? parsedData.streaks : {},
            skates: Array.isArray(parsedData.skates) ? parsedData.skates : [],
            deletedItems: Array.isArray(parsedData.deletedItems) ? parsedData.deletedItems : [],
            actionHistory: Array.isArray(parsedData.actionHistory) ? parsedData.actionHistory : [],
            targets: Array.isArray(parsedData.targets) ? parsedData.targets : [],
            targetHistory: Array.isArray(parsedData.targetHistory) ? parsedData.targetHistory : [],
            quotes: Array.isArray(parsedData.quotes) && parsedData.quotes.length > 0 ? parsedData.quotes : defaultQuotes.map((text, index) => ({ id: index, text }))
          }
          
          // Cleanup deleted items older than 2 days
          const twoDaysAgo = new Date()
          twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
          safeData.deletedItems = safeData.deletedItems.filter(item => {
            try {
              const deletedDate = new Date(item.deletedAt)
              return deletedDate > twoDaysAgo
            } catch {
              return false
            }
          })
          
          setData(safeData)
        } catch (parseError) {
          console.error('Error parsing saved data:', parseError)
          localStorage.removeItem('trackerData')
        }
      }
      
      const savedDarkMode = localStorage.getItem('darkMode')
      if (savedDarkMode) {
        try {
          setDarkMode(JSON.parse(savedDarkMode))
        } catch (e) {
          console.error('Error parsing dark mode:', e)
        }
      }
      
      const savedSectionOrder = localStorage.getItem('sectionOrder')
      if (savedSectionOrder) {
        try {
          const parsedOrder = JSON.parse(savedSectionOrder)
          // Filter out 'goals' from saved section order if it exists
          const filteredOrder = Array.isArray(parsedOrder) 
            ? parsedOrder.filter(section => section !== 'goals')
            : ['dashboard', 'metrics', 'workouts', 'journal', 'skates', 'calendar', 'onerm', 'analytics', 'chatbot', 'quotes', 'history']
          setSectionOrder(filteredOrder)
        } catch (e) {
          console.error('Error parsing section order:', e)
        }
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      // Hide loading screen after data is loaded
      setTimeout(() => setIsLoading(false), 1500)
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('trackerData', JSON.stringify(data))
  }, [data])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('sectionOrder', JSON.stringify(sectionOrder))
  }, [sectionOrder])

  const handleDragStart = (section) => {
    setDraggedSection(section)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (targetSection) => {
    if (draggedSection === targetSection) return
    if (targetSection === 'dashboard') return // Dashboard is locked as first

    const newOrder = [...sectionOrder]
    const draggedIndex = newOrder.indexOf(draggedSection)
    const targetIndex = newOrder.indexOf(targetSection)

    newOrder.splice(draggedIndex, 1)
    newOrder.splice(targetIndex, 0, draggedSection)

    // Ensure dashboard stays first
    const dashboardIndex = newOrder.indexOf('dashboard')
    if (dashboardIndex > 0) {
      newOrder.splice(dashboardIndex, 1)
      newOrder.unshift('dashboard')
    }

    setSectionOrder(newOrder)
    setDraggedSection(null)
  }

  const handleDragEnd = () => {
    setDraggedSection(null)
  }

  const sectionConfig = {
    dashboard: { icon: TrendingUp, label: 'Dashboard' },
    metrics: { icon: Flame, label: 'Metrics' },
    workouts: { icon: Dumbbell, label: 'Workouts' },
    journal: { icon: BookOpen, label: 'Journal' },
    skates: { icon: Zap, label: 'Skates' },
    calendar: { icon: Calendar, label: 'Calendar' },
    goalsetter: { icon: Target, label: 'Goal Setter' },
    onerm: { icon: BarChart2, label: '1RM Calculator' },
    analytics: { icon: BarChart3, label: 'Analytics' },
    chatbot: { icon: MessageSquare, label: 'Personal Assistant' },
    quotes: { icon: Star, label: 'Quotes' }
  }

  const addNumberEntry = (name, value, pinned = false) => {
    const now = new Date()
    const id = Date.now()
    setData(prev => ({
      ...prev,
      numbers: [...prev.numbers, { id, name, value, pinned, date: now.toISOString(), localDate: now.toLocaleDateString() }]
    }))
    logAction('added', 'number', name, { value, pinned })
  }

  const addMetricEntry = (name, currentValue, target = null, pinned = false) => {
    const id = Date.now()
    const now = new Date()
    setData(prev => ({
      ...prev,
      metrics: [...prev.metrics, { id, name, currentValue, target, pinned, date: now.toISOString(), localDate: now.toLocaleDateString() }]
    }))
    logAction('added', 'metric', name, { currentValue, target, pinned })
  }

  const addWorkout = (name, exercises, notes, difficulty) => {
    const now = new Date()
    const id = Date.now()
    setData(prev => ({
      ...prev,
      workouts: [...prev.workouts, { id, name, exercises, notes, difficulty, date: now.toISOString(), localDate: now.toLocaleDateString() }]
    }))
    logAction('added', 'workout', name, { exercises, notes, difficulty })
  }

  const updateWorkout = (id, name, exercises, notes, difficulty) => {
    const workout = data.workouts.find(w => w.id === id)
    if (workout) {
      const changes = []
      if (workout.name !== name) changes.push(`name: "${workout.name}" → "${name}"`)
      if (workout.difficulty !== difficulty) changes.push(`difficulty: ${workout.difficulty} → ${difficulty}`)
      if (JSON.stringify(workout.exercises) !== JSON.stringify(exercises)) changes.push(`exercises updated`)
      if (workout.notes !== notes) changes.push(`notes updated`)
      
      setData(prev => ({
        ...prev,
        workouts: prev.workouts.map(w => w.id === id ? { ...w, name, exercises, notes, difficulty } : w)
      }))
      logAction('updated', 'workout', name, { 
        exercises, 
        notes, 
        difficulty,
        changes: changes.join(', '),
        changeType: changes.length > 0 ? 'modified' : 'unchanged'
      })
    }
  }

  const addJournalEntry = (title, content) => {
    const now = new Date()
    const id = Date.now()
    setData(prev => ({
      ...prev,
      journal: [...prev.journal, { id, title, content, date: now.toISOString(), localDate: now.toLocaleDateString() }]
    }))
    logAction('added', 'journal', title, { content })
  }

  const addSkate = (title, duration, performance, difficulty, energy, notes, date) => {
    const skateDate = date || new Date().toISOString()
    const id = Date.now()
    setData(prev => ({
      ...prev,
      skates: [...prev.skates, { id, title, duration, performance, difficulty, energy, notes, date: skateDate, localDate: new Date(skateDate).toLocaleDateString() }]
    }))
    logAction('added', 'skate', title, { duration, performance, difficulty, energy, notes })
  }

  const updateSkate = (id, title, duration, performance, difficulty, energy, notes, date) => {
    const skate = data.skates.find(s => s.id === id)
    if (skate) {
      const changes = []
      if (skate.title !== title) changes.push(`title: "${skate.title}" → "${title}"`)
      if (skate.duration !== duration) changes.push(`duration: ${skate.duration} → ${duration}`)
      if (skate.performance !== performance) changes.push(`performance: ${skate.performance} → ${performance}`)
      if (skate.difficulty !== difficulty) changes.push(`difficulty: ${skate.difficulty} → ${difficulty}`)
      if (skate.energy !== energy) changes.push(`energy: ${skate.energy} → ${energy}`)
      if (skate.notes !== notes) changes.push(`notes updated`)
      
      setData(prev => ({
        ...prev,
        skates: prev.skates.map(s => s.id === id ? { ...s, title, duration, performance, difficulty, energy, notes, date: date || s.date, localDate: new Date(date || s.date).toLocaleDateString() } : s)
      }))
      logAction('updated', 'skate', title, { 
        duration, 
        performance, 
        difficulty, 
        energy, 
        notes,
        changes: changes.join(', '),
        changeType: changes.length > 0 ? 'modified' : 'unchanged'
      })
    }
  }

  const deleteSkate = (id) => {
    const skate = data.skates.find(s => s.id === id)
    if (skate) {
      setData(prev => ({
        ...prev,
        skates: prev.skates.filter(s => s.id !== id)
      }))
      logAction('deleted', 'skate', skate.title, { duration: skate.duration, performance: skate.performance })
    }
  }

  const addScheduledEvent = (title, date, time) => {
    const id = Date.now()
    setData(prev => ({
      ...prev,
      scheduled: [...prev.scheduled, { id, title, date, time, localDate: new Date(date).toLocaleDateString() }]
    }))
    logAction('added', 'scheduled', title, { date, time })
  }

  const deleteScheduledEvent = (id) => {
    const event = data.scheduled.find(e => e.id === id)
    if (event) {
      setData(prev => ({
        ...prev,
        scheduled: prev.scheduled.filter(event => event.id !== id)
      }))
      logAction('deleted', 'scheduled', event.title, { date: event.date, time: event.time })
    }
  }

  const addGoal = (title, type, target, currentValue, important = false, pinned = false) => {
    const id = Date.now()
    const now = new Date()
    setData(prev => ({
      ...prev,
      goals: [...prev.goals, { id, title, type, target, currentValue, important, pinned, createdAt: now.toISOString(), date: now.toISOString(), localDate: now.toLocaleDateString() }]
    }))
    logAction('added', 'goal', title, { type, target, currentValue, important, pinned })
  }

  const updateGoalProgress = (id, currentValue) => {
    const goal = data.goals.find(g => g.id === id)
    if (goal) {
      const oldValue = goal.currentValue
      const change = currentValue - oldValue
      setData(prev => ({
        ...prev,
        goals: prev.goals.map(goal => goal.id === id ? { ...goal, currentValue } : goal)
      }))
      logAction('updated', 'goal', goal.title, { 
        currentValue, 
        target: goal.target,
        previousValue: oldValue,
        change: change > 0 ? `+${change}` : change,
        changeType: change > 0 ? 'increased' : change < 0 ? 'decreased' : 'unchanged'
      })
    }
  }

  const toggleGoalImportance = (id) => {
    const goal = data.goals.find(g => g.id === id)
    if (goal) {
      setData(prev => ({
        ...prev,
        goals: prev.goals.map(goal => goal.id === id ? { ...goal, important: !goal.important } : goal)
      }))
      logAction('toggled', 'goal', goal.title, { important: !goal.important })
    }
  }

  const toggleGoalPin = (id) => {
    const goal = data.goals.find(g => g.id === id)
    if (goal) {
      setData(prev => ({
        ...prev,
        goals: prev.goals.map(goal => goal.id === id ? { ...goal, pinned: !goal.pinned } : goal)
      }))
      logAction('toggled', 'goal', goal.title, { pinned: !goal.pinned })
    }
  }

  const moveGoalToHistory = (id, status) => {
    setData(prev => {
      const goal = prev.goals.find(g => g.id === id)
      if (!goal) return prev
      logAction('completed', 'goal', goal.title, { status })
      return {
        ...prev,
        goals: prev.goals.filter(g => g.id !== id),
        goalHistory: [...prev.goalHistory, { ...goal, status, completedAt: new Date().toISOString() }]
      }
    })
  }

  const deleteGoalFromHistory = (id) => {
    if (confirm('Are you sure you want to delete this goal from history?')) {
      const goal = data.goalHistory.find(g => g.id === id)
      if (goal) {
        setData(prev => ({
          ...prev,
          goalHistory: prev.goalHistory.filter(goal => goal.id !== id)
        }))
        logAction('deleted', 'goal_history', goal.title, { status: goal.status })
      }
    }
  }

  const editGoalFromHistory = (id, updatedGoal) => {
    const goal = data.goalHistory.find(g => g.id === id)
    if (goal) {
      setData(prev => ({
        ...prev,
        goalHistory: prev.goalHistory.map(goal => goal.id === id ? { ...goal, ...updatedGoal } : goal)
      }))
      logAction('updated', 'goal_history', goal.title, updatedGoal)
    }
  }

  const deleteGoal = (id) => {
    if (confirm('Are you sure you want to delete this goal? It will be moved to history and can be restored within 2 days.')) {
      const goal = data.goals.find(g => g.id === id)
      if (goal) {
        setData(prev => ({
          ...prev,
          goals: prev.goals.filter(g => g.id !== id),
          deletedItems: [...prev.deletedItems, { ...goal, type: 'goal', deletedAt: new Date().toISOString() }]
        }))
        logAction('deleted', 'goal', goal.title, { type: goal.type, currentValue: goal.currentValue })
      }
    }
  }

  // Goal Setter functions with fresh variable names
  const addTarget = (description, category, targetValue, currentProgress = 0, pinned = false) => {
    const id = Date.now()
    const now = new Date()
    setData(prev => ({
      ...prev,
      targets: [...prev.targets, { id, description, category, targetValue, currentProgress, pinned, createdAt: now.toISOString(), date: now.toISOString(), localDate: now.toLocaleDateString() }]
    }))
    logAction('added', 'target', description, { category, targetValue, currentProgress, pinned })
  }

  const updateTargetProgress = (id, currentProgress) => {
    const target = data.targets.find(t => t.id === id)
    if (target) {
      const oldValue = target.currentProgress
      const change = currentProgress - oldValue
      setData(prev => ({
        ...prev,
        targets: prev.targets.map(target => target.id === id ? { ...target, currentProgress } : target)
      }))
      logAction('updated', 'target', target.description, {
        currentProgress,
        targetValue: target.targetValue,
        previousValue: oldValue,
        change: change > 0 ? `+${change}` : change,
        changeType: change > 0 ? 'increased' : change < 0 ? 'decreased' : 'unchanged'
      })
    }
  }

  const toggleTargetPin = (id) => {
    const target = data.targets.find(t => t.id === id)
    if (target) {
      setData(prev => ({
        ...prev,
        targets: prev.targets.map(target => target.id === id ? { ...target, pinned: !target.pinned } : target)
      }))
      logAction('toggled', 'target', target.description, { pinned: !target.pinned })
    }
  }

  const moveTargetToHistory = (id, completionStatus) => {
    setData(prev => {
      const target = prev.targets.find(t => t.id === id)
      if (!target) return prev
      logAction('completed', 'target', target.description, { completionStatus })
      return {
        ...prev,
        targets: prev.targets.filter(t => t.id !== id),
        targetHistory: [...prev.targetHistory, { ...target, completionStatus, completedAt: new Date().toISOString() }]
      }
    })
  }

  const deleteTargetFromHistory = (id) => {
    if (confirm('Are you sure you want to delete this target from history?')) {
      const target = data.targetHistory.find(t => t.id === id)
      if (target) {
        setData(prev => ({
          ...prev,
          targetHistory: prev.targetHistory.filter(target => target.id !== id)
        }))
        logAction('deleted', 'target_history', target.description, { completionStatus: target.completionStatus })
      }
    }
  }

  const editTargetFromHistory = (id, updatedTarget) => {
    const target = data.targetHistory.find(t => t.id === id)
    if (target) {
      setData(prev => ({
        ...prev,
        targetHistory: prev.targetHistory.map(target => target.id === id ? { ...target, ...updatedTarget } : target)
      }))
      logAction('updated', 'target_history', target.description, updatedTarget)
    }
  }

  const deleteTarget = (id) => {
    if (confirm('Are you sure you want to delete this target? It will be moved to history and can be restored within 2 days.')) {
      const target = data.targets.find(t => t.id === id)
      if (target) {
        setData(prev => ({
          ...prev,
          targets: prev.targets.filter(t => t.id !== id),
          deletedItems: [...prev.deletedItems, { ...target, type: 'target', deletedAt: new Date().toISOString() }]
        }))
        logAction('deleted', 'target', target.description, { category: target.category, currentProgress: target.currentProgress })
      }
    }
  }

  const editTarget = (id, description, category, targetValue) => {
    const target = data.targets.find(t => t.id === id)
    if (target) {
      const changes = []
      if (target.description !== description) changes.push(`description: "${target.description}" → "${description}"`)
      if (target.category !== category) changes.push(`category: "${target.category}" → "${category}"`)
      if (target.targetValue !== targetValue) changes.push(`targetValue: ${target.targetValue} → ${targetValue}`)
      
      setData(prev => ({
        ...prev,
        targets: prev.targets.map(target => target.id === id ? { ...target, description, category, targetValue } : target)
      }))
      logAction('updated', 'target', description, { changes, category, targetValue })
    }
  }

  const deleteNumberEntry = (id) => {
    const number = data.numbers.find(n => n.id === id)
    if (number) {
      setData(prev => ({
        ...prev,
        numbers: prev.numbers.filter(n => n.id !== id)
      }))
      logAction('deleted', 'number', number.name, { value: number.value })
    }
  }

  const updateNumberEntry = (id, name, value) => {
    const number = data.numbers.find(n => n.id === id)
    if (number) {
      const oldValue = number.value
      const change = value - oldValue
      setData(prev => ({
        ...prev,
        numbers: prev.numbers.map(n => n.id === id ? { ...n, name, value } : n)
      }))
      logAction('updated', 'number', name, { 
        value, 
        previousValue: oldValue,
        change: change > 0 ? `+${change}` : change,
        changeType: change > 0 ? 'increased' : change < 0 ? 'decreased' : 'unchanged'
      })
    }
  }

  const toggleNumberPin = (id) => {
    const number = data.numbers.find(n => n.id === id)
    if (number) {
      setData(prev => ({
        ...prev,
        numbers: prev.numbers.map(num => num.id === id ? { ...num, pinned: !num.pinned } : num)
      }))
      logAction('toggled', 'number', number.name, { pinned: !number.pinned })
    }
  }

  const toggleNumberGroupPin = (name) => {
    setData(prev => {
      const groupEntries = prev.numbers.filter(num => num.name === name)
      if (groupEntries.length === 0) return prev
      
      const currentPinState = groupEntries[0].pinned
      const newState = !currentPinState
      return {
        ...prev,
        numbers: prev.numbers.map(num => num.name === name ? { ...num, pinned: newState } : num)
      }
    })
    logAction('toggled', 'number', name, { pinned: !data.numbers.find(n => n.name === name)?.pinned })
  }

  const deleteMetricEntry = (id) => {
    if (confirm('Are you sure you want to delete this metric? It will be moved to history and can be restored within 2 days.')) {
      const metric = data.metrics.find(m => m.id === id)
      if (metric) {
        setData(prev => ({
          ...prev,
          metrics: prev.metrics.filter(m => m.id !== id),
          deletedItems: [...prev.deletedItems, { ...metric, type: 'metric', deletedAt: new Date().toISOString() }]
        }))
        logAction('deleted', 'metric', metric.name, { currentValue: metric.currentValue, target: metric.target })
      }
    }
  }

  const updateMetricEntry = (id, name, currentValue, target) => {
    const metric = data.metrics.find(m => m.id === id)
    if (metric) {
      const oldValue = metric.currentValue
      const change = currentValue - oldValue
      setData(prev => ({
        ...prev,
        metrics: prev.metrics.map(m => m.id === id ? { ...m, name, currentValue, target } : m)
      }))
      const actionDetails = { 
        currentValue, 
        target: target || null,
        previousValue: oldValue,
        change: change > 0 ? `+${change}` : change,
        changeType: change > 0 ? 'increased' : change < 0 ? 'decreased' : 'unchanged'
      }
      logAction('updated', 'metric', name, actionDetails)
    }
  }

  const toggleMetricPin = (id) => {
    const metric = data.metrics.find(m => m.id === id)
    if (metric) {
      setData(prev => ({
        ...prev,
        metrics: prev.metrics.map(metric => metric.id === id ? { ...metric, pinned: !metric.pinned } : metric)
      }))
      logAction('toggled', 'metric', metric.name, { pinned: !metric.pinned })
    }
  }

  const restoreDeletedItem = (id) => {
    const deletedItem = data.deletedItems.find(item => item.id === id)
    if (!deletedItem) return

    const { deletedAt, type, ...itemData } = deletedItem

    setData(prev => {
      let newData = { ...prev }
      
      // Remove from deleted items
      newData.deletedItems = prev.deletedItems.filter(item => item.id !== id)
      
      // Restore to appropriate array
      if (type === 'goal') {
        newData.goals = [...prev.goals, itemData]
      } else if (type === 'metric') {
        newData.metrics = [...prev.metrics, itemData]
      }
      
      return newData
    })
    logAction('restored', type, type === 'goal' ? deletedItem.title : deletedItem.name, { deletedAt })
  }

  const cleanupDeletedItems = () => {
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

    setData(prev => ({
      ...prev,
      deletedItems: prev.deletedItems.filter(item => {
        const deletedDate = new Date(item.deletedAt)
        return deletedDate > twoDaysAgo
      })
    }))
  }

  const deleteWorkout = (id) => {
    setData(prev => ({
      ...prev,
      workouts: prev.workouts.filter(w => w.id !== id)
    }))
  }

  const deleteJournalEntry = (id) => {
    setData(prev => ({
      ...prev,
      journal: prev.journal.filter(j => j.id !== id)
    }))
  }

  const updateJournalEntry = (id, title, content) => {
    const journal = data.journal.find(j => j.id === id)
    if (journal) {
      const changes = []
      if (journal.title !== title) changes.push(`title: "${journal.title}" → "${title}"`)
      if (journal.content !== content) changes.push(`content updated`)
      
      setData(prev => ({
        ...prev,
        journal: prev.journal.map(j => j.id === id ? { ...j, title, content } : j)
      }))
      logAction('updated', 'journal', title, { 
        content,
        changes: changes.join(', '),
        changeType: changes.length > 0 ? 'modified' : 'unchanged'
      })
    }
  }

  const addQuote = (quote) => {
    const id = Date.now()
    setData(prev => ({
      ...prev,
      quotes: [...prev.quotes, { id, text: quote }]
    }))
    logAction('added', 'quote', quote.substring(0, 30) + '...', { text: quote })
  }

  const deleteQuote = (id) => {
    const quote = data.quotes.find(q => q.id === id)
    if (quote) {
      setData(prev => ({
        ...prev,
        quotes: prev.quotes.filter(q => q.id !== id)
      }))
      logAction('deleted', 'quote', quote.text.substring(0, 30) + '...', { text: quote.text })
    }
  }

  const resetQuotes = () => {
    if (confirm('Are you sure you want to reset quotes to default? All custom quotes will be removed.')) {
      setData(prev => ({
        ...prev,
        quotes: defaultQuotes.map((text, index) => ({ id: index, text }))
      }))
      logAction('reset', 'quotes', 'All quotes', { count: defaultQuotes.length })
    }
  }

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'tracker-backup.json'
    link.click()
  }

  const importData = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result)
          setData(importedData)
        } catch (error) {
          alert('Error importing data: Invalid JSON file')
        }
      }
      reader.readAsText(file)
    }
  }

  const calculateStreaks = () => {
    const streaks = {}
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    data.numbers.forEach(num => {
      if (!streaks[num.name]) {
        streaks[num.name] = { current: 0, longest: 0 }
      }
    })
    
    const uniqueDates = [...new Set(data.numbers.map(n => n.localDate))].sort((a, b) => new Date(b) - new Date(a))
    
    Object.keys(streaks).forEach(name => {
      const nameEntries = data.numbers.filter(n => n.name === name).map(n => n.localDate)
      const uniqueNameDates = [...new Set(nameEntries)].sort((a, b) => new Date(b) - new Date(a))
      
      let currentStreak = 0
      let longestStreak = 0
      let tempStreak = 0
      
      for (let i = 0; i < uniqueNameDates.length; i++) {
        const currentDate = new Date(uniqueNameDates[i])
        const prevDate = i > 0 ? new Date(uniqueNameDates[i - 1]) : today
        const diffDays = Math.floor((prevDate - currentDate) / (1000 * 60 * 60 * 24))
        
        if (diffDays <= 1) {
          tempStreak++
          if (tempStreak > longestStreak) longestStreak = tempStreak
        } else {
          tempStreak = 1
        }
        
        if (i === 0 && diffDays <= 1) {
          currentStreak = tempStreak
        }
      }
      
      streaks[name] = { current: currentStreak, longest: longestStreak }
    })
    
    setData(prev => ({ ...prev, streaks }))
  }

  useEffect(() => {
    calculateStreaks()
  }, [data.numbers])

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {isLoading && <LoadingScreen darkMode={darkMode} quotes={data.quotes} />}
      
      <div className={`flex flex-col md:flex-row h-screen ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-500`}>
        {/* Mobile menu button */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-3 rounded-lg ${darkMode ? 'bg-slate-800/50 text-white' : 'bg-white/50 text-slate-900'} shadow-lg backdrop-blur-sm`}
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
        
        <aside className={`${sidebarCollapsed ? 'hidden md:flex' : 'flex'} w-full md:w-56 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} border-r flex flex-col transition-all duration-300 md:h-full h-auto`}>
          <div className={`p-4 ${darkMode ? 'border-slate-700' : 'border-slate-200'} border-b flex items-center justify-between`}>
            <div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Tracker Pro</h1>
              <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Performance Tracking</p>
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`hidden md:block p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700 text-slate-400hover:text-white' : 'hover:bg-slate-200 text-slate-600'}`}
            >
              {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
            {sectionOrder.map((section) => {
              const config = sectionConfig[section]
              const Icon = config.icon
              return (
                <div
                  key={section}
                  draggable={section !== 'dashboard'} // Dashboard is not draggable
                  onDragStart={() => handleDragStart(section)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(section)}
                  onDragEnd={handleDragEnd}
                  className={`relative group ${draggedSection === section ? 'opacity-50' : ''} ${section === 'dashboard' ? 'cursor-default' : ''}`}
                >
                  <button
                    onClick={() => {
                      setActiveTab(section)
                      setSidebarCollapsed(true)
                    }}
                    className={`w-full px-3 py-2 md:py-3 rounded-lg text-left font-medium transition-all flex items-center ${
                      activeTab === section 
                        ? 'bg-blue-600 text-white' 
                        : darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-200'
                    } ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}
                    title={sidebarCollapsed ? config.label : ''}
                  >
                    <Icon size={16} />
                    {!sidebarCollapsed && <span className="text-sm md:text-base">{config.label}</span>}
                    {!sidebarCollapsed && section !== 'dashboard' && (
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity cursor-grab hidden md:block">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="5" r="1" />
                          <circle cx="9" cy="12" r="1" />
                          <circle cx="9" cy="19" r="1" />
                          <circle cx="15" cy="5" r="1" />
                          <circle cx="15" cy="12" r="1" />
                          <circle cx="15" cy="19" r="1" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              )
            })}
          </nav>
        </aside>
        <main className={`flex-1 overflow-auto ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
          <div className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-end gap-2 mb-4">
              <button
                onClick={exportData}
                className={`px-4 py-2 ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100'} rounded-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'} flex items-center gap-2 transition-colors`}
              >
                <Download size={16} />
                Export
              </button>
              <label className={`px-4 py-2 ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100'} rounded-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'} flex items-center gap-2 transition-colors cursor-pointer`}>
                <Upload size={16} />
                Import
                <input type="file" accept=".json" onChange={importData} className="hidden" />
              </label>
            </div>
            {activeTab === 'dashboard' && (
              <Dashboard data={data} onSelectNumber={setSelectedNumberForChart} onNavigateToAnalytics={() => setActiveTab('analytics')} onRestoreDeletedItem={restoreDeletedItem} darkMode={darkMode} />
            )}
            {activeTab === 'metrics' && (
              <MetricsView data={data.metrics} onAdd={addMetricEntry} onDelete={deleteMetricEntry} onUpdate={updateMetricEntry} onTogglePin={toggleMetricPin} onRestoreDeletedItem={restoreDeletedItem} deletedItems={data.deletedItems} darkMode={darkMode} />
            )}
            {activeTab === 'workouts' && (
              <WorkoutTracker data={data.workouts} onAdd={addWorkout} onDelete={deleteWorkout} onUpdate={updateWorkout} darkMode={darkMode} />
            )}
            {activeTab === 'journal' && (
              <JournalTracker data={data.journal} onAdd={addJournalEntry} onDelete={deleteJournalEntry} onUpdate={updateJournalEntry} darkMode={darkMode} />
            )}
            {activeTab === 'skates' && (
              <SkatesTracker data={data.skates} onAdd={addSkate} onDelete={deleteSkate} onUpdate={updateSkate} darkMode={darkMode} />
            )}
            {activeTab === 'calendar' && (
              <CalendarView data={data} onAddScheduled={addScheduledEvent} onDeleteScheduled={deleteScheduledEvent} darkMode={darkMode} />
            )}
            {activeTab === 'goalsetter' && (
              <GoalSetterView targets={data.targets} targetHistory={data.targetHistory} onAdd={addTarget} onUpdate={updateTargetProgress} onDelete={deleteTarget} onDeleteFromHistory={deleteTargetFromHistory} onMoveToHistory={moveTargetToHistory} onEdit={editTarget} onEditFromHistory={editTargetFromHistory} onTogglePin={toggleTargetPin} darkMode={darkMode} />
            )}
            {activeTab === 'onerm' && (
              <OneRepMaxCalculator workouts={data.workouts} darkMode={darkMode} />
            )}
            {activeTab === 'analytics' && (
              <AnalyticsView data={data} selectedNumber={selectedNumberForChart} onSelectNumber={setSelectedNumberForChart} darkMode={darkMode} />
            )}
            {activeTab === 'chatbot' && (
              <Chatbot data={data} darkMode={darkMode} />
            )}
            {activeTab === 'quotes' && (
              <QuotesView data={data} onAdd={addQuote} onDelete={deleteQuote} onReset={resetQuotes} darkMode={darkMode} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function Dashboard({ data, onSelectNumber, onNavigateToAnalytics, darkMode }) {
  // Get daily motivational quote based on day of year
  const getDailyQuote = () => {
    const quotesArray = data.quotes && data.quotes.length > 0 ? data.quotes.map(q => q.text) : defaultQuotes
    const now = new Date()
    const startOfYear = new Date(now.getFullYear(), 0, 0)
    const diff = now - startOfYear
    const oneDay = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diff / oneDay)
    const quoteIndex = dayOfYear % quotesArray.length
    return quotesArray[quoteIndex]
  }

  const dailyQuote = getDailyQuote()

  // Get pinned goals (hidden from UI but kept for data integrity)
  const pinnedGoals = (data.goals || []).filter(goal => goal.pinned && goal.status !== 'completed')

  // Get pinned targets
  const pinnedTargets = (data.targets || []).filter(target => target.pinned && !target.completionStatus)

  // Get pinned numbers (grouped by name)
  const pinnedNumbers = (data.numbers || []).filter(num => num.pinned)
  const pinnedNumberGroups = pinnedNumbers.reduce((acc, num) => {
    if (!acc[num.name]) {
      acc[num.name] = { name: num.name, total: 0, count: 0, entries: [] }
    }
    acc[num.name].total += num.value
    acc[num.name].count += 1
    acc[num.name].entries.push(num)
    return acc
  }, {})

  // Get pinned metrics
  const pinnedMetrics = (data.metrics || []).filter(metric => metric.pinned)

  // Get important goals (hidden from UI but kept for data integrity)
  const importantGoals = (data.goals || []).filter(goal => goal.important && goal.status !== 'completed')

  // Get upcoming scheduled events (next 7 days)
  const upcomingEvents = (data.scheduled || [])
    .filter(event => {
      try {
        if (!event.date) return false
        const eventDate = new Date(event.date)
        const now = new Date()
        const weekFromNow = new Date()
        weekFromNow.setDate(now.getDate() + 7)
        return eventDate >= now && eventDate <= weekFromNow
      } catch {
        return false
      }
    })
    .sort((a, b) => {
      try {
        return new Date(a.date) - new Date(b.date)
      } catch {
        return 0
      }
    })
    .slice(0, 5)

  // Calculate weekly summary
  const getWeeklySummary = () => {
    try {
      const now = new Date()
      const weekAgo = new Date()
      weekAgo.setDate(now.getDate() - 7)

      const weeklyWorkouts = (data.workouts || []).filter(w => w.date && new Date(w.date) >= weekAgo)
      const weeklySkates = (data.skates || []).filter(s => s.date && new Date(s.date) >= weekAgo)
      const weeklyJournal = (data.journal || []).filter(j => j.date && new Date(j.date) >= weekAgo)

      return {
        workouts: weeklyWorkouts.length,
        skates: weeklySkates.length,
        journal: weeklyJournal.length
      }
    } catch (error) {
      console.error('Error getting weekly summary:', error)
      return { workouts: 0, skates: 0, journal: 0 }
    }
  }

  const weeklySummary = getWeeklySummary()

  // Get recent history (all activities from past 30 days)
  const getRecentHistory = () => {
    try {
      const monthAgo = new Date()
      monthAgo.setDate(monthAgo.getDate() - 30)

      const allActivities = [
        ...(data.workouts || []).map(w => ({ ...w, type: 'workout', name: w.name })),
        ...(data.skates || []).map(s => ({ ...s, type: 'skate', name: s.title })),
        ...(data.journal || []).map(j => ({ ...j, type: 'journal', name: j.title })),
        ...(data.numbers || []).map(n => ({ ...n, type: 'number', name: n.name }))
      ]

      return allActivities
        .filter(activity => activity.date && new Date(activity.date) >= monthAgo)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10)
    } catch (error) {
      console.error('Error getting recent history:', error)
      return []
    }
  }

  const recentHistory = getRecentHistory()

  // Get action history
  const getActionHistory = () => {
    return data.actionHistory || []
  }

  const actionHistory = getActionHistory()

  return (
    <div className="space-y-6">
      {/* Daily Motivational Quote */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900 border-slate-700' : 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-200'} rounded-lg shadow-sm border p-6`}>
        <p className={`text-lg italic ${darkMode ? 'text-white' : 'text-white'} text-center`}>"{dailyQuote}"</p>
      </div>


      {/* Pinned Numbers */}
      {Object.keys(pinnedNumberGroups).length > 0 && (
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center gap-2`}>
            <Flame size={20} className="text-orange-500" />
            Pinned Numbers
          </h2>
          <div className="space-y-3">
            {Object.values(pinnedNumberGroups).map((group) => (
              <div
                key={group.name}
                onClick={() => {
                  onSelectNumber(group.name)
                  onNavigateToAnalytics()
                }}
                className={`flex justify-between items-center p-3 ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-50 hover:bg-slate-100'} rounded-lg cursor-pointer transition-colors`}
              >
                <div>
                  <span className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>{group.name}</span>
                  <span className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} text-sm ml-2`}>({group.count} entries)</span>
                </div>
                <div className="flex items-center gap-4">
                  {data.streaks?.[group.name] && (
                    <div className="flex items-center gap-1 text-orange-500">
                      <Flame size={16} />
                      <span className="text-sm font-medium">{data.streaks[group.name].current}</span>
                    </div>
                  )}
                  <span className={`${darkMode ? 'text-white' : 'text-slate-700'} font-bold text-xl`}>{group.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pinned Targets */}
      {pinnedTargets.length > 0 && (
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center gap-2`}>
            <Target size={20} className="text-orange-500" />
            Pinned Goals
          </h2>
          <div className="space-y-3">
            {pinnedTargets.map((target) => (
              <div key={target.id} className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <span className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>{target.description}</span>
                    <span className={`text-xs ml-2 px-2 py-1 rounded ${darkMode ? 'bg-slate-600 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>
                      {target.category}
                    </span>
                  </div>
                </div>
                {target.targetValue && (
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Progress</span>
                      <span className={`${darkMode ? 'text-white' : 'text-slate-900'}`}>{target.currentProgress} / {target.targetValue}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((target.currentProgress / target.targetValue) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Important Goals */}
      {importantGoals.length > 0 && (
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center gap-2`}>
            <Target size={20} className="text-orange-500" />
            Important Goals
          </h2>
          <div className="space-y-3">
            {importantGoals.map((goal) => (
              <div key={goal.id} className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>{goal.title}</span>
                  <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {goal.currentValue} / {goal.target} {goal.type === 'progress' ? '' : goal.type}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all" 
                    style={{ width: `${Math.min((goal.currentValue / goal.target) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scheduled Events */}
      {upcomingEvents.length > 0 && (
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center gap-2`}>
            <Calendar size={20} className="text-blue-500" />
            Upcoming Events
          </h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${event.type === 'workout' ? 'bg-green-500' : event.type === 'skate' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                  <span className={darkMode ? 'text-white' : 'text-slate-900'}>{event.title}</span>
                </div>
                <span className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} text-sm`}>
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Summary */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center gap-2`}>
          <TrendingUp size={20} className="text-green-500" />
          Weekly Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg text-center`}>
            <Dumbbell size={24} className="mx-auto mb-2 text-green-500" />
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weeklySummary.workouts}</p>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Workouts</p>
          </div>
          <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg text-center`}>
            <Zap size={24} className="mx-auto mb-2 text-blue-500" />
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weeklySummary.skates}</p>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Skates</p>
          </div>
          <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg text-center`}>
            <BookOpen size={24} className="mx-auto mb-2 text-purple-500" />
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weeklySummary.journal}</p>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Journal</p>
          </div>
        </div>
      </div>

      {/* Pinned Goals */}
      {pinnedGoals.length > 0 && (
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center gap-2`}>
            <Target size={20} className="text-blue-500" />
            Pinned Goals
          </h2>
          <div className="space-y-3">
            {pinnedGoals.map((goal) => (
              <div key={goal.id} className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>{goal.title}</span>
                  <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {goal.currentValue} / {goal.target} {goal.type === 'progress' ? '' : goal.type}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all" 
                    style={{ width: `${Math.min((goal.currentValue / goal.target) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pinned Metrics */}
      {pinnedMetrics.length > 0 && (
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center gap-2`}>
            <Flame size={20} className="text-green-500" />
            Pinned Metrics
          </h2>
          <div className="space-y-3">
            {pinnedMetrics.map((metric) => {
              const progress = metric.target > 0 ? Math.min((metric.currentValue / metric.target) * 100, 100) : 0
              return (
                <div key={metric.id} className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>{metric.name}</span>
                    <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {metric.currentValue} / {metric.target}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-1 text-right">
                    <span className={`text-sm font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {progress.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Recent Actions */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center gap-2`}>
          <LineChart size={20} className="text-purple-500" />
          Recent Actions
        </h2>
        <div className="space-y-2">
          {actionHistory.length > 0 ? (
            actionHistory.slice(0, 5).map((action) => (
              <div key={action.id} className={`flex items-center justify-between p-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
                <div className="flex items-center gap-2 flex-1">
                  <div className={`px-2 py-0.5 text-xs font-medium rounded ${
                    action.action === 'added' ? 'bg-green-100 text-green-700' :
                    action.action === 'deleted' ? 'bg-red-100 text-red-700' :
                    action.action === 'updated' ? 'bg-blue-100 text-blue-700' :
                    action.action === 'restored' ? 'bg-purple-100 text-purple-700' :
                    action.action === 'completed' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {action.action}
                  </div>
                  <div className="flex-1">
                    <span className={`${darkMode ? 'text-white' : 'text-slate-900'} text-sm font-medium`}>
                      {action.itemName}
                    </span>
                    <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} ml-2`}>
                      ({action.itemType})
                    </span>
                    {action.details?.change && (
                      <span className={`text-xs font-semibold ml-2 ${
                        action.details.changeType === 'increased' ? 'text-green-500' :
                        action.details.changeType === 'decreased' ? 'text-red-500' :
                        'text-slate-500'
                      }`}>
                        {action.details.change}
                      </span>
                    )}
                    {action.details?.changes && (
                      <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} ml-2`}>
                        ({action.details.changes})
                      </span>
                    )}
                  </div>
                </div>
                <span className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} text-xs`}>
                  {action.localDate}
                </span>
              </div>
            ))
          ) : (
            <p className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} text-center py-4`}>No recent actions</p>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, subtitle, darkMode }) {
  return (
    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} text-sm font-medium`}>{title}</span>
        <div className="text-blue-600">{icon}</div>
      </div>
      <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{value}</div>
      {subtitle && <div className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} text-sm`}>{subtitle}</div>}
    </div>
  )
}

function NumbersView({ data, onAdd, onDelete, onUpdate, onTogglePin, onToggleGroupPin, darkMode }) {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editValue, setEditValue] = useState('')
  const [activeSection, setActiveSection] = useState('live') // live, history, analytics
  const [liveCounters, setLiveCounters] = useState({})
  const [customInputs, setCustomInputs] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && value) {
      onAdd(name, parseFloat(value))
      setName('')
      setValue('')
    }
  }

  const incrementNumber = (id, amount) => {
    const entry = data.find(n => n.id === id)
    if (entry) {
      onUpdate(id, entry.name, entry.value + amount)
    }
  }

  const handleEdit = (entry) => {
    setEditingId(entry.id)
    setEditName(entry.name)
    setEditValue(entry.value)
  }

  const handleSaveEdit = () => {
    if (editingId && editName && editValue) {
      onUpdate(editingId, editName, parseFloat(editValue))
      setEditingId(null)
      setEditName('')
      setEditValue('')
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditName('')
    setEditValue('')
  }

  const getLatestValue = (name) => {
    if (!data || data.length === 0) return 0
    const entries = data.filter(n => n.name === name).sort((a, b) => new Date(b.date) - new Date(a.date))
    return entries.length > 0 ? entries[0].value : 0
  }

  const getTotalValue = (name) => {
    if (!data || data.length === 0) return 0
    return data.filter(n => n.name === name).reduce((sum, n) => sum + n.value, 0)
  }

  const getUniqueNames = () => {
    if (!data || data.length === 0) return []
    return [...new Set(data.map(n => n.name))]
  }

  const updateLiveCounter = (name, amount) => {
    setLiveCounters(prev => ({
      ...prev,
      [name]: (prev[name] || 0) + amount
    }))
  }

  const [heldButton, setHeldButton] = useState(null)
  const intervalRef = useRef(null)

  const startHolding = (name, amount) => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    setHeldButton({ name, amount })
    
    // First increment immediately
    updateLiveCounter(name, amount)
    
    // Start interval
    intervalRef.current = setInterval(() => {
      updateLiveCounter(name, amount)
    }, 200)
  }

  const stopHolding = () => {
    setHeldButton(null)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const setCustomInput = (name, value) => {
    setCustomInputs(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const saveCustomInput = (name) => {
    const value = parseFloat(customInputs[name])
    if (value && !isNaN(value)) {
      const latestValue = getLatestValue(name)
      onAdd(name, latestValue + value)
      setCustomInputs(prev => ({ ...prev, [name]: '' }))
    }
  }

  const saveLiveCounter = (name) => {
    if (liveCounters[name] && liveCounters[name] !== 0) {
      onAdd(name, liveCounters[name])
      setLiveCounters(prev => ({ ...prev, [name]: 0 }))
    }
  }

  const getNumberHistory = (name) => {
    return data.filter(n => n.name === name).sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className={`flex gap-2 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-lg p-2`}>
        <button
          onClick={() => setActiveSection('live')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${activeSection === 'live' ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (darkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100')}`}
        >
          Live Tracking
        </button>
        <button
          onClick={() => setActiveSection('history')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${activeSection === 'history' ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (darkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100')}`}
        >
          History
        </button>
        <button
          onClick={() => setActiveSection('analytics')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${activeSection === 'analytics' ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (darkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100')}`}
        >
          Analytics
        </button>
      </div>

      {/* Live Tracking Section */}
      {activeSection === 'live' && (
        <div className="space-y-6">
          <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Quick Counters</h2>
            <div className="space-y-4">
              {getUniqueNames().map(name => {
                const groupEntries = data.filter(n => n.name === name)
                const isPinned = groupEntries.length > 0 && groupEntries[0].pinned
                
                return (
                  <div key={name} className={`${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'} border rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleGroupPin(name)}
                          className={`px-2 py-1 text-xs font-medium flex items-center gap-1 rounded ${isPinned ? 'bg-blue-100 text-blue-700' : darkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
                        >
                          <Target size={12} />
                          {isPinned ? 'Pinned to dashboard' : 'Pin to dashboard'}
                        </button>
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{name}</h3>
                      </div>
                      <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Total: {getTotalValue(name)}
                      </span>
                    </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} min-w-[60px]`}>
                      {getLatestValue(name) + (liveCounters[name] || 0)}
                    </span>
                    <button
                      onMouseDown={() => startHolding(name, -1)}
                      onMouseUp={stopHolding}
                      onMouseLeave={stopHolding}
                      onTouchStart={() => startHolding(name, -1)}
                      onTouchEnd={stopHolding}
                      className={`px-4 py-2 ${darkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-200 hover:bg-slate-300'} rounded-lg font-bold`}
                    >
                      −
                    </button>
                    <button
                      onMouseDown={() => startHolding(name, 1)}
                      onMouseUp={stopHolding}
                      onMouseLeave={stopHolding}
                      onTouchStart={() => startHolding(name, 1)}
                      onTouchEnd={stopHolding}
                      className={`px-4 py-2 ${darkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-200 hover:bg-slate-300'} rounded-lg font-bold`}
                    >
                      +
                    </button>
                    <input
                      type="number"
                      placeholder="Add custom"
                      value={customInputs[name] || ''}
                      onChange={(e) => setCustomInput(name, e.target.value)}
                      className={`flex-1 px-3 py-2 ${darkMode ? 'bg-slate-600 border-slate-500 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
                    />
                    <button
                      onClick={() => saveCustomInput(name)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  {(liveCounters[name] || 0) !== 0 && (
                    <button
                      onClick={() => saveLiveCounter(name)}
                      className="w-full mt-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                    >
                      Save +{(liveCounters[name] || 0)}
                    </button>
                  )}
                </div>
                )
              })}
              {getUniqueNames().length === 0 && (
                <div className="text-center py-8">
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No counters yet. Add your first entry below.</p>
                </div>
              )}
            </div>
          </div>

          <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Add New Counter</h2>
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                placeholder="Counter Name (e.g., Hockey Shots, Pucks)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`flex-1 px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
              />
              <input
                type="number"
                placeholder="Starting Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`w-32 px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                Add
              </button>
            </form>
          </div>
        </div>
      )}

      {/* History Section */}
      {activeSection === 'history' && (
        <div className="space-y-6">
          <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Action History</h2>
            <div className="space-y-3">
              {data.actionHistory && data.actionHistory.length > 0 ? (
                data.actionHistory.map((action) => (
                  <div key={action.id} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`px-2 py-1 text-xs font-medium rounded ${
                        action.action === 'added' ? 'bg-green-100 text-green-700' :
                        action.action === 'deleted' ? 'bg-red-100 text-red-700' :
                        action.action === 'updated' ? 'bg-blue-100 text-blue-700' :
                        action.action === 'restored' ? 'bg-purple-100 text-purple-700' :
                        action.action === 'completed' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {action.action}
                      </div>
                      <div className="flex-1">
                        <span className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>
                          {action.itemName}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} ml-2`}>
                          ({action.itemType})
                        </span>
                        {action.details?.change && (
                          <span className={`text-xs font-semibold ml-2 ${
                            action.details.changeType === 'increased' ? 'text-green-500' :
                            action.details.changeType === 'decreased' ? 'text-red-500' :
                            'text-slate-500'
                          }`}>
                            {action.details.change}
                          </span>
                        )}
                        {action.details?.previousValue !== undefined && (
                          <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} ml-2`}>
                            (was {action.details.previousValue})
                          </span>
                        )}
                        {action.details?.changes && (
                          <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} ml-2`}>
                            ({action.details.changes})
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} text-xs`}>
                      {action.localDate}
                    </span>
                  </div>
                ))
              ) : (
                <p className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No action history yet</p>
              )}
            </div>
          </div>

          <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Complete History</h2>
            
            {/* Filter by name */}
            <div className="mb-4">
              <select
                value=""
                onChange={(e) => {
                  // Could add filtering logic here
                }}
                className={`px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-lg focus:outline-none focus:border-blue-500`}
              >
                <option value="">All Counters</option>
                {getUniqueNames().map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Name</th>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Value</th>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Date</th>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Running Total</th>
                    <th className="w-40"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.sort((a, b) => new Date(b.date) - new Date(a.date)).map((entry, index) => {
                    const runningTotal = data
                      .filter(n => n.name === entry.name && new Date(n.date) <= new Date(entry.date))
                      .reduce((sum, n) => sum + n.value, 0)
                    
                    return (
                      <tr key={entry.id} className={`border-b ${darkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-100 hover:bg-slate-50'}`}>
                        {editingId === entry.id ? (
                          <>
                            <td className="py-3 px-4">
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className={`w-full px-2 py-1 ${darkMode ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded text-sm focus:outline-none focus:border-blue-500`}
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="number"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className={`w-20 px-2 py-1 ${darkMode ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded text-sm focus:outline-none focus:border-blue-500`}
                              />
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-1">
                                <button onClick={handleSaveEdit} className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">Save</button>
                                <button onClick={handleCancelEdit} className="px-2 py-1 bg-slate-600 text-white rounded text-xs hover:bg-slate-700">Cancel</button>
                              </div>
                            </td>
                            <td></td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{entry.name}</td>
                            <td className={`py-3 px-4 text-blue-600 font-semibold`}>{entry.value}</td>
                            <td className={`py-3 px-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{entry.localDate || new Date(entry.date).toLocaleDateString()}</td>
                            <td className={`py-3 px-4 ${darkMode ? 'text-green-400' : 'text-green-600'} font-semibold`}>{runningTotal}</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2 items-center">
                                <button 
                                  onClick={() => onTogglePin(entry.id)}
                                  className={`px-2 py-1 text-xs font-medium flex items-center gap-1 rounded ${entry.pinned ? 'bg-blue-100 text-blue-700' : darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                >
                                  <Target size={12} />
                                  {entry.pinned ? 'Pinned to dashboard' : 'Pin to dashboard'}
                                </button>
                                <button 
                                  onClick={() => incrementNumber(entry.id, -1)}
                                  className={`p-1 ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-100'} rounded ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
                                  title="Decrease by 1"
                                >
                                  −
                                </button>
                                <button 
                                  onClick={() => incrementNumber(entry.id, 1)}
                                  className={`p-1 ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-100'} rounded ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
                                  title="Increase by 1"
                                >
                                  +
                                </button>
                                <button onClick={() => handleEdit(entry)} className={`p-1 ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-100'} rounded ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                  <Edit2 size={14} />
                                </button>
                                <button onClick={() => onDelete(entry.id)} className="p-1 hover:bg-red-100 rounded text-red-500">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {data.length === 0 && (
                <p className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No entries yet</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Deleted Items Section */}
      {data.deletedItems && data.deletedItems.length > 0 && (
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6 mt-6`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center gap-2`}>
            <Trash2 size={20} className="text-red-500" />
            Deleted Items (Restore within 2 days)
          </h2>
          <div className="space-y-3">
            {data.deletedItems.map((item) => {
              const deletedDate = new Date(item.deletedAt)
              const daysUntilExpiry = Math.ceil((deletedDate.getTime() + (2 * 24 * 60 * 60 * 1000) - Date.now()) / (24 * 60 * 60 * 1000))
              return (
                <div key={item.id} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg border-l-4 border-red-500`}>
                  <div className="flex items-center gap-3">
                    {item.type === 'goal' && <Target size={16} className="text-blue-500" />}
                    {item.type === 'metric' && <Flame size={16} className="text-green-500" />}
                    {item.type === 'number' && <Flame size={16} className="text-orange-500" />}
                    <div>
                      <span className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>
                        {item.type === 'goal' ? item.title : item.name}
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} ml-2`}>
                        ({item.type})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} text-xs`}>
                      Expires in {daysUntilExpiry} day{daysUntilExpiry !== 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={() => onRestoreDeletedItem(item.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      Restore
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Analytics Section */}
      {activeSection === 'analytics' && (
        <div className="space-y-6">
          <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Summary Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {getUniqueNames().map(name => {
                const history = getNumberHistory(name)
                const total = getTotalValue(name)
                const average = history.length > 0 ? (total / history.length).toFixed(1) : 0
                const max = history.length > 0 ? Math.max(...history.map(h => h.value)) : 0
                const min = history.length > 0 ? Math.min(...history.map(h => h.value)) : 0
                
                return (
                  <div key={name} className={`${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg p-4`}>
                    <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>{name}</h3>
                    <div className="space-y-1">
                      <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        <span className="font-semibold">Total:</span> {total}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        <span className="font-semibold">Average:</span> {average}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        <span className="font-semibold">Max:</span> {max}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        <span className="font-semibold">Min:</span> {min}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        <span className="font-semibold">Entries:</span> {history.length}
                      </div>
                    </div>
                  </div>
                )
              })}
              {getUniqueNames().length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No data to analyze yet</p>
                </div>
              )}
            </div>
          </div>

          <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Recent Activity</h2>
            <div className="space-y-2">
              {data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10).map(entry => (
                <div key={entry.id} className={`flex justify-between items-center py-2 px-3 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded`}>
                  <span className={`text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{entry.name}</span>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>+{entry.value}</span>
                    <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{entry.localDate || new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              {data.length === 0 && (
                <p className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No recent activity</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MetricsView({ data, onAdd, onDelete, onUpdate, onTogglePin, onRestoreDeletedItem, deletedItems, darkMode }) {
  const [name, setName] = useState('')
  const [currentValue, setCurrentValue] = useState('')
  const [target, setTarget] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editCurrentValue, setEditCurrentValue] = useState('')
  const [editTarget, setEditTarget] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && currentValue) {
      onAdd(name, parseFloat(currentValue), target ? parseFloat(target) : null)
      setName('')
      setCurrentValue('')
      setTarget('')
    }
  }

  const handleEdit = (metric) => {
    setEditingId(metric.id)
    setEditName(metric.name)
    setEditCurrentValue(metric.currentValue)
    setEditTarget(metric.target)
  }

  const handleSaveEdit = () => {
    if (editingId && editName && editCurrentValue) {
      onUpdate(editingId, editName, parseFloat(editCurrentValue), editTarget ? parseFloat(editTarget) : null)
      setEditingId(null)
      setEditName('')
      setEditCurrentValue('')
      setEditTarget('')
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditName('')
    setEditCurrentValue('')
    setEditTarget('')
  }

  const incrementMetric = (id, amount) => {
    const metric = data.find(m => m.id === id)
    if (metric) {
      const newValue = Math.max(0, metric.currentValue + amount)
      onUpdate(id, metric.name, newValue, metric.target)
    }
  }

  const getProgress = (current, target) => {
    if (!target || target <= 0) return 0
    return Math.min((current / target) * 100, 100)
  }

  return (
    <div className="space-y-6">
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Add New Metric</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Metric Name (e.g., Daily Steps, Water Intake)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
            />
            <input
              type="number"
              placeholder="Current Value"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className={`px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
            />
            <input
              type="number"
              placeholder="Target Goal (optional)"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className={`px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Metric
          </button>
        </form>
      </div>

      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Your Metrics</h2>
        <div className="space-y-4">
          {data.map(metric => (
            <div key={metric.id} className={`${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg p-4`}>
              {editingId === metric.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className={`px-3 py-2 ${darkMode ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded text-sm focus:outline-none focus:border-blue-500`}
                      placeholder="Metric Name"
                    />
                    <input
                      type="number"
                      value={editCurrentValue}
                      onChange={(e) => setEditCurrentValue(e.target.value)}
                      className={`px-3 py-2 ${darkMode ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded text-sm focus:outline-none focus:border-blue-500`}
                      placeholder="Current Value"
                    />
                    <input
                      type="number"
                      value={editTarget}
                      onChange={(e) => setEditTarget(e.target.value)}
                      className={`px-3 py-2 ${darkMode ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded text-sm focus:outline-none focus:border-blue-500`}
                      placeholder="Target Goal (optional)"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleSaveEdit} className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700">Save</button>
                    <button onClick={handleCancelEdit} className="px-4 py-2 bg-slate-600 text-white rounded text-sm hover:bg-slate-700">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onTogglePin(metric.id)}
                        className={`px-2 py-1 text-xs font-medium flex items-center gap-1 rounded ${metric.pinned ? 'bg-blue-100 text-blue-700' : darkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
                      >
                        <Target size={12} />
                        {metric.pinned ? 'Pinned to dashboard' : 'Pin to dashboard'}
                      </button>
                      <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{metric.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(metric)} className={`p-1 ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-100'} rounded ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => onDelete(metric.id)} className="p-1 hover:bg-red-100 rounded text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    {metric.target ? (
                      <>
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {metric.currentValue} / {metric.target}
                          </span>
                          <span className={`text-sm font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                            {getProgress(metric.currentValue, metric.target).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all" 
                            style={{ width: `${getProgress(metric.currentValue, metric.target)}%` }}
                          />
                        </div>
                      </>
                    ) : (
                      <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Current: {metric.currentValue}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => incrementMetric(metric.id, -1)}
                      className={`px-6 py-3 ${darkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-200 hover:bg-slate-300'} rounded-lg font-bold text-xl`}
                    >
                      −
                    </button>
                    <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} min-w-[80px] text-center`}>
                      {metric.currentValue}
                    </span>
                    <button
                      onClick={() => incrementMetric(metric.id, 1)}
                      className={`px-6 py-3 ${darkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-200 hover:bg-slate-300'} rounded-lg font-bold text-xl`}
                    >
                      +
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          {data.length === 0 && (
            <div className="text-center py-8">
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No metrics yet. Add your first metric above.</p>
            </div>
          )}
        </div>
      </div>

      {/* Deleted Items Section */}
      {deletedItems && deletedItems.length > 0 && (
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center gap-2`}>
            <Trash2 size={20} className="text-red-500" />
            Deleted Items (Restore within 2 days)
          </h2>
          <div className="space-y-3">
            {deletedItems.map((item) => {
              const deletedDate = new Date(item.deletedAt)
              const daysUntilExpiry = Math.ceil((deletedDate.getTime() + (2 * 24 * 60 * 60 * 1000) - Date.now()) / (24 * 60 * 60 * 1000))
              return (
                <div key={item.id} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg border-l-4 border-red-500`}>
                  <div className="flex items-center gap-3">
                    {item.type === 'goal' && <Target size={16} className="text-blue-500" />}
                    {item.type === 'metric' && <Flame size={16} className="text-green-500" />}
                    {item.type === 'number' && <Flame size={16} className="text-orange-500" />}
                    <div>
                      <span className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>
                        {item.type === 'goal' ? item.title : item.name}
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} ml-2`}>
                        ({item.type})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} text-xs`}>
                      Expires in {daysUntilExpiry} day{daysUntilExpiry !== 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={() => onRestoreDeletedItem(item.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      Restore
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function WorkoutTracker({ data, onAdd, onDelete, onUpdate, darkMode }) {
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')
  const [difficulty, setDifficulty] = useState(0)
  const [expandedWorkoutId, setExpandedWorkoutId] = useState(null)
  const [editingWorkout, setEditingWorkout] = useState(null)
  const [exercises, setExercises] = useState([
    { name: '', sets: '', load: '', reps: '', setNumber: 1, totalSets: 1, isSetRow: false },
    { name: '', sets: '', load: '', reps: '', setNumber: 1, totalSets: 1, isSetRow: false },
    { name: '', sets: '', load: '', reps: '', setNumber: 1, totalSets: 1, isSetRow: false },
    { name: '', sets: '', load: '', reps: '', setNumber: 1, totalSets: 1, isSetRow: false },
    { name: '', sets: '', load: '', reps: '', setNumber: 1, totalSets: 1, isSetRow: false }
  ])

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: '', load: '', reps: '', setNumber: 1, totalSets: 1, isSetRow: false }])
  }

  const updateExercise = (index, field, value) => {
    const updated = [...exercises]
    updated[index][field] = value
    
    // When sets is entered and this is not a set row, generate set rows
    if (field === 'sets' && value && !updated[index].isSetRow && updated[index].name) {
      const numSets = parseInt(value)
      if (numSets > 0) {
        const currentExercise = { ...updated[index] }
        
        // Generate set rows
        const setRows = []
        for (let i = 1; i <= numSets; i++) {
          setRows.push({
            name: currentExercise.name,
            sets: currentExercise.sets,
            load: '',
            reps: '',
            setNumber: i,
            totalSets: numSets,
            isSetRow: true
          })
        }
        
        // Replace the current row with the set rows
        updated.splice(index, 1, ...setRows)
      }
    }
    
    setExercises(updated)
  }

  const addSetRow = (exerciseIndex) => {
    const exercise = exercises[exerciseIndex]
    if (exercise.isSetRow) {
      // Find all set rows for this exercise
      const exerciseName = exercise.name
      const setRows = exercises.filter((ex, idx) => ex.name === exerciseName && ex.isSetRow)
      const totalSets = setRows.length + 1
      
      const newSetRow = {
        name: exerciseName,
        sets: totalSets.toString(),
        load: '',
        reps: '',
        setNumber: totalSets,
        totalSets: totalSets,
        isSetRow: true
      }
      
      // Update all set rows to reflect new total
      const updated = exercises.map((ex, idx) => {
        if (ex.name === exerciseName && ex.isSetRow) {
          return { ...ex, totalSets: totalSets }
        }
        return ex
      })
      
      // Add the new set row after the last set row
      const lastSetIndex = updated.map((ex, idx) => ex.name === exerciseName && ex.isSetRow ? idx : -1).filter(i => i !== -1).pop()
      updated.splice(lastSetIndex + 1, 0, newSetRow)
      
      setExercises(updated)
    }
  }

  const resetForm = () => {
    setName('')
    setNotes('')
    setDifficulty(0)
    setExercises([{ name: '', sets: '', load: '', reps: '', setNumber: 1, totalSets: 1, isSetRow: false }])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validExercises = exercises.filter(ex => ex.name && ex.name.trim() !== '')
    if (validExercises.length > 0) {
      const workoutName = name && name.trim() !== '' ? name.trim() : 'Untitled Workout'
      onAdd(workoutName, validExercises, notes, difficulty)
      setName('')
      setNotes('')
      setDifficulty(0)
      setExercises([{ name: '', sets: '', load: '', reps: '', setNumber: 1, totalSets: 1, isSetRow: false }])
    } else {
      alert('Please add at least one exercise with a name')
    }
  }

  const startEditing = (workout) => {
    setEditingWorkout(workout)
    setName(workout.name)
    setNotes(workout.notes || '')
    setDifficulty(workout.difficulty || 0)
    setExercises(workout.exercises)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    const validExercises = exercises.filter(ex => ex.name && ex.name.trim() !== '')
    if (editingWorkout && validExercises.length > 0) {
      const workoutName = name && name.trim() !== '' ? name.trim() : 'Untitled Workout'
      onUpdate(editingWorkout.id, workoutName, validExercises, notes, difficulty)
      setEditingWorkout(null)
      setName('')
      setNotes('')
      setDifficulty(0)
      setExercises([{ name: '', sets: '', load: '', reps: '', setNumber: 1, totalSets: 1, isSetRow: false }])
    }
  }

  const cancelEdit = () => {
    setEditingWorkout(null)
    setName('')
    setNotes('')
    setDifficulty(0)
    setExercises([{ name: '', sets: '', load: '', reps: '', setNumber: 1, totalSets: 1, isSetRow: false }])
  }

  return (
    <div className="space-y-6">
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {editingWorkout ? 'Edit Workout' : 'Log Workout'}
          </h2>
          {editingWorkout && (
            <button
              onClick={cancelEdit}
              className={`px-2 py-1 ${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} rounded text-xs transition-colors`}
            >
              Cancel
            </button>
          )}
        </div>
        <form onSubmit={editingWorkout ? handleEditSubmit : handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Workout Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
          />
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                  <th className={`text-left py-2 px-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Set</th>
                  <th className={`text-left py-2 px-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Exercise</th>
                  <th className={`text-left py-2 px-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Load</th>
                  <th className={`text-left py-2 px-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Reps</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise, index) => (
                  <tr key={index}>
                    <td className="py-2 px-3">
                      <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {exercise.isSetRow ? `${exercise.setNumber}/${exercise.totalSets}` : '-'}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      {exercise.isSetRow ? (
                        <span className={`text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{exercise.name}</span>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Exercise"
                            value={exercise.name}
                            onChange={(e) => updateExercise(index, 'name', e.target.value)}
                            className={`flex-1 min-w-[100px] px-3 py-1.5 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-400'} border rounded focus:outline-none focus:border-blue-500 text-sm`}
                          />
                          <input
                            type="text"
                            placeholder="Sets"
                            value={exercise.sets}
                            onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                            className={`w-16 px-3 py-1.5 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded focus:outline-none focus:border-blue-500 text-sm`}
                          />
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        placeholder="Load"
                        value={exercise.load}
                        onChange={(e) => updateExercise(index, 'load', e.target.value)}
                        className={`w-20 px-3 py-1.5 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded focus:outline-none focus:border-blue-500 text-sm`}
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        placeholder="Reps"
                        value={exercise.reps}
                        onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                        className={`w-20 px-3 py-1.5 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded focus:outline-none focus:border-blue-500 text-sm`}
                      />
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex gap-1">
                        {exercise.isSetRow && (
                          <button
                            type="button"
                            onClick={() => addSetRow(index)}
                            className="text-blue-500 hover:text-blue-700 text-xs"
                            title="Add set"
                          >
                            +
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setExercises(exercises.filter((_, i) => i !== index))}
                          className="text-slate-400 hover:text-slate-600 text-sm"
                        >
                          ×
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={addExercise}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Add Exercise Row
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Reset
            </button>
          </div>
          <div>
            <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Notes (optional)</label>
            <textarea
              placeholder="Add notes about your workout..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className={`w-full px-3 py-1.5 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded focus:outline-none focus:border-blue-500`}
            />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Difficulty (1-10)</label>
            <input
              type="number"
              min="1"
              max="10"
              placeholder="1-10"
              value={difficulty || ''}
              onChange={(e) => setDifficulty(parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-1.5 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded focus:outline-none focus:border-blue-500`}
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Save Workout
          </button>
        </form>
      </div>

      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Workout History</h2>
        <div className="space-y-4">
          {data.map((workout) => (
            <div key={workout.id} className={`${darkMode ? 'border-slate-700' : 'border-slate-200'} border rounded-lg overflow-hidden`}>
              <div 
                className={`${darkMode ? 'bg-slate-700 border-slate-700' : 'bg-slate-50 border-slate-200'} px-4 py-3 border-b flex justify-between items-center cursor-pointer hover:${darkMode ? 'bg-slate-600' : 'bg-slate-100'} transition-colors`}
                onClick={() => setExpandedWorkoutId(expandedWorkoutId === workout.id ? null : workout.id)}
              >
                <div className="flex items-center gap-3">
                  <span className={`${darkMode ? 'text-white' : 'text-slate-900'} font-semibold`}>{workout.name}</span>
                  <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{workout.localDate || new Date(workout.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  {expandedWorkoutId === workout.id ? (
                    <ChevronLeft size={16} className={darkMode ? 'text-slate-400' : 'text-slate-500'} />
                  ) : (
                    <ChevronRight size={16} className={darkMode ? 'text-slate-400' : 'text-slate-500'} />
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      startEditing(workout)
                    }}
                    className="p-1 hover:bg-blue-100 rounded text-blue-500"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(workout.id)
                    }}
                    className="p-1 hover:bg-red-100 rounded text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {expandedWorkoutId === workout.id && (
                <div>
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${darkMode ? 'border-slate-700 bg-slate-700' : 'border-slate-200 bg-slate-50'}`}>
                        <th className={`text-left py-2 px-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium text-sm`}>Set</th>
                        <th className={`text-left py-2 px-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium text-sm`}>Exercise</th>
                        <th className={`text-left py-2 px-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium text-sm`}>Load</th>
                        <th className={`text-left py-2 px-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium text-sm`}>Reps</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workout.exercises.map((ex, i) => (
                        <tr key={i} className={`border-b ${darkMode ? 'border-slate-700' : 'border-slate-100'} last:border-b-0`}>
                          <td className={`py-2 px-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{ex.setNumber && ex.totalSets ? `${ex.setNumber}/${ex.totalSets}` : '-'}</td>
                          <td className={`py-2 px-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{ex.name}</td>
                          <td className={`py-2 px-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{ex.load}</td>
                          <td className={`py-2 px-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{ex.reps}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {workout.notes && (
                    <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-1`}>Notes:</p>
                      <p className={`text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{workout.notes}</p>
                    </div>
                  )}
                  {workout.difficulty && workout.difficulty > 0 && (
                    <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Difficulty: <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{workout.difficulty}/10</span></p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {data.length === 0 && (
            <p className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No workouts logged yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

function JournalTracker({ data, onAdd, onDelete, onUpdate, darkMode }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredEntries = data.filter(entry => 
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const renderContent = (content) => {
    if (!content) return <div />
    let html = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^# (.*$)/gm, '<h3>$1</h3>')
      .replace(/\n/g, '<br>')
    return <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: html }} />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title && content) {
      onAdd(title, content)
      setTitle('')
      setContent('')
    }
  }

  return (
    <div className="space-y-6">
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>New Journal Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
          />
          <textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500 resize-y`}
          />
          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Save Entry
          </button>
        </form>
      </div>

      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <div className="flex items-center gap-4 mb-4">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Journal History</h2>
          <div className="relative flex-1 max-w-md">
            <Search size={16} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-slate-400' : 'text-slate-400'}`} />
            <input
              type="text"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntries.map((entry) => (
          <div key={entry.id} className={`${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{entry.title}</h3>
              <div className="flex gap-2">
                <button onClick={() => onDelete(entry.id)} className="p-1 hover:bg-red-100 rounded text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className={`text-sm mb-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{entry.localDate || new Date(entry.date).toLocaleDateString()}</p>
            <div className={`text-sm line-clamp-3 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{renderContent(entry.content)}</div>
          </div>
        ))}
        {filteredEntries.length === 0 && (
          <p className={`text-center py-8 col-span-full ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{searchQuery ? 'No matching entries' : 'No journal entries yet'}</p>
        )}
        </div>
      </div>
    </div>
  )
}

function GoalsView({ goals, goalHistory, onAdd, onUpdate, onDelete, onDeleteFromHistory, onMoveToHistory, onEdit, onEditFromHistory, onToggleImportance, onTogglePin, numbers, darkMode }) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('progress')
  const [target, setTarget] = useState('')
  const [currentValue, setCurrentValue] = useState('')
  const [editingGoal, setEditingGoal] = useState(null)
  const [editingHistoryGoal, setEditingHistoryGoal] = useState(null)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (title) {
      let targetValue = 0
      if (target && target.trim() !== '') {
        const targetNum = parseFloat(target)
        targetValue = isNaN(targetNum) ? target : targetNum
      }
      const currentNum = parseFloat(currentValue) || 0
      onAdd(title, type, targetValue, currentNum)
      setTitle('')
      setType('progress')
      setTarget('')
      setCurrentValue('')
    }
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (editingGoal) {
      let targetValue = 0
      if (target && target.trim() !== '') {
        const targetNum = parseFloat(target)
        targetValue = isNaN(targetNum) ? target : targetNum
      }
      const currentNum = parseFloat(currentValue) || 0
      onEdit(editingGoal.id, { title, type, target: targetValue, currentValue: currentNum })
      setEditingGoal(null)
      setTitle('')
      setType('progress')
      setTarget('')
      setCurrentValue('')
    }
  }

  const handleHistoryEditSubmit = (e) => {
    e.preventDefault()
    if (editingHistoryGoal) {
      onEditFromHistory(editingHistoryGoal.id, { title })
      setEditingHistoryGoal(null)
      setTitle('')
    }
  }

  const startEditing = (goal) => {
    setEditingGoal(goal)
    setTitle(goal.title)
    setType(goal.type)
    setTarget(goal.target)
    setCurrentValue(goal.currentValue)
  }

  const startHistoryEditing = (goal) => {
    setEditingHistoryGoal(goal)
    setTitle(goal.title)
  }

  const cancelEdit = () => {
    setEditingGoal(null)
    setEditingHistoryGoal(null)
    setTitle('')
    setType('progress')
    setTarget('')
    setCurrentValue('')
  }
  
  const getProgress = (goal) => {
    if (goal.type === 'progress' && typeof goal.target === 'number') {
      return Math.min((goal.currentValue / goal.target) * 100, 100)
    }
    return 0
  }
  
  const getNumberTotal = (numberName) => {
    return numbers.filter(n => n.name === numberName).reduce((sum, n) => sum + n.value, 0)
  }
  
  return (
    <div className="space-y-6">
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Create New Goal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Goal Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-lg focus:outline-none focus:border-blue-500`}
          >
            <option value="progress">Progress Bar (Numeric)</option>
            <option value="written">Written Word Target</option>
          </select>
          {type === 'progress' && (
            <input
              type="number"
              placeholder="Target Value"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
            />
          )}
          <input
            type="number"
            placeholder="Current Value (optional)"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
          />
          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Create Goal
          </button>
        </form>
      </div>
      
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Active Goals</h2>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
              {editingGoal && editingGoal.id === goal.id ? (
                <form onSubmit={handleEditSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Goal Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full px-3 py-1.5 ${darkMode ? 'bg-slate-600 border-slate-500 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} border rounded text-sm focus:outline-none focus:border-blue-500`}
                  />
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className={`w-full px-3 py-1.5 ${darkMode ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded text-sm focus:outline-none focus:border-blue-500`}
                  >
                    <option value="progress">Progress Bar (Numeric)</option>
                    <option value="written">Written Word Target</option>
                  </select>
                  {type === 'progress' && (
                    <input
                      type="number"
                      placeholder="Target Value"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className={`w-full px-3 py-1.5 ${darkMode ? 'bg-slate-600 border-slate-500 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} border rounded text-sm focus:outline-none focus:border-blue-500`}
                    />
                  )}
                  <input
                    type="number"
                    placeholder="Current Value"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    className={`w-full px-3 py-1.5 ${darkMode ? 'bg-slate-600 border-slate-500 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} border rounded text-sm focus:outline-none focus:border-blue-500`}
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Save</button>
                    <button type="button" onClick={cancelEdit} className="px-3 py-1 bg-slate-500 text-white text-sm rounded hover:bg-slate-600">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onTogglePin(goal.id)}
                        className={`px-2 py-1 text-xs font-medium flex items-center gap-1 rounded ${goal.pinned ? 'bg-blue-100 text-blue-700' : darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      >
                        <Target size={12} />
                        {goal.pinned ? 'Pinned to dashboard' : 'Pin to dashboard'}
                      </button>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{goal.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(goal)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onMoveToHistory(goal.id, 'completed')}
                        className="text-green-600 hover:text-green-700 text-sm"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => onMoveToHistory(goal.id, 'failed')}
                        className="text-orange-600 hover:text-orange-700 text-sm"
                      >
                        Fail
                      </button>
                      <button
                        onClick={() => onDelete(goal.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {goal.type === 'progress' && typeof goal.target === 'number' ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Progress</span>
                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{goal.currentValue} / {goal.target}</span>
                      </div>
                      <div className={`w-full ${darkMode ? 'bg-slate-600' : 'bg-slate-200'} rounded-full h-2`}>
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${getProgress(goal)}%` }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Update progress"
                          value={goal.currentValue}
                          onChange={(e) => onUpdate(goal.id, parseFloat(e.target.value) || 0)}
                          className={`flex-1 px-3 py-1 ${darkMode ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded text-sm focus:outline-none focus:border-blue-500`}
                        />
                      </div>
                    </div>
                  ) : (
                    null
                  )}
                </>
              )}
            </div>
          ))}
          {goals.length === 0 && (
            <p className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No goals yet</p>
          )}
        </div>
      </div>
      
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Goal History</h2>
        <div className="space-y-4">
          {goalHistory.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt)).map((goal) => (
            <div key={goal.id} className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
              {editingHistoryGoal && editingHistoryGoal.id === goal.id ? (
                <form onSubmit={handleHistoryEditSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Goal Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full px-3 py-1.5 ${darkMode ? 'bg-slate-600 border-slate-500 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} border rounded text-sm focus:outline-none focus:border-blue-500`}
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Save</button>
                    <button type="button" onClick={cancelEdit} className="px-3 py-1 bg-slate-500 text-white text-sm rounded hover:bg-slate-600">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{goal.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startHistoryEditing(goal)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteFromHistory(goal.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${goal.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {goal.status}
                  </span>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Completed: {new Date(goal.completedAt).toLocaleDateString()}</p>
                  {goal.type === 'progress' && typeof goal.target === 'number' && (
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Final progress: {goal.currentValue} / {goal.target}</p>
                  )}
                </>
              )}
            </div>
          ))}
          {goalHistory.length === 0 && (
            <p className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No goal history yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

function AnalyticsView({ data, selectedNumber, onSelectNumber, darkMode }) {
  const [timeRange, setTimeRange] = useState('week')
  const [selectedMetric, setSelectedMetric] = useState(null)
  
  const getDateRange = () => {
    const now = new Date()
    switch (timeRange) {
      case 'week':
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return weekAgo
      case 'month':
        const monthAgo = new Date()
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        return monthAgo
      case 'year':
        const yearAgo = new Date()
        yearAgo.setFullYear(yearAgo.getFullYear() - 1)
        return yearAgo
      case 'all':
        return new Date(0)
      default:
        return new Date(0)
    }
  }
  
  const getWeeklySummary = () => {
    const now = new Date()
    const thisWeekStart = new Date(now)
    thisWeekStart.setDate(now.getDate() - 7)
    
    const thisWeekSkates = data.skates.filter(s => new Date(s.date) >= thisWeekStart)
    const thisWeekWorkouts = data.workouts.filter(w => new Date(w.date) >= thisWeekStart)
    const thisWeekJournal = data.journal.filter(j => new Date(j.date) >= thisWeekStart)
    
    const metricsProgress = data.metrics.filter(m => new Date(m.date) >= thisWeekStart).map(m => ({
      name: m.name,
      progress: m.target > 0 ? Math.round((m.currentValue / m.target) * 100) : 0
    }))
    
    const totalSkateTime = thisWeekSkates.reduce((sum, s) => sum + (s.duration || 0), 0)
    
    return {
      skates: thisWeekSkates.length,
      workouts: thisWeekWorkouts.length,
      journal: thisWeekJournal.length,
      metricsProgress,
      totalSkateTime
    }
  }
  
  const getWeekComparison = () => {
    const now = new Date()
    const thisWeekStart = new Date(now)
    thisWeekStart.setDate(now.getDate() - 7)
    
    const lastWeekStart = new Date(now)
    lastWeekStart.setDate(now.getDate() - 14)
    
    const thisWeekSkates = data.skates.filter(s => new Date(s.date) >= thisWeekStart)
    const lastWeekSkates = data.skates.filter(s => new Date(s.date) >= lastWeekStart && new Date(s.date) < thisWeekStart)
    
    const thisWeekWorkouts = data.workouts.filter(w => new Date(w.date) >= thisWeekStart)
    const lastWeekWorkouts = data.workouts.filter(w => new Date(w.date) >= lastWeekStart && new Date(w.date) < thisWeekStart)
    
    const thisWeekJournal = data.journal.filter(j => new Date(j.date) >= thisWeekStart)
    const lastWeekJournal = data.journal.filter(j => new Date(j.date) >= lastWeekStart && new Date(j.date) < thisWeekStart)
    
    const thisWeekSkateTime = thisWeekSkates.reduce((sum, s) => sum + (s.duration || 0), 0)
    const lastWeekSkateTime = lastWeekSkates.reduce((sum, s) => sum + (s.duration || 0), 0)
    
    return {
      thisWeek: {
        skates: thisWeekSkates.length,
        workouts: thisWeekWorkouts.length,
        journal: thisWeekJournal.length,
        skateTime: thisWeekSkateTime
      },
      lastWeek: {
        skates: lastWeekSkates.length,
        workouts: lastWeekWorkouts.length,
        journal: lastWeekJournal.length,
        skateTime: lastWeekSkateTime
      }
    }
  }
  
  const getPersonalBests = () => {
    const bests = []
    
    // Best skate performance
    if (data.skates.length > 0) {
      const bestPerformance = data.skates.reduce((best, skate) => 
        (skate.performance || 0) > (best.performance || 0) ? skate : best
      )
      if (bestPerformance.performance > 0) {
        bests.push({
          type: 'skate',
          category: 'Best Performance',
          value: `${bestPerformance.performance}/10`,
          date: bestPerformance.localDate
        })
      }
    }
    
    // Longest skate
    if (data.skates.length > 0) {
      const longestSkate = data.skates.reduce((best, skate) => 
        (skate.duration || 0) > (best.duration || 0) ? skate : best
      )
      if (longestSkate.duration > 0) {
        bests.push({
          type: 'skate',
          category: 'Longest Skate',
          value: `${longestSkate.duration} minutes`,
          date: longestSkate.localDate
        })
      }
    }
    
    // Hardest workout
    if (data.workouts.length > 0) {
      const hardestWorkout = data.workouts.reduce((best, workout) => 
        (workout.difficulty || 0) > (best.difficulty || 0) ? workout : best
      )
      if (hardestWorkout.difficulty > 0) {
        bests.push({
          type: 'workout',
          category: 'Hardest Workout',
          value: `${hardestWorkout.difficulty}/10`,
          date: hardestWorkout.localDate
        })
      }
    }
    
    // Most exercises in workout
    if (data.workouts.length > 0) {
      const mostExercises = data.workouts.reduce((best, workout) => 
        (workout.exercises?.length || 0) > (best.exercises?.length || 0) ? workout : best
      )
      if (mostExercises.exercises?.length > 0) {
        bests.push({
          type: 'workout',
          category: 'Most Exercises',
          value: `${mostExercises.exercises.length} exercises`,
          date: mostExercises.localDate
        })
      }
    }
    
    // Most volume (weight lifted) in one session
    if (data.workouts.length > 0) {
      const mostVolume = data.workouts.reduce((best, workout) => {
        const volume = workout.exercises?.reduce((sum, ex) => {
          const load = parseFloat(ex.load) || 0
          const reps = parseInt(ex.reps) || 0
          return sum + (load * reps)
        }, 0) || 0
        const bestVolume = best.exercises?.reduce((sum, ex) => {
          const load = parseFloat(ex.load) || 0
          const reps = parseInt(ex.reps) || 0
          return sum + (load * reps)
        }, 0) || 0
        return volume > bestVolume ? workout : best
      })
      const maxVolume = mostVolume.exercises?.reduce((sum, ex) => {
        const load = parseFloat(ex.load) || 0
        const reps = parseInt(ex.reps) || 0
        return sum + (load * reps)
      }, 0) || 0
      if (maxVolume > 0) {
        bests.push({
          type: 'workout',
          category: 'Most Volume',
          value: `${maxVolume.toLocaleString()} lbs`,
          date: mostVolume.localDate
        })
      }
    }
    
    // Longest journal entry
    if (data.journal.length > 0) {
      const longestEntry = data.journal.reduce((best, entry) => 
        (entry.content?.length || 0) > (best.content?.length || 0) ? entry : best
      )
      if (longestEntry.content?.length > 0) {
        bests.push({
          type: 'journal',
          category: 'Longest Entry',
          value: `${longestEntry.content.length} characters`,
          date: longestEntry.localDate
        })
      }
    }
    
    return bests
  }
  
  const getWorkoutFrequencyData = () => {
    const startDate = getDateRange()
    const dateCounts = {}
    data.workouts
      .filter(w => new Date(w.date) >= startDate)
      .forEach(w => {
        const dateStr = new Date(w.date).toLocaleDateString()
        dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1
      })
    return Object.entries(dateCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }
  
  const getWorkoutDifficultyData = () => {
    const startDate = getDateRange()
    return data.workouts
      .filter(w => new Date(w.date) >= startDate && w.difficulty > 0)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(w => ({
        date: new Date(w.date).toLocaleDateString(),
        difficulty: w.difficulty
      }))
  }
  
  const getCombinedWorkoutData = () => {
    const startDate = getDateRange()
    const dateCounts = {}
    const dateDifficulties = {}
    
    data.workouts
      .filter(w => new Date(w.date) >= startDate)
      .forEach(w => {
        const dateStr = new Date(w.date).toLocaleDateString()
        dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1
        if (w.difficulty > 0) {
          dateDifficulties[dateStr] = (dateDifficulties[dateStr] || 0) + w.difficulty
        }
      })
    
    // Calculate average difficulty per day
    const allDates = [...new Set([...Object.keys(dateCounts), ...Object.keys(dateDifficulties)])]
    return allDates
      .map(date => ({
        date,
        frequency: dateCounts[date] || 0,
        difficulty: dateCounts[date] > 0 && dateDifficulties[date] ? (dateDifficulties[date] / dateCounts[date]).toFixed(1) : null
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }
  
  const getSkatesData = () => {
    const startDate = getDateRange()
    return data.skates
      .filter(s => new Date(s.date) >= startDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(s => ({
        date: new Date(s.date).toLocaleDateString(),
        energy: s.energy || 0,
        performance: s.performance || 0,
        difficulty: s.difficulty || 0
      }))
  }
  
  const getWorkoutsData = () => {
    const startDate = getDateRange()
    return data.workouts
      .filter(w => new Date(w.date) >= startDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(w => ({
        date: new Date(w.date).toLocaleDateString(),
        frequency: 1,
        difficulty: w.difficulty || 0
      }))
  }
  
  const getCommonExercises = () => {
    const exerciseCounts = {}
    data.workouts.forEach(workout => {
      workout.exercises?.forEach(exercise => {
        if (exercise.name) {
          exerciseCounts[exercise.name] = (exerciseCounts[exercise.name] || 0) + 1
        }
      })
    })
    
    return Object.entries(exerciseCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))
  }
  
  const getMetricData = (metricName) => {
    const metric = data.metrics.find(m => m.name === metricName)
    if (!metric) return []
    
    const startDate = getDateRange()
    return data.metrics
      .filter(m => m.name === metricName && new Date(m.date) >= startDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(m => ({
        date: new Date(m.date).toLocaleDateString(),
        value: m.currentValue
      }))
  }
  
  const getJournalData = () => {
    const startDate = getDateRange()
    return data.journal
      .filter(j => new Date(j.date) >= startDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(j => ({
        date: new Date(j.date).toLocaleDateString(),
        frequency: 1,
        length: j.content?.length || 0
      }))
  }
  
  const weeklySummary = getWeeklySummary()
  const weekComparison = getWeekComparison()
  const personalBests = getPersonalBests()
  const skatesData = getSkatesData()
  const workoutsData = getWorkoutsData()
  const combinedWorkoutData = getCombinedWorkoutData()
  const commonExercises = getCommonExercises()
  const metricData = selectedMetric ? getMetricData(selectedMetric) : []
  const journalData = getJournalData()
  
  const availableMetrics = [...new Set(data.metrics.map(m => m.name))]
  
  return (
    <div className="space-y-6">
      {/* Weekly Summary */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Weekly Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
            <h3 className={`text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Skates</h3>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weeklySummary.skates}</p>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{weeklySummary.totalSkateTime}m total</p>
          </div>
          <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
            <h3 className={`text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Workouts</h3>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weeklySummary.workouts}</p>
          </div>
          <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
            <h3 className={`text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Journal Entries</h3>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weeklySummary.journal}</p>
          </div>
          <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
            <h3 className={`text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Metrics Progress</h3>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weeklySummary.metricsProgress.length}</p>
          </div>
        </div>
        
        {weeklySummary.metricsProgress.length > 0 && (
          <div className={`mt-4 p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
            <h3 className={`text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Metrics Progress This Week</h3>
            <div className="space-y-2">
              {weeklySummary.metricsProgress.map((metric, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className={darkMode ? 'text-white' : 'text-slate-900'}>{metric.name}</span>
                  <span className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{metric.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Week to Week Comparison */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>This Week vs Last Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
            <h3 className={`text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Skates</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weekComparison.thisWeek.skates}</p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>This Week</p>
              </div>
              <div className={`text-sm ${weekComparison.thisWeek.skates > weekComparison.lastWeek.skates ? 'text-green-500' : weekComparison.thisWeek.skates < weekComparison.lastWeek.skates ? 'text-red-500' : 'text-slate-500'}`}>
                {weekComparison.thisWeek.skates > weekComparison.lastWeek.skates ? '↑' : weekComparison.thisWeek.skates < weekComparison.lastWeek.skates ? '↓' : '→'}
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weekComparison.lastWeek.skates}</p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Last Week</p>
              </div>
            </div>
          </div>
          <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
            <h3 className={`text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Skate Time</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weekComparison.thisWeek.skateTime}m</p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>This Week</p>
              </div>
              <div className={`text-sm ${weekComparison.thisWeek.skateTime > weekComparison.lastWeek.skateTime ? 'text-green-500' : weekComparison.thisWeek.skateTime < weekComparison.lastWeek.skateTime ? 'text-red-500' : 'text-slate-500'}`}>
                {weekComparison.thisWeek.skateTime > weekComparison.lastWeek.skateTime ? '↑' : weekComparison.thisWeek.skateTime < weekComparison.lastWeek.skateTime ? '↓' : '→'}
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weekComparison.lastWeek.skateTime}m</p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Last Week</p>
              </div>
            </div>
          </div>
          <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
            <h3 className={`text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Workouts</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weekComparison.thisWeek.workouts}</p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>This Week</p>
              </div>
              <div className={`text-sm ${weekComparison.thisWeek.workouts > weekComparison.lastWeek.workouts ? 'text-green-500' : weekComparison.thisWeek.workouts < weekComparison.lastWeek.workouts ? 'text-red-500' : 'text-slate-500'}`}>
                {weekComparison.thisWeek.workouts > weekComparison.lastWeek.workouts ? '↑' : weekComparison.thisWeek.workouts < weekComparison.lastWeek.workouts ? '↓' : '→'}
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weekComparison.lastWeek.workouts}</p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Last Week</p>
              </div>
            </div>
          </div>
          <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
            <h3 className={`text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Journal</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weekComparison.thisWeek.journal}</p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>This Week</p>
              </div>
              <div className={`text-sm ${weekComparison.thisWeek.journal > weekComparison.lastWeek.journal ? 'text-green-500' : weekComparison.thisWeek.journal < weekComparison.lastWeek.journal ? 'text-red-500' : 'text-slate-500'}`}>
                {weekComparison.thisWeek.journal > weekComparison.lastWeek.journal ? '↑' : weekComparison.thisWeek.journal < weekComparison.lastWeek.journal ? '↓' : '→'}
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{weekComparison.lastWeek.journal}</p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Last Week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Personal Bests */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Personal Bests</h2>
        {personalBests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalBests.map((best, idx) => (
              <div key={idx} className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{best.category}</h3>
                    <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{best.value}</p>
                  </div>
                  <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{best.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={`text-center py-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No personal bests yet</p>
        )}
      </div>
      
      {/* Skates Section */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
            <Zap size={20} className="text-blue-500" />
            Skates Analytics
          </h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`px-3 py-1 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded text-sm focus:outline-none focus:border-blue-500`}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
        {skatesData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={skatesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="energy" stroke="#22c55e" strokeWidth={2} name="Energy" />
                <Line type="monotone" dataKey="performance" stroke="#3b82f6" strokeWidth={2} name="Performance" />
                <Line type="monotone" dataKey="difficulty" stroke="#ef4444" strokeWidth={2} name="Difficulty" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className={`text-center py-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No skate data available</p>
        )}
      </div>
      
      {/* Workouts Section */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Workouts Analytics</h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`px-3 py-1 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded text-sm focus:outline-none focus:border-blue-500`}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
        {combinedWorkoutData.length > 0 ? (
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={combinedWorkoutData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="frequency" stroke="#22c55e" strokeWidth={2} name="Frequency" />
                <Line type="monotone" dataKey="difficulty" stroke="#ef4444" strokeWidth={2} name="Difficulty" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className={`text-center py-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No workout data available</p>
        )}
        
        {commonExercises.length > 0 && (
          <div className={`mt-6 p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
            <h3 className={`text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>5 Most Common Exercises</h3>
            <div className="space-y-2">
              {commonExercises.map((exercise, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className={darkMode ? 'text-white' : 'text-slate-900'}>{exercise.name}</span>
                  <span className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{exercise.count} times</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Metrics Section */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Metrics Analytics</h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`px-3 py-1 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded text-sm focus:outline-none focus:border-blue-500`}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
        <div className="mb-4">
          <label className={`text-sm mb-2 block ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Select Metric</label>
          <div className="flex flex-wrap gap-2">
            {availableMetrics.map(metric => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  selectedMetric === metric
                    ? 'bg-blue-600 text-white'
                    : darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {metric}
              </button>
            ))}
            {selectedMetric && (
              <button
                onClick={() => setSelectedMetric(null)}
                className="px-3 py-1 rounded-lg text-sm bg-red-100 text-red-700 hover:bg-red-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        
        {selectedMetric && metricData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={metricData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} name={selectedMetric} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className={`text-center py-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {selectedMetric ? 'No data available for this metric' : 'Select a metric to view analytics'}
          </p>
        )}
      </div>
      
      {/* Journal Section */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Journal Analytics</h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`px-3 py-1 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded text-sm focus:outline-none focus:border-blue-500`}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
        {journalData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={journalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="frequency" stroke="#a855f7" strokeWidth={2} name="Frequency" />
                <Line type="monotone" dataKey="length" stroke="#8b5cf6" strokeWidth={2} name="Length (chars)" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className={`text-center py-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No journal data available</p>
        )}
      </div>
    </div>
  )
}

function SkatesTracker({ data, onAdd, onDelete, onUpdate, darkMode }) {
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [performance, setPerformance] = useState(0)
  const [difficulty, setDifficulty] = useState(0)
  const [energy, setEnergy] = useState(0)
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (duration && title) {
      const dateTime = date && time ? `${date}T${time}` : date || new Date().toISOString()
      if (editingId) {
        onUpdate(editingId, title, parseFloat(duration), performance, difficulty, energy, notes, dateTime)
        setEditingId(null)
      } else {
        onAdd(title, parseFloat(duration), performance, difficulty, energy, notes, dateTime)
      }
      setTitle('')
      setDuration('')
      setPerformance(0)
      setDifficulty(0)
      setEnergy(0)
      setNotes('')
      setDate('')
      setTime('')
    }
  }

  const handleEdit = (skate) => {
    setEditingId(skate.id)
    setTitle(skate.title || '')
    setDuration(skate.duration)
    setPerformance(skate.performance)
    setDifficulty(skate.difficulty)
    setEnergy(skate.energy)
    setNotes(skate.notes)
    const skateDate = new Date(skate.date)
    setDate(skateDate.toISOString().split('T')[0])
    setTime(skateDate.toTimeString().slice(0, 5))
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setTitle('')
    setDuration('')
    setPerformance(0)
    setDifficulty(0)
    setEnergy(0)
    setNotes('')
    setDate('')
    setTime('')
  }

  const StarRating = ({ value, onChange, label, max = 10 }) => {
    return (
      <div className="flex items-center gap-2">
        <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{label}:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className={`transition-colors text-sm ${star <= value ? 'text-yellow-400' : darkMode ? 'text-slate-600' : 'text-slate-300'}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
    )
  }

  const avgRating = (rating) => {
    const ratedSkates = data.filter(s => s[rating] > 0)
    if (ratedSkates.length === 0) return 0
    return (ratedSkates.reduce((sum, s) => sum + s[rating], 0) / ratedSkates.length).toFixed(1)
  }

  const ratedSkates = data.filter(s => s.performance > 0 || s.difficulty > 0 || s.energy > 0)
  const totalTime = ratedSkates.reduce((sum, s) => sum + s.duration, 0)
  const avgDuration = ratedSkates.length > 0 ? (totalTime / ratedSkates.length).toFixed(0) : 0

  const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="space-y-6">
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Skate Analytics</h2>
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className={`px-3 py-1 ${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} rounded text-sm transition-colors`}
          >
            {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
          </button>
        </div>
        
        {showAnalytics && (
          <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-4`}>Analytics only include sessions with ratings</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Rated Sessions</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{ratedSkates.length}</p>
              </div>
              <div>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Total Time</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{totalTime}m</p>
              </div>
              <div>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Avg Duration</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{avgDuration}m</p>
              </div>
              <div>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Avg Performance</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{avgRating('performance')}/10</p>
              </div>
              <div>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Avg Difficulty</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{avgRating('difficulty')}/10</p>
              </div>
              <div>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Avg Energy</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{avgRating('energy')}/10</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-4`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className={`text-base font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {editingId ? 'Edit Skate Session' : 'Log Skate Session'}
          </h2>
          {editingId && (
            <button
              onClick={handleCancelEdit}
              className={`px-2 py-1 ${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} rounded text-xs transition-colors`}
            >
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Title *</label>
            <input
              type="text"
              placeholder="Skate session title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-1.5 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded focus:outline-none focus:border-blue-500`}
              required
            />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Duration (minutes) *</label>
            <input
              type="number"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className={`w-full px-3 py-1.5 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded focus:outline-none focus:border-blue-500`}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Date (optional)</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full px-3 py-1.5 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded focus:outline-none focus:border-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Time (optional)</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`w-full px-3 py-1.5 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded focus:outline-none focus:border-blue-500`}
              />
            </div>
          </div>
          <StarRating value={performance} onChange={setPerformance} label="Performance (optional)" />
          <StarRating value={difficulty} onChange={setDifficulty} label="Difficulty (optional)" />
          <StarRating value={energy} onChange={setEnergy} label="Energy (optional)" />
          <div>
            <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Notes (optional)</label>
            <textarea
              placeholder="Add notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className={`w-full px-3 py-1.5 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded focus:outline-none focus:border-blue-500`}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Plus size={16} />
            {editingId ? 'Update Skate' : 'Log Skate'}
          </button>
        </form>
      </div>

      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Skate History</h2>
        <div className="space-y-4">
          {sortedData.map((skate) => {
            const skateDate = new Date(skate.date)
            const hasRatings = skate.performance > 0 || skate.difficulty > 0 || skate.energy > 0
            return (
              <div key={skate.id} className={`${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg p-4`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    {skate.title && (
                      <div className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{skate.title}</div>
                    )}
                    <div className={`flex items-center gap-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      <Flame size={16} />
                      <span className="font-semibold">{skate.duration} minutes</span>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {skateDate.toLocaleDateString()} {skateDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => handleEdit(skate)}
                      className="p-1 hover:bg-blue-100 rounded text-blue-500"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(skate.id)}
                      className="p-1 hover:bg-red-100 rounded text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                {hasRatings && (
                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    {skate.performance > 0 && (
                      <div>
                        <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Performance:</span>
                        <div className="text-yellow-400 mt-1">{skate.performance}/10</div>
                      </div>
                    )}
                    {skate.difficulty > 0 && (
                      <div>
                        <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Difficulty:</span>
                        <div className="text-yellow-400 mt-1">{skate.difficulty}/10</div>
                      </div>
                    )}
                    {skate.energy > 0 && (
                      <div>
                        <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Energy:</span>
                        <div className="text-yellow-400 mt-1">{skate.energy}/10</div>
                      </div>
                    )}
                  </div>
                )}
                {skate.notes && (
                  <div className={`text-sm ${darkMode ? 'text-slate-200' : 'text-slate-800'} ${darkMode ? 'bg-slate-800' : 'bg-slate-200'} p-2 rounded`}>
                    {skate.notes}
                  </div>
                )}
              </div>
            )
          })}
          {data.length === 0 && (
            <p className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No skate sessions logged yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

function CalendarView({ data, onAddScheduled, onDeleteScheduled, darkMode }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [scheduleTitle, setScheduleTitle] = useState('')
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    return { daysInMonth, startingDayOfWeek }
  }
  
  const getEntriesForDate = (date) => {
    const dateStr = date.toLocaleDateString()
    const entries = []
    
    data.numbers.forEach(n => {
      if (n.localDate === dateStr || new Date(n.date).toLocaleDateString() === dateStr) entries.push({ type: 'number', ...n })
    })
    data.workouts.forEach(w => {
      if (w.localDate === dateStr || new Date(w.date).toLocaleDateString() === dateStr) entries.push({ type: 'workout', ...w })
    })
    data.journal.forEach(j => {
      if (j.localDate === dateStr || new Date(j.date).toLocaleDateString() === dateStr) entries.push({ type: 'journal', ...j })
    })
    data.skates.forEach(s => {
      if (s.localDate === dateStr || new Date(s.date).toLocaleDateString() === dateStr) entries.push({ type: 'skate', ...s })
    })
    data.goals.forEach(g => {
      if (g.localDate === dateStr || new Date(g.date || g.createdAt).toLocaleDateString() === dateStr) entries.push({ type: 'goal', ...g })
    })
    data.metrics.forEach(m => {
      if (m.localDate === dateStr || new Date(m.date).toLocaleDateString() === dateStr) entries.push({ type: 'metric', ...m })
    })
    data.targets.forEach(t => {
      if (t.localDate === dateStr || new Date(t.date || t.createdAt).toLocaleDateString() === dateStr) entries.push({ type: 'target', ...t })
    })
    data.scheduled?.forEach(s => {
      if (s.localDate === dateStr) entries.push({ type: 'scheduled', ...s })
    })
    
    return entries
  }

  const getProgressForDate = (date) => {
    const dateStr = date.toLocaleDateString()
    const progress = []
    
    // Get metrics progress on this date
    data.metrics.forEach(m => {
      if (m.localDate === dateStr || new Date(m.date).toLocaleDateString() === dateStr) {
        progress.push({
          type: 'metric',
          name: m.name,
          currentValue: m.currentValue,
          target: m.target,
          percentage: m.target > 0 ? Math.round((m.currentValue / m.target) * 100) : 0
        })
      }
    })
    
    // Get goals progress on this date
    data.goals.forEach(g => {
      if (g.localDate === dateStr || new Date(g.date || g.createdAt).toLocaleDateString() === dateStr) {
        progress.push({
          type: 'goal',
          name: g.title,
          currentValue: g.currentValue,
          target: g.target,
          percentage: g.target > 0 ? Math.round((g.currentValue / g.target) * 100) : 0
        })
      }
    })
    
    // Get targets progress on this date
    data.targets.forEach(t => {
      if (t.localDate === dateStr || new Date(t.date || t.createdAt).toLocaleDateString() === dateStr) {
        progress.push({
          type: 'target',
          name: t.description,
          currentValue: t.currentProgress,
          target: t.targetValue,
          percentage: t.targetValue > 0 ? Math.round((t.currentProgress / t.targetValue) * 100) : 0
        })
      }
    })
    
    return progress
  }
  
  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December']
  
  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }
  
  const [selectedDate, setSelectedDate] = useState(null)
  const [expandedWorkoutIds, setExpandedWorkoutIds] = useState(new Set())

  const handleScheduleSubmit = (e) => {
    e.preventDefault()
    if (scheduleTitle && scheduleDate) {
      onAddScheduled(scheduleTitle, scheduleDate, scheduleTime)
      setScheduleTitle('')
      setScheduleDate('')
      setScheduleTime('')
      setShowScheduleForm(false)
    }
  }

  const handleDateClick = (date) => {
    setSelectedDate(date)
    setScheduleDate(date.toISOString().split('T')[0])
  }

  const toggleWorkoutExpansion = (workoutId) => {
    setExpandedWorkoutIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(workoutId)) {
        newSet.delete(workoutId)
      } else {
        newSet.add(workoutId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowScheduleForm(!showScheduleForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Schedule Event
          </button>
          <button
            onClick={() => navigateMonth(-1)}
            className={`p-2 ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} rounded-lg ${darkMode ? 'text-slate-400' : 'text-slate-500'} ${darkMode ? 'hover:text-slate-300' : 'hover:text-slate-700'} transition-colors`}
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className={`p-2 ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} rounded-lg ${darkMode ? 'text-slate-400' : 'text-slate-500'} ${darkMode ? 'hover:text-slate-300' : 'hover:text-slate-700'} transition-colors`}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {showScheduleForm && (
          <div className={`mb-6 p-4 ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'} rounded-lg border`}>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Schedule New Event</h3>
            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                value={scheduleTitle}
                onChange={(e) => setScheduleTitle(e.target.value)}
                className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-600 border-slate-500 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
              />
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded-lg focus:outline-none focus:border-blue-500`}
              />
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded-lg focus:outline-none focus:border-blue-500`}
              />
              <button
                type="submit"
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add to Calendar
              </button>
            </form>
          </div>
        )}
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className={`text-center ${darkMode ? 'text-slate-400' : 'text-slate-500'} text-sm font-medium py-2`}>
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
            const entries = getEntriesForDate(date)
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
            const isToday = new Date().toDateString() === date.toDateString()
            
            return (
              <button
                key={i}
                onClick={() => handleDateClick(date)}
                className={`aspect-square rounded-lg p-2 text-left transition-all ${
                  isSelected 
                    ? 'bg-blue-600 text-white' 
                    : isToday
                    ? `${darkMode ? 'bg-slate-700' : 'bg-slate-100'} ${darkMode ? 'text-white' : 'text-slate-900'} border-2 border-blue-500`
                    : `${darkMode ? 'bg-slate-700 text-white hover:bg-slate-600 border-slate-600' : 'bg-slate-50 text-slate-900 hover:bg-slate-100 border-slate-200'} border`
                }`}
              >
                <div className="text-sm font-medium">{i + 1}</div>
                {entries.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {entries.slice(0, 3).map((entry, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full ${
                          entry.type === 'number' ? 'bg-blue-500' :
                          entry.type === 'workout' ? 'bg-green-500' :
                          entry.type === 'journal' ? 'bg-purple-500' :
                          entry.type === 'skate' ? 'bg-red-500' :
                          entry.type === 'goal' ? 'bg-blue-400' :
                          entry.type === 'target' ? 'bg-orange-400' :
                          entry.type === 'metric' ? 'bg-green-400' :
                          'bg-orange-500'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
      
      {selectedDate && (
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h3>
          <div className="space-y-3">
            {/* Progress Section */}
            {getProgressForDate(selectedDate).length > 0 && (
              <div className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg mb-4`}>
                <h4 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-3`}>Progress on this day</h4>
                <div className="space-y-2">
                  {getProgressForDate(selectedDate).map((progress, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className={`${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{progress.name}</span>
                          <span className={`${darkMode ? 'text-white' : 'text-slate-900'}`}>{progress.currentValue} / {progress.target}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              progress.type === 'metric' ? 'bg-green-500' :
                              progress.type === 'goal' ? 'bg-blue-500' :
                              'bg-orange-500'
                            }`}
                            style={{ width: `${Math.min(progress.percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                      <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {progress.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {getEntriesForDate(selectedDate).map((entry) => (
              <div key={entry.id} className={`flex items-start gap-3 p-3 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
                {entry.type === 'number' && <TrendingUp size={16} className="text-blue-600 mt-1" />}
                {entry.type === 'workout' && <Dumbbell size={16} className="text-green-600 mt-1" />}
                {entry.type === 'journal' && <BookOpen size={16} className="text-purple-600 mt-1" />}
                {entry.type === 'skate' && <Flame size={16} className="text-red-500 mt-1" />}
                {entry.type === 'goal' && <Target size={16} className="text-blue-500 mt-1" />}
                {entry.type === 'target' && <Target size={16} className="text-orange-500 mt-1" />}
                {entry.type === 'metric' && <Flame size={16} className="text-green-500 mt-1" />}
                {entry.type === 'scheduled' && <Calendar size={16} className="text-orange-500 mt-1" />}
                <div className="flex-1">
                  {entry.type === 'workout' ? (
                    <div>
                      <div 
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleWorkoutExpansion(entry.id)}
                      >
                        <div className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>{entry.name}</div>
                        {expandedWorkoutIds.has(entry.id) ? (
                          <ChevronLeft size={16} className={darkMode ? 'text-slate-400' : 'text-slate-500'} />
                        ) : (
                          <ChevronRight size={16} className={darkMode ? 'text-slate-400' : 'text-slate-500'} />
                        )}
                      </div>
                      {expandedWorkoutIds.has(entry.id) && (
                        <div className="mt-3">
                          <table className="w-full">
                            <thead>
                              <tr className={`border-b ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}>
                                <th className={`text-left py-1 px-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium text-xs`}>Set</th>
                                <th className={`text-left py-1 px-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium text-xs`}>Exercise</th>
                                <th className={`text-left py-1 px-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium text-xs`}>Load</th>
                                <th className={`text-left py-1 px-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium text-xs`}>Reps</th>
                              </tr>
                            </thead>
                            <tbody>
                              {entry.exercises?.map((ex, i) => (
                                <tr key={i} className={`border-b ${darkMode ? 'border-slate-600' : 'border-slate-100'} last:border-b-0`}>
                                  <td className={`py-1 px-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'} text-xs`}>{ex.setNumber && ex.totalSets ? `${ex.setNumber}/${ex.totalSets}` : '-'}</td>
                                  <td className={`py-1 px-2 ${darkMode ? 'text-white' : 'text-slate-900'} text-xs`}>{ex.name}</td>
                                  <td className={`py-1 px-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'} text-xs`}>{ex.load}</td>
                                  <td className={`py-1 px-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'} text-xs`}>{ex.reps}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {entry.notes && (
                            <div className={`p-2 mt-2 ${darkMode ? 'bg-slate-600' : 'bg-slate-100'} rounded`}>
                              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-1`}>Notes:</p>
                              <p className={`text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>{entry.notes}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : entry.type === 'skate' ? (
                    <div>
                      <div 
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleWorkoutExpansion(entry.id)}
                      >
                        <div className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>{entry.title || `${entry.duration} min skate`}</div>
                        {expandedWorkoutIds.has(entry.id) ? (
                          <ChevronLeft size={16} className={darkMode ? 'text-slate-400' : 'text-slate-500'} />
                        ) : (
                          <ChevronRight size={16} className={darkMode ? 'text-slate-400' : 'text-slate-500'} />
                        )}
                      </div>
                      {expandedWorkoutIds.has(entry.id) && (
                        <div className="mt-3">
                          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                            <div className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Duration: <span className={`${darkMode ? 'text-white' : 'text-slate-900'}`}>{entry.duration} min</span></div>
                            <div className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Date: <span className={`${darkMode ? 'text-white' : 'text-slate-900'}`}>{new Date(entry.date).toLocaleDateString()}</span></div>
                          </div>
                          {(entry.performance > 0 || entry.difficulty > 0 || entry.energy > 0) && (
                            <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                              {entry.performance > 0 && <div className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Perf: <span className={`${darkMode ? 'text-white' : 'text-slate-900'}`}>{entry.performance}/10</span></div>}
                              {entry.difficulty > 0 && <div className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Diff: <span className={`${darkMode ? 'text-white' : 'text-slate-900'}`}>{entry.difficulty}/10</span></div>}
                              {entry.energy > 0 && <div className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Energy: <span className={`${darkMode ? 'text-white' : 'text-slate-900'}`}>{entry.energy}/10</span></div>}
                            </div>
                          )}
                          {entry.notes && (
                            <div className={`p-2 mt-2 ${darkMode ? 'bg-slate-600' : 'bg-slate-100'} rounded`}>
                              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-1`}>Notes:</p>
                              <p className={`text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>{entry.notes}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>{entry.name || entry.title}</div>
                      {entry.type === 'number' && (
                        <div className="text-blue-600 font-semibold">{entry.value}</div>
                      )}
                      {entry.type === 'journal' && (
                        <div className={`${darkMode ? 'text-slate-300' : 'text-slate-700'} text-sm mt-1`}>{entry.content}</div>
                      )}
                      {entry.type === 'target' && (
                        <div className="text-sm mt-1">
                          <div className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Category: <span className={`${darkMode ? 'text-white' : 'text-slate-900'}`}>{entry.category}</span></div>
                          {entry.targetValue && (
                            <div className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Progress: <span className={`${darkMode ? 'text-white' : 'text-slate-900'}`}>{entry.currentProgress} / {entry.targetValue}</span></div>
                          )}
                        </div>
                      )}
                      {entry.type === 'scheduled' && (
                        <div className="flex items-center justify-between">
                          <div className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} text-sm`}>
                            {entry.time && <span className="mr-2">{entry.time}</span>}
                          </div>
                          <button
                            onClick={() => onDeleteScheduled(entry.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            {getEntriesForDate(selectedDate).length === 0 && (
              <p className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} text-center py-4`}>No entries on this day</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function OneRepMaxCalculator({ workouts, darkMode }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExercise, setSelectedExercise] = useState(null)

  // Get all unique exercise names from workouts
  const allExercises = [...new Set(
    workouts.flatMap(w => w.exercises.map(e => e.name).filter(n => n && n.trim()))
  )].sort()

  // Filter exercises based on search
  const filteredExercises = allExercises.filter(ex => 
    ex.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get all sets for a specific exercise across all workouts
  const getExerciseSets = (exerciseName) => {
    const sets = []
    workouts.forEach(workout => {
      workout.exercises.forEach(ex => {
        if (ex.name === exerciseName && ex.load && ex.reps) {
          const load = parseFloat(ex.load)
          const reps = parseInt(ex.reps)
          if (!isNaN(load) && !isNaN(reps) && reps > 0) {
            // Epley formula: 1RM = weight × (1 + reps/30)
            const estimated1RM = load * (1 + reps / 30)
            sets.push({
              date: workout.date,
              localDate: workout.localDate,
              load,
              reps,
              estimated1RM: Math.round(estimated1RM)
            })
          }
        }
      })
    })
    // Sort by date descending and take last 10
    return sets.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10)
  }

  const exerciseSets = selectedExercise ? getExerciseSets(selectedExercise) : []
  const best1RM = exerciseSets.length > 0 ? Math.max(...exerciseSets.map(s => s.estimated1RM)) : 0

  return (
    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
      <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>One-Rep Max Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className={`block text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Search Exercise</label>
          <input
            type="text"
            placeholder="e.g., Bench Press, Squat, Deadlift..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
          />
        </div>

        {filteredExercises.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filteredExercises.slice(0, 10).map(exercise => (
              <button
                key={exercise}
                onClick={() => {
                  setSelectedExercise(exercise)
                  setSearchTerm(exercise)
                }}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedExercise === exercise
                    ? 'bg-blue-600 text-white'
                    : `${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`
                }`}
              >
                {exercise}
              </button>
            ))}
          </div>
        )}

        {selectedExercise && (
          <div className={`mt-6 p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>{selectedExercise}</h3>
            {best1RM > 0 && (
              <div className={`mb-4 p-3 ${darkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'} border rounded`}>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Estimated 1-Rep Max</p>
                <p className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{best1RM} lbs</p>
                <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'} mt-1`}>Based on Epley formula</p>
              </div>
            )}
            
            <h4 className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-3`}>Last 10 Sets</h4>
            {exerciseSets.length > 0 ? (
              <div className="space-y-2">
                {exerciseSets.map((set, index) => (
                  <div key={index} className={`flex items-center justify-between p-2 ${darkMode ? 'bg-slate-600' : 'bg-white'} rounded`}>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{set.load} lbs × {set.reps} reps</p>
                      <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{set.localDate}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>~{set.estimated1RM} lbs</p>
                      <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>est. 1RM</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No sets found for this exercise</p>
            )}
          </div>
        )}

        {filteredExercises.length === 0 && searchTerm && (
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No exercises found. Try a different search term.</p>
        )}

        {!searchTerm && allExercises.length === 0 && (
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No workout data available. Log some workouts with exercises first.</p>
        )}
      </div>
    </div>
  )
}

function Chatbot({ data, darkMode }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('meta-llama/llama-3.1-70b-instruct')
  const [showSettings, setShowSettings] = useState(false)

  // Load API key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('openrouterApiKey')
    if (savedKey) setApiKey(savedKey.trim())
    const savedModel = localStorage.getItem('openrouterModel')
    if (savedModel) setModel(savedModel)
  }, [])

  // Save API key to localStorage (only if valid)
  useEffect(() => {
    if (apiKey && apiKey.trim().length > 0) {
      localStorage.setItem('openrouterApiKey', apiKey.trim())
    }
  }, [apiKey])

  useEffect(() => {
    localStorage.setItem('openrouterModel', model)
  }, [model])

  const prepareDataContext = () => {
    return {
      skates: (data.skates || []).map(s => ({
        title: s.title,
        duration: s.duration,
        performance: s.performance,
        difficulty: s.difficulty,
        energy: s.energy,
        notes: s.notes,
        date: s.date,
        localDate: s.localDate
      })),
      workouts: (data.workouts || []).map(w => ({
        name: w.name,
        difficulty: w.difficulty,
        exercises: w.exercises,
        notes: w.notes,
        date: w.date,
        localDate: w.localDate
      })),
      journal: (data.journal || []).map(j => ({
        title: j.title,
        content: j.content,
        date: j.date,
        localDate: j.localDate
      })),
      goals: (data.goals || []).map(g => ({
        title: g.title,
        type: g.type,
        target: g.target,
        currentValue: g.currentValue,
        status: g.status,
        important: g.important,
        pinned: g.pinned,
        createdAt: g.createdAt,
        date: g.date,
        localDate: g.localDate
      })),
      goalHistory: (data.goalHistory || []).map(g => ({
        title: g.title,
        type: g.type,
        target: g.target,
        currentValue: g.currentValue,
        status: g.status,
        completedAt: g.completedAt,
        localDate: g.localDate
      })),
      numbers: (data.numbers || []).map(n => ({
        name: n.name,
        value: n.value,
        pinned: n.pinned,
        date: n.date,
        localDate: n.localDate
      })),
      metrics: (data.metrics || []).map(m => ({
        name: m.name,
        currentValue: m.currentValue,
        target: m.target,
        pinned: m.pinned,
        date: m.date,
        localDate: m.localDate
      })),
      scheduled: (data.scheduled || []).map(s => ({
        title: s.title,
        date: s.date,
        time: s.time,
        localDate: s.localDate
      })),
      actionHistory: (data.actionHistory || []).map(a => ({
        action: a.action,
        itemType: a.itemType,
        itemName: a.itemName,
        details: a.details,
        timestamp: a.timestamp,
        localDate: a.localDate
      })),
      deletedItems: (data.deletedItems || []).map(d => ({
        type: d.type,
        title: d.title || d.name,
        deletedAt: d.deletedAt
      })),
      streaks: data.streaks || {}
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    
    // Validate API key
    const trimmedApiKey = apiKey.trim()
    if (!input.trim() || !trimmedApiKey) {
      if (!trimmedApiKey) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Please enter your Groq API key in Settings first.' }])
      }
      return
    }

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const dataContext = prepareDataContext()
      
      const systemPrompt = `You are a personal data analyst assistant. I have tracking data about my activities including skates, workouts, journal entries, goals, and numbers. 

Here is my current data:
${JSON.stringify(dataContext, null, 2)}

Please analyze this data and answer my questions. Be specific and use the actual data values. If the data doesn't support answering the question, say so clearly and suggest what data would be needed.

Provide your answers in a clear, conversational format.`

      // Debug: log API key info (without exposing the full key)
      console.log('API Key length:', trimmedApiKey.length)
      console.log('API Key starts with:', trimmedApiKey.substring(0, 10) + '...')
      console.log('Model being used:', model)

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${trimmedApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API response error:', response.status, errorText)
        throw new Error(`API error: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      const assistantMessage = result.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }])
    } catch (error) {
      console.error('Chatbot error:', error)
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}. Please check your API key and try again.` }])
    } finally {
      setLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  const clearApiKey = () => {
    setApiKey('')
    localStorage.removeItem('openrouterApiKey')
  }

  return (
    <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6 h-[calc(100vh-200px)] flex flex-col`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Personal Assistant</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`px-3 py-1 ${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} rounded text-sm transition-colors`}
          >
            {showSettings ? 'Hide Settings' : 'Settings'}
          </button>
          <button
            onClick={clearChat}
            className={`px-3 py-1 ${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} rounded text-sm transition-colors`}
          >
            Clear Chat
          </button>
        </div>
      </div>

      {showSettings && (
        <div className={`mb-4 p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg space-y-3`}>
          <div>
            <label className={`block text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-1`}>
              OpenRouter API Key
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-v1-..."
              className={`w-full px-3 py-2 text-sm ${darkMode ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded-lg`}
            />
            <div className="flex gap-2 mt-2">
              <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'} flex-1`}>
                Get your API key at <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">openrouter.ai/keys</a>
              </p>
              <button
                onClick={clearApiKey}
                className={`px-2 py-1 text-xs ${darkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600'} rounded transition-colors`}
              >
                Clear Key
              </button>
            </div>
          </div>
          
          <div>
            <label className={`block text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-1`}>
              AI Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className={`w-full px-3 py-2 text-sm ${darkMode ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded-lg`}
            >
              <option value="meta-llama/llama-3.1-70b-instruct">Llama 3.1 70B (Versatile)</option>
              <option value="meta-llama/llama-3.1-8b-instruct">Llama 3.1 8B (Fast)</option>
              <option value="meta-llama/llama-3-70b-instruct">Llama 3 70B</option>
              <option value="meta-llama/llama-3-8b-instruct">Llama 3 8B</option>
              <option value="mistralai/mistral-7b-instruct">Mistral 7B</option>
              <option value="openai/gpt-4o-mini">GPT-4o Mini</option>
            </select>
          </div>
        </div>
      )}

      <div className={`flex-1 overflow-y-auto mb-4 p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg space-y-4`}>
        {messages.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Start a conversation about your data. Ask questions about your skates, workouts, journal, goals, or numbers.
            </p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                  : `${darkMode ? 'bg-slate-600 text-slate-200' : 'bg-white text-slate-900 border border-slate-200'}`
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className={`${darkMode ? 'bg-slate-600 text-slate-200' : 'bg-white text-slate-900 border border-slate-200'} p-3 rounded-lg`}>
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={apiKey ? "Ask about your data..." : "Enter API key in settings first..."}
          disabled={!apiKey || loading}
          className={`flex-1 px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500 ${!apiKey ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <button
          type="submit"
          disabled={!input.trim() || !apiKey || loading}
          className={`px-4 py-2 ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'} rounded-lg transition-colors ${!input.trim() || !apiKey || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Send
        </button>
      </form>
    </div>
  )
}

function HistoryView({ data, darkMode }) {
  const [filterType, setFilterType] = useState('all')
  const [dateRange, setDateRange] = useState('all')

  const getAllActivities = () => {
    const allActivities = [
      ...data.workouts.map(w => ({ ...w, type: 'workout', name: w.name })),
      ...data.skates.map(s => ({ ...s, type: 'skate', name: s.title })),
      ...data.journal.map(j => ({ ...j, type: 'journal', name: j.title })),
      ...data.numbers.map(n => ({ ...n, type: 'number', name: n.name })),
      ...data.goals.map(g => ({ ...g, type: 'goal', name: g.title })),
      ...data.metrics.map(m => ({ ...m, type: 'metric', name: m.name }))
    ]

    let filtered = allActivities

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(activity => activity.type === filterType)
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date()
      let startDate

      if (dateRange === 'week') {
        startDate = new Date()
        startDate.setDate(now.getDate() - 7)
      } else if (dateRange === 'month') {
        startDate = new Date()
        startDate.setMonth(now.getMonth() - 1)
      } else if (dateRange === 'year') {
        startDate = new Date()
        startDate.setFullYear(now.getFullYear() - 1)
      }

      if (startDate) {
        filtered = filtered.filter(activity => new Date(activity.date || activity.createdAt) >= startDate)
      }
    }

    return filtered.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
  }

  const activities = getAllActivities()

  const getActivityIcon = (type) => {
    switch (type) {
      case 'workout': return <Dumbbell size={16} className="text-green-500" />
      case 'skate': return <Search size={16} className="text-blue-500" />
      case 'journal': return <BookOpen size={16} className="text-purple-500" />
      case 'number': return <Flame size={16} className="text-orange-500" />
      case 'goal': return <Target size={16} className="text-blue-500" />
      case 'metric': return <Flame size={16} className="text-green-500" />
      default: return null
    }
  }

  const getActivityDetails = (activity) => {
    switch (activity.type) {
      case 'workout':
        return `Difficulty: ${activity.difficulty || 'N/A'} | ${activity.exercises?.length || 0} exercises`
      case 'skate':
        return `Duration: ${activity.duration || 'N/A'} min | Performance: ${activity.performance || 'N/A'}/10`
      case 'journal':
        return activity.content?.substring(0, 50) + (activity.content?.length > 50 ? '...' : '') || 'No content'
      case 'number':
        return `Value: ${activity.value}`
      case 'goal':
        return `Type: ${activity.type || 'N/A'} | Progress: ${activity.currentValue || 0}/${activity.target || 0}`
      case 'metric':
        return `Progress: ${activity.currentValue || 0}/${activity.target || 0} (${activity.target > 0 ? Math.round((activity.currentValue / activity.target) * 100) : 0}%)`
      default:
        return ''
    }
  }

  const getActivityDate = (activity) => {
    if (activity.localDate) return activity.localDate
    const dateField = activity.date || activity.createdAt
    if (!dateField) return 'No date'
    try {
      return new Date(dateField).toLocaleDateString()
    } catch {
      return 'Invalid date'
    }
  }

  return (
    <div className="space-y-6">
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Activity History</h2>
        
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className={`block text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>Filter by Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`w-full px-3 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-lg focus:outline-none focus:border-blue-500`}
            >
              <option value="all">All Activities</option>
              <option value="workout">Workouts</option>
              <option value="skate">Skates</option>
              <option value="journal">Journal</option>
              <option value="number">Numbers</option>
              <option value="goal">Goals</option>
              <option value="metric">Metrics</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className={`block text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>Time Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className={`w-full px-3 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border rounded-lg focus:outline-none focus:border-blue-500`}
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{activity.name}</h3>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
                      {getActivityDetails(activity)}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'} mt-2`}>
                      {getActivityDate(activity)}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${
                  activity.type === 'workout' ? 'bg-green-100 text-green-700' :
                  activity.type === 'skate' ? 'bg-blue-100 text-blue-700' :
                  activity.type === 'journal' ? 'bg-purple-100 text-purple-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {activity.type}
                </span>
              </div>
            </div>
          ))}
          
          {activities.length === 0 && (
            <p className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              No activities found for the selected filters
            </p>
          )}
        </div>
      </div>

      {/* Action History */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Action History</h2>
        <div className="space-y-3">
          {data.actionHistory && data.actionHistory.length > 0 ? (
            data.actionHistory.map((action) => (
              <div key={action.id} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
                <div className="flex items-center gap-3 flex-1">
                  <div className={`px-2 py-1 text-xs font-medium rounded ${
                    action.action === 'added' ? 'bg-green-100 text-green-700' :
                    action.action === 'deleted' ? 'bg-red-100 text-red-700' :
                    action.action === 'updated' ? 'bg-blue-100 text-blue-700' :
                    action.action === 'restored' ? 'bg-purple-100 text-purple-700' :
                    action.action === 'completed' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {action.action}
                  </div>
                  <div className="flex-1">
                    <span className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>
                      {action.itemName}
                    </span>
                    <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} ml-2`}>
                      ({action.itemType})
                    </span>
                    {action.details?.change && (
                      <span className={`text-xs font-semibold ml-2 ${
                        action.details.changeType === 'increased' ? 'text-green-500' :
                        action.details.changeType === 'decreased' ? 'text-red-500' :
                        'text-slate-500'
                      }`}>
                        {action.details.change}
                      </span>
                    )}
                    {action.details?.previousValue !== undefined && (
                      <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} ml-2`}>
                        (was {action.details.previousValue})
                      </span>
                    )}
                    {action.details?.changes && (
                      <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} ml-2`}>
                        ({action.details.changes})
                      </span>
                    )}
                  </div>
                </div>
                <span className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} text-xs`}>
                  {action.localDate}
                </span>
              </div>
            ))
          ) : (
            <p className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No action history yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

function GoalSetterView({ targets, targetHistory, onAdd, onUpdate, onDelete, onDeleteFromHistory, onMoveToHistory, onEdit, onEditFromHistory, onTogglePin, darkMode }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('written')
  const [targetValue, setTargetValue] = useState('')
  const [currentProgress, setCurrentProgress] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editDescription, setEditDescription] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [editTargetValue, setEditTargetValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (description.trim()) {
      onAdd(description, category, parseFloat(targetValue) || null, parseFloat(currentProgress) || 0, pinned)
      setDescription('')
      setCategory('written')
      setTargetValue('')
      setCurrentProgress(0)
      setPinned(false)
      setShowAddForm(false)
    }
  }

  const handleEdit = (target) => {
    setEditingId(target.id)
    setEditDescription(target.description)
    setEditCategory(target.category)
    setEditTargetValue(target.targetValue?.toString() || '')
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (editingId && editDescription.trim()) {
      onEdit(editingId, editDescription, editCategory, parseFloat(editTargetValue) || null)
      setEditingId(null)
      setEditDescription('')
      setEditCategory('')
      setEditTargetValue('')
    }
  }

  const handleComplete = (target, completionStatus = 'completed') => {
    if (confirm(`Mark "${target.description}" as ${completionStatus}?`)) {
      onMoveToHistory(target.id, completionStatus)
    }
  }

  const getProgressPercentage = (target) => {
    if (!target.targetValue || target.targetValue === 0) return 0
    return Math.min((target.currentProgress / target.targetValue) * 100, 100)
  }

  const activeTargets = targets.filter(t => !t.completionStatus)
  const pinnedTargets = activeTargets.filter(t => t.pinned)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Goal Setter</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          New Target
        </button>
      </div>

      {showAddForm && (
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Create New Target</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-1`}>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What do you want to achieve?"
                className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-1`}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded-lg focus:outline-none focus:border-blue-500`}
              >
                <option value="written">Written Goal</option>
                <option value="target">Numeric Target</option>
                <option value="habit">Habit</option>
                <option value="milestone">Milestone</option>
              </select>
            </div>
            {(category === 'target' || category === 'habit') && (
              <div>
                <label className={`block text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-1`}>Target Value</label>
                <input
                  type="number"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  placeholder="e.g., 100, 30, 5"
                  className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
                />
              </div>
            )}
            {(category === 'target' || category === 'habit') && (
              <div>
                <label className={`block text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-1`}>Current Progress</label>
                <input
                  type="number"
                  value={currentProgress}
                  onChange={(e) => setCurrentProgress(e.target.value)}
                  placeholder="Starting value"
                  className={`w-full px-4 py-2 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-lg focus:outline-none focus:border-blue-500`}
                />
              </div>
            )}
            <div className="flex gap-4">
              <label className={`flex items-center gap-2 cursor-pointer ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                <input
                  type="checkbox"
                  checked={pinned}
                  onChange={(e) => setPinned(e.target.checked)}
                  className="w-4 h-4"
                />
                Pinned
              </label>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Target
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className={`px-4 py-2 ${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} rounded-lg transition-colors`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pinned Targets */}
      {pinnedTargets.length > 0 && (
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center gap-2`}>
            <Flame size={20} className="text-orange-500" />
            Pinned Targets
          </h3>
          <div className="space-y-3">
            {pinnedTargets.map((target) => (
              <div key={target.id} className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    {editingId === target.id ? (
                      <input
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className={`w-full px-2 py-1 text-sm ${darkMode ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded focus:outline-none focus:border-blue-500`}
                      />
                    ) : (
                      <span className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>{target.description}</span>
                    )}
                    <span className={`text-xs ml-2 px-2 py-1 rounded ${darkMode ? 'bg-slate-600 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>
                      {target.category}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {editingId === target.id ? (
                      <>
                        <button onClick={handleEditSubmit} className="p-1 text-green-500 hover:bg-green-500/10 rounded">
                          <Check size={16} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-1 text-red-500 hover:bg-red-500/10 rounded">
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(target)} className="p-1 text-slate-500 hover:bg-slate-500/10 rounded">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => onTogglePin(target.id)} className={`text-xs px-2 py-1 ${target.pinned ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'} rounded transition-colors`}>
                          {target.pinned ? 'Pinned' : 'Pin to Dashboard'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {target.targetValue && (
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Progress</span>
                      <span className={`${darkMode ? 'text-white' : 'text-slate-900'}`}>{target.currentProgress} / {target.targetValue}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${getProgressPercentage(target)}%` }}
                      />
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => onUpdate(target.id, target.currentProgress + (target.targetValue ? target.targetValue * 0.1 : 1))}
                    className={`text-xs px-2 py-1 ${darkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'} rounded transition-colors`}
                  >
                    +Progress
                  </button>
                  <button
                    onClick={() => handleComplete(target, 'completed')}
                    className={`text-xs px-2 py-1 ${darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-500 text-white hover:bg-green-600'} rounded transition-colors`}
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleComplete(target, 'abandoned')}
                    className={`text-xs px-2 py-1 ${darkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600'} rounded transition-colors`}
                  >
                    Abandon
                  </button>
                  <button
                    onClick={() => onDelete(target.id)}
                    className={`text-xs px-2 py-1 ${darkMode ? 'bg-slate-600 text-red-400 hover:bg-slate-500' : 'bg-slate-200 text-red-600 hover:bg-slate-300'} rounded transition-colors`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Other Targets */}
      {activeTargets.filter(t => !t.pinned).length > 0 && (
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>All Targets</h3>
          <div className="space-y-3">
            {activeTargets.filter(t => !t.pinned).map((target) => (
              <div key={target.id} className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <span className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>{target.description}</span>
                    <span className={`text-xs ml-2 px-2 py-1 rounded ${darkMode ? 'bg-slate-600 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>
                      {target.category}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(target)} className="p-1 text-slate-500 hover:bg-slate-500/10 rounded">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => onTogglePin(target.id)} className={`text-xs px-2 py-1 ${target.pinned ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'} rounded transition-colors`}>
                      {target.pinned ? 'Pinned' : 'Pin to Dashboard'}
                    </button>
                  </div>
                </div>
                {target.targetValue && (
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Progress</span>
                      <span className={`${darkMode ? 'text-white' : 'text-slate-900'}`}>{target.currentProgress} / {target.targetValue}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-slate-500 h-2 rounded-full transition-all"
                        style={{ width: `${getProgressPercentage(target)}%` }}
                      />
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => onUpdate(target.id, target.currentProgress + (target.targetValue ? target.targetValue * 0.1 : 1))}
                    className={`text-xs px-2 py-1 ${darkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'} rounded transition-colors`}
                  >
                    +Progress
                  </button>
                  <button
                    onClick={() => handleComplete(target, 'completed')}
                    className={`text-xs px-2 py-1 ${darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-500 text-white hover:bg-green-600'} rounded transition-colors`}
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => onDelete(target.id)}
                    className={`text-xs px-2 py-1 ${darkMode ? 'bg-slate-600 text-red-400 hover:bg-slate-500' : 'bg-slate-200 text-red-600 hover:bg-slate-300'} rounded transition-colors`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Target History */}
      {targetHistory.length > 0 && (
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Target History</h3>
          <div className="space-y-3">
            {targetHistory.map((target) => (
              <div key={target.id} className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className={`${darkMode ? 'text-white' : 'text-slate-900'} font-medium`}>{target.description}</span>
                    <span className={`text-xs ml-2 px-2 py-1 rounded ${
                      target.completionStatus === 'completed' ? 'bg-green-500/20 text-green-500' :
                      target.completionStatus === 'abandoned' ? 'bg-red-500/20 text-red-500' :
                      'bg-slate-500/20 text-slate-500'
                    }`}>
                      {target.completionStatus || 'completed'}
                    </span>
                  </div>
                  <button
                    onClick={() => onDeleteFromHistory(target.id)}
                    className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                {target.targetValue && (
                  <div className="text-sm">
                    <span className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Final Progress: </span>
                    <span className={`${darkMode ? 'text-white' : 'text-slate-900'}`}>{target.currentProgress} / {target.targetValue}</span>
                  </div>
                )}
                <div className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
                  Completed: {target.completedAt ? new Date(target.completedAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTargets.length === 0 && targetHistory.length === 0 && (
        <div className={`text-center py-12 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          <Target size={48} className="mx-auto mb-4 opacity-50" />
          <p>No targets yet. Create your first target to get started!</p>
        </div>
      )}
    </div>
  )
}

function QuotesView({ data, onAdd, onDelete, onReset, darkMode }) {
  const [newQuote, setNewQuote] = useState('')
  const [generatedQuote, setGeneratedQuote] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newQuote.trim()) {
      onAdd(newQuote.trim())
      setNewQuote('')
    }
  }

  const generateRandomQuote = () => {
    const quotes = data.quotes && data.quotes.length > 0 ? data.quotes : defaultQuotes.map((text, index) => ({ id: index, text }))
    if (quotes.length > 0) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
      setGeneratedQuote(randomQuote.text)
    }
  }

  const quotes = data.quotes && data.quotes.length > 0 ? data.quotes : []

  return (
    <div className="space-y-6">
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Generate Quote</h2>
          <button
            onClick={generateRandomQuote}
            className={`px-4 py-2 ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'} rounded-lg transition-colors`}
          >
            Generate
          </button>
        </div>
        {generatedQuote && (
          <div className={`text-center py-6 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg mb-4`}>
            <p className={`text-xl italic ${darkMode ? 'text-white' : 'text-slate-900'}`}>"{generatedQuote}"</p>
          </div>
        )}
      </div>

      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Add New Quote</h2>
          <button
            onClick={onReset}
            className={`text-sm px-3 py-1 ${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'} rounded transition-colors`}
          >
            Reset to Default
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              placeholder="Enter a motivational quote..."
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} focus:outline-none focus:border-blue-500`}
              rows={3}
            />
          </div>
          <button
            type="submit"
            className={`px-4 py-2 ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'} rounded-lg transition-colors`}
          >
            Add Quote
          </button>
        </form>
      </div>

      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-6`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>
          Your Quotes ({quotes.length})
        </h2>
        {quotes.length > 0 ? (
          <div className="space-y-3">
            {quotes.map((quote) => (
              <div key={quote.id} className={`p-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'} rounded-lg flex items-start justify-between`}>
                <p className={`${darkMode ? 'text-white' : 'text-slate-900'} flex-1`}>{quote.text}</p>
                <button
                  onClick={() => onDelete(quote.id)}
                  className="ml-4 p-1 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-12 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <p>No custom quotes yet. Add your first quote above!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
