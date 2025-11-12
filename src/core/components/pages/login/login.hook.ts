import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import type { RegisterOptions } from 'react-hook-form'
import { login as loginRequest } from '@/data'
import { tokenManager } from '@/package/storage'
import { getErrorMessage } from '@/package/http'
import { showErrorToast, showSuccessToast } from '@/core/helpers/toast.helper'

interface LocationState {
  from?: {
    pathname: string
  }
}

interface LoginFormValues {
  email: string
  password: string
  rememberMe: boolean
}

export function useLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as LocationState)?.from?.pathname || '/dashboard'
  const [isSubmittingForgotPassword, setIsSubmittingForgotPassword] =
    useState(false)
  const [forgotPasswordError, setForgotPasswordError] = useState<string | null>(
    null
  )

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const validationRules: Record<
    Extract<keyof LoginFormValues, 'email' | 'password'>,
    RegisterOptions<LoginFormValues>
  > = {
    email: {
      required: 'Email is required',
      pattern: {
        value: emailPattern,
        message: 'Enter a valid email address',
      },
    },
    password: {
      required: 'Password is required',
    },
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    mode: 'onTouched',
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      const authResponse = await loginRequest({
        email: values.email.trim(),
        password: values.password,
      })

      tokenManager.setTokens(
        authResponse.accessToken,
        authResponse.refreshToken
      )
      localStorage.setItem(
        'travelly.auth.rememberMe',
        values.rememberMe ? 'true' : 'false'
      )

      showSuccessToast('Logged in successfully!')
      reset({
        email: '',
        password: '',
        rememberMe: values.rememberMe,
      })
      navigate(from, { replace: true })
    } catch (error) {
      showErrorToast(getErrorMessage(error))
    }
  })

  const registerField = <TField extends 'email' | 'password'>(field: TField) =>
    register(
      field,
      validationRules[field] as RegisterOptions<LoginFormValues, TField>
    )

  const submitForgotPassword = async (email: string) => {
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setForgotPasswordError('Please enter your email address.')
      return false
    }

    if (!emailPattern.test(trimmedEmail)) {
      setForgotPasswordError('Enter a valid email address.')
      return false
    }

    setForgotPasswordError(null)
    setIsSubmittingForgotPassword(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 900))
      showSuccessToast('We just sent a reset link to your email.')
      return true
    } catch (error) {
      console.error('Forgot password request failed', error)
      setForgotPasswordError('Something went wrong. Please try again later.')
      return false
    } finally {
      setIsSubmittingForgotPassword(false)
    }
  }

  return {
    registerField,
    control,
    errors,
    isSubmitting,
    onSubmit,
    submitForgotPassword,
    isSubmittingForgotPassword,
    forgotPasswordError,
  }
}
