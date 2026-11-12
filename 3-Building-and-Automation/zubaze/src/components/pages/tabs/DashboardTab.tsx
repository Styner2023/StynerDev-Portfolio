interface DashboardTabProps {
  clients: any[]
  tasks: any[]
  setTasks: (tasks: any[]) => void
  setIsAddTaskOpen: (open: boolean) => void
  setSelectedClient: (client: any) => void
  setIsClientDetailsOpen: (open: boolean) => void
}

export default function DashboardTab(props: DashboardTabProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="text-center py-12">
        <p className="text-gray-500">Dashboard tab content (extracted from main file)</p>
      </div>
    </div>
  )
}
