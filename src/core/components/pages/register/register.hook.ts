import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import type { RegisterOptions } from 'react-hook-form'
import { register as registerRequest } from '@/data'
import { tokenManager } from '@/package/storage'
import { getErrorMessage } from '@/package/http'
import { showErrorToast, showSuccessToast } from '@/core/helpers/toast.helper'

interface RegisterFormValues {
  name: string
  email: string
  password: string
  acceptTerms: boolean
}

export function useRegister() {
  const navigate = useNavigate()
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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
    mode: 'onTouched',
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      const authResponse = await registerRequest({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      })

      tokenManager.setTokens(
        authResponse.accessToken,
        authResponse.refreshToken
      )
      showSuccessToast('Account created! Welcome aboard.')
      reset({
        name: '',
        email: '',
        password: '',
        acceptTerms: false,
      })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      showErrorToast(getErrorMessage(error))
    }
  })

  const registerFieldWithRules = <
    TField extends 'name' | 'email' | 'password',
  >(
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
