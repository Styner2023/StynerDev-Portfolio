import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

interface ActionItemsTabProps {
  clients: any[]
  selectedProjectForComm: any
  setSelectedProjectForComm: (project: any) => void
}

export default function ActionItemsTab({ clients, selectedProjectForComm, setSelectedProjectForComm }: ActionItemsTabProps) {
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false)
  const [quickActionType, setQuickActionType] = useState('')

  // Sample data - replace with real data from API
  const immediateActions = [
    { id: 1, title: 'Fix login bug', client: 'Acme Corp', priority: 'critical', dueDate: '2024-01-15', overdue: true },
    { id: 2, title: 'Client waiting for homepage approval', client: 'TechStart', priority: 'high', dueDate: '2024-01-16' },
  ]

  const thisWeekTasks = [
    { id: 3, title: 'Deploy staging environment', client: 'Acme Corp', priority: 'medium', dueDate: '2024-01-18' },
    { id: 4, title: 'Content update for blog', client: 'TechStart', priority: 'low', dueDate: '2024-01-20' },
  ]

  const upcomingTasks = [
    { id: 5, title: 'Q1 renewal reminder', client: 'Acme Corp', priority: 'medium', dueDate: '2024-02-01' },
    { id: 6, title: 'Feature planning meeting', client: 'TechStart', priority: 'low', dueDate: '2024-02-05' },
  ]

  const clientMetrics = [
    { client: 'Acme Corp', lastUpdate: 3, engagement: 85, pendingInvoices: 1, unreadMessages: 2 },
    { client: 'TechStart', lastUpdate: 7, engagement: 92, pendingInvoices: 0, unreadMessages: 0 },
  ]

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const TaskCard = ({ task, overdue = false }: any) => (
    <div className={`p-4 rounded-xl border-2 ${overdue ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'} dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-all`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
        <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${getPriorityColor(task.priority)}`}>
          {task.priority.toUpperCase()}
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <span className="material-icons" style={{ fontSize: '16px' }}>business</span>
          {task.client}
        </span>
        <span className="flex items-center gap-1">
          <span className="material-icons" style={{ fontSize: '16px' }}>calendar_today</span>
          {task.dueDate}
        </span>
      </div>
      {overdue && (
        <div className="mt-2 flex items-center gap-1 text-red-600 text-sm font-semibold">
          <span className="material-icons" style={{ fontSize: '16px' }}>warning</span>
          Overdue
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-8 mt-8">
      {/* Filters & Quick Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-3">
          <select 
            value={selectedPriority} 
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 dark:text-white font-medium"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 dark:text-white font-medium"
          >
            <option value="all">All Categories</option>
            <option value="feedback">Client Feedback Required</option>
            <option value="approval">Awaiting Approval</option>
            <option value="development">Development</option>
            <option value="bugs">Bug Fixes</option>
            <option value="features">Feature Requests</option>
            <option value="content">Content Updates</option>
          </select>
        </div>
        <button 
          onClick={() => { setIsQuickActionOpen(true); setQuickActionType('task'); }}
          className="px-6 py-2 bg-primary text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <span className="material-icons">add</span>
          Add Task
        </button>
      </div>

      {/* Immediate Actions */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="material-icons text-red-500 text-3xl">priority_high</span>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Immediate Actions</h3>
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">{immediateActions.length}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {immediateActions.map(task => <TaskCard key={task.id} task={task} overdue={task.overdue} />)}
        </div>
      </div>

      {/* This Week */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="material-icons text-blue-500 text-3xl">event</span>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">This Week</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">{thisWeekTasks.length}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {thisWeekTasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>

      {/* Upcoming */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="material-icons text-purple-500 text-3xl">schedule</span>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Upcoming</h3>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">{upcomingTasks.length}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingTasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>

      {/* Client Interaction Metrics */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="material-icons text-green-500 text-3xl">insights</span>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Client Interaction Metrics</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clientMetrics.map((metric, idx) => (
            <div key={idx} className="p-6 rounded-xl border-2 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{metric.client}</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Update</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.lastUpdate} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Engagement</p>
                  <p className="text-2xl font-bold text-green-600">{metric.engagement}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Invoices</p>
                  <p className="text-2xl font-bold text-orange-600">{metric.pendingInvoices}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Unread Messages</p>
                  <p className="text-2xl font-bold text-blue-600">{metric.unreadMessages}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Communications Card (Keep existing) */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="material-icons text-primary text-3xl">forum</span>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Project Communications</h3>
        </div>
        <div className="p-6 rounded-xl border-2 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-4">
            <span className="material-icons text-primary text-4xl">chat_bubble</span>
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Client Communication Hub</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manage all client conversations in one place</p>
            </div>
          </div>
          <select
            value={selectedProjectForComm?.id || ''}
            onChange={(e) => {
              const client = clients.find(c => c.id === e.target.value)
              setSelectedProjectForComm(client)
            }}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 dark:text-white font-medium"
          >
            <option value="">Select a client to communicate</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Actions Modal */}
      <Dialog.Root open={isQuickActionOpen} onOpenChange={setIsQuickActionOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md z-50">
            <div className="p-8">
              <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</Dialog.Title>
              <div className="space-y-3">
                <button className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-3">
                  <span className="material-icons text-primary">send</span>
                  <span className="font-semibold">Send Update to Client</span>
                </button>
                <button className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-3">
                  <span className="material-icons text-primary">check_circle</span>
                  <span className="font-semibold">Mark Task Complete</span>
                </button>
                <button className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-3">
                  <span className="material-icons text-primary">feedback</span>
                  <span className="font-semibold">Request Client Feedback</span>
                </button>
                <button className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-3">
                  <span className="material-icons text-primary">event</span>
                  <span className="font-semibold">Schedule Meeting</span>
                </button>
                <button className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-3">
                  <span className="material-icons text-primary">upload_file</span>
                  <span className="font-semibold">Upload Deliverable</span>
                </button>
              </div>
            </div>
            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <span className="material-icons">close</span>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
