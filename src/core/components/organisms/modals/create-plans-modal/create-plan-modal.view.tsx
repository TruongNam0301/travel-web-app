import { BaseModal, DateTimePicker } from '@/core/components/atoms'
import { showErrorToast, showSuccessToast } from '@/core/helpers/toast.helper'
import { useCreatePlan } from '@/data/mutations/plan.mutation'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { CreatePlanModalProps } from './create-plan-modal.props'

type CreatePlanFormValues = {
  title: string
  startDate: string
  endDate: string
  description: string
}

const CreatePlanModalView = ({
  open,
  onClose,
  onOpen,
}: CreatePlanModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<CreatePlanFormValues>({
    defaultValues: {
      title: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  })

  const { mutateAsync: createPlan } = useCreatePlan()

  const startDateValue = watch('startDate')
  const endDateValue = watch('endDate')
  // Correct datetime validation using real Date objects
  const endDateValidation = useMemo(
    () => ({
      validate: (value: string) => {
        if (value && startDateValue) {
          const start = new Date(startDateValue)
          const end = new Date(value)

          if (end < start) {
            return 'End datetime must be after the start datetime'
          }
        }
        return true
      },
    }),
    [startDateValue]
  )

  const onSubmit = handleSubmit(async (values) => {
    const metadata: Record<string, unknown> = {}

    if (values.startDate) metadata.startDate = values.startDate
    if (values.endDate) metadata.endDate = values.endDate
    if (values.description.trim())
      metadata.description = values.description.trim()

    try {
      await createPlan({
        title: values.title.trim(),
        ...(Object.keys(metadata).length ? { metadata } : {}),
      })

      showSuccessToast('Plan created successfully')
      reset()
      onClose?.()
    } catch (error) {
      showErrorToast(
        error instanceof Error ? error.message : 'Failed to create plan'
      )
    }
  })

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpen}
      title="Create Plan"
      description="Fill in the details below"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Title */}
        <Flex direction="column" gap="2">
          <Text as="label" htmlFor="plan-title" weight="medium">
            Title
          </Text>
          <TextField.Root
            id="plan-title"
            placeholder="Enter plan title"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && (
            <Text size="2" color="red">
              {errors.title.message}
            </Text>
          )}
        </Flex>

        {/* Start Datetime */}
        <Flex direction="column" gap="2">
          <Text as="label" htmlFor="plan-start-date" weight="medium">
            Start Date & Time
          </Text>
          <Controller
            name="startDate"
            control={control}
            rules={{
              validate: (value) => {
                if (value && endDateValue) {
                  const start = new Date(value)
                  const end = new Date(endDateValue)
                  if (start > end) {
                    return 'Start datetime must be before the end datetime'
                  }
                }
                return true
              },
            }}
            render={({ field }) => (
              <DateTimePicker
                placeholder="Select start datetime"
                value={field.value || null}
                onChange={(value) => field.onChange(value || '')}
              />
            )}
          />
          {errors.startDate && (
            <Text size="2" color="red">
              {errors.startDate.message}
            </Text>
          )}
        </Flex>

        {/* End Datetime */}
        <Flex direction="column" gap="2">
          <Text as="label" htmlFor="plan-end-date" weight="medium">
            End Date & Time
          </Text>
          <Controller
            name="endDate"
            control={control}
            rules={endDateValidation}
            render={({ field }) => (
              <DateTimePicker
                placeholder="Select end datetime"
                value={field.value || null}
                onChange={(value) => field.onChange(value || '')}
              />
            )}
          />
          {errors.endDate && (
            <Text size="2" color="red">
              {errors.endDate.message}
            </Text>
          )}
        </Flex>

        {/* Description */}
        <Flex direction="column" gap="2">
          <Text as="label" htmlFor="plan-description" weight="medium">
            Description
          </Text>
          <textarea
            id="plan-description"
            placeholder="Add additional context for this plan"
            rows={4}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            {...register('description', {
              maxLength: {
                value: 500,
                message: 'Description must be 500 characters or less',
              },
            })}
          />
          {errors.description && (
            <Text size="2" color="red">
              {errors.description.message}
            </Text>
          )}
        </Flex>

        <Flex gap="3" justify="end" className="mt-4">
          <Button variant="soft" color="gray" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </Flex>
      </form>
    </BaseModal>
  )
}

export default CreatePlanModalView
