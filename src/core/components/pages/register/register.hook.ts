import { showErrorToast, showSuccessToast } from '@/core/helpers/toast.helper'
import { useAuthStore } from '@/core/stores'
import { register as registerRequest } from '@/data'
import { TokenManager } from '@/package/storage'
import type { RegisterOptions } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface RegisterFormValues {
  name: string
  email: string
  password: string
  acceptTerms: boolean
}

export function useRegister() {
  const navigate = useNavigate()
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const { setUser } = useAuthStore()
  const validationRules: Record<
    Extract<keyof RegisterFormValues, 'name' | 'email' | 'password'>,
    RegisterOptions<RegisterFormValues>
  > = {
    name: {
      required: 'Name is required',
      minLength: {
        value: 2,
        message: 'Name must be at least 2 characters',
      },
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: emailPattern,
        message: 'Enter a valid email address',
      },
    },
    password: {
      required: 'Password is required',
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters',
      },
    },
  }

  const {
    register: registerField,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      acceptTerms: false,
    },
    mode: 'onSubmit',
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      const authResponse = await registerRequest({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      })

      // Save tokens
      TokenManager.saveTokens(
        authResponse.accessToken,
        authResponse.refreshToken
      )

      setUser(authResponse.user)

      showSuccessToast('Account created! Welcome aboard.')
      reset({
        name: '',
        email: '',
        password: '',
        acceptTerms: false,
      })
      navigate('/plans', { replace: true })
    } catch (error) {
      showErrorToast(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    }
  })

  const registerFieldWithRules = <TField extends 'name' | 'email' | 'password'>(
    field: TField
  ) =>
    registerField(
      field,
      validationRules[field] as RegisterOptions<RegisterFormValues, TField>
    )

  return {
    registerField: registerFieldWithRules,
    control,
    errors,
    isSubmitting,
    onSubmit,
  }
}
