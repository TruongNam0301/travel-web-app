import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { CalendarIcon, ClockIcon } from '@radix-ui/react-icons'
import { DayPicker } from 'react-day-picker'
import dayjs from 'dayjs'
import 'react-day-picker/dist/style.css'
import type { DateTimePickerProps } from './datetime-picker.props'

export const DateTimePicker = ({
  value,
  onChange,
  placeholder = 'Select datetime',
  disabled = false,
  className = '',
}: DateTimePickerProps) => {
  const [open, setOpen] = useState(false)

  // Convert ISO → Date object
  const dateValue = value ? dayjs(value).toDate() : null

  // Local time state
  const timeString = value ? dayjs(value).format('HH:mm') : ''

  const handleSelectDay = (day: Date | undefined) => {
    if (!day) return

    const base = dayjs(day)

    if (timeString) {
      const [h, m] = timeString.split(':').map(Number)
      const merged = base.hour(h).minute(m).second(0)
      onChange?.(merged.toISOString())
    } else {
      onChange?.(base.toISOString())
    }
  }

  const handleSelectTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value

    if (!dateValue) {
      // no date selected yet → set today
      const [h, m] = time.split(':').map(Number)
      const merged = dayjs().hour(h).minute(m).second(0)
      onChange?.(merged.toISOString())
      return
    }

    const base = dayjs(dateValue)
    const [h, m] = time.split(':').map(Number)
    const merged = base.hour(h).minute(m).second(0)
    onChange?.(merged.toISOString())
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={`flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm shadow-sm transition hover:bg-gray-50 disabled:opacity-50 ${className}`}
        >
          {value ? (
            <span>{dayjs(value).format('YYYY-MM-DD HH:mm')}</span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}

          <CalendarIcon className="h-4 w-4 text-gray-500" />
        </button>
      </Popover.Trigger>

      <Popover.Content
        sideOffset={8}
        className="z-50 rounded-md border bg-white p-3 shadow-md"
      >
        <div className="flex flex-col space-y-3">
          <DayPicker
            mode="single"
            selected={dateValue ?? undefined}
            onSelect={handleSelectDay}
            captionLayout="dropdown"
          />

          {/* Time Picker */}
          <div className="flex items-center gap-2 border-t pt-3">
            <ClockIcon className="h-4 w-4 text-gray-500" />
            <input
              type="time"
              value={timeString}
              onChange={handleSelectTime}
              className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}
