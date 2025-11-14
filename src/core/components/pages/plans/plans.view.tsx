import {
  CreatePlanModal,
  UpdatePlanModal,
} from '@/core/components/organisms/modals'
import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { useListPlans } from '@/data/queries/plan.query'
import type { Plan } from '@/data/entities/plan.entities'

const PlansView = () => {
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false)
  const [isUpdatePlanOpen, setIsUpdatePlanOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const { data: plans } = useListPlans()

  console.log(plans)

  return (
    <div className="flex flex-col size-full overflow-hidden">
      <div className="flex justify-between items-center border-b border-gray-700  p-4">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">Your Plans</p>
          <p className="text-sm text-green-600">
            Here you can see all your plans
          </p>
        </div>
        <Button
          color="green"
          className="bg-green-600 text-white cursor-pointer"
          onClick={() => setIsCreatePlanOpen(true)}
        >
          Create Plan
        </Button>
        <CreatePlanModal
          open={isCreatePlanOpen}
          onClose={() => setIsCreatePlanOpen(false)}
          onOpen={setIsCreatePlanOpen}
        />
      </div>
      <div className="flex flex-col size-full ">
        <div className="h-0 grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          <div className="p-4 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {plans?.data?.map((plan) => (
                <div
                  key={plan.id}
                  className="flex flex-col gap-2 "
                  onClick={() => {
                    setIsUpdatePlanOpen(true)
                    setSelectedPlan(plan)
                  }}
                >
                  <div className="w-full h-60">
                    <img
                      src={'src/assets/image/image-default.jpg'}
                      alt={plan.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-bold">{plan.title}</p>
                  <p className="text-sm text-gray-900">
                    {plan?.metadata?.description}
                  </p>
                  <p className="text-sm text-gray-900">
                    {plan?.metadata?.startDate}
                  </p>
                  <p className="text-sm text-gray-900">
                    {plan?.metadata?.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedPlan && (
        <UpdatePlanModal
          open={isUpdatePlanOpen}
          onClose={() => {
            setIsUpdatePlanOpen(false)
            setSelectedPlan(null)
          }}
          onOpen={setIsUpdatePlanOpen}
          plan={selectedPlan}
        />
      )}
    </div>
  )
}

export default PlansView
