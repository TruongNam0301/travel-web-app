import { useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { Controller } from 'react-hook-form'
import {
  Button,
  Callout,
  Checkbox,
  Dialog,
  Flex,
  Heading,
  IconButton,
  Text,
} from '@radix-ui/themes'
import {
  Root as TextFieldRoot,
  Slot as TextFieldSlot,
} from '@radix-ui/themes/components/text-field'
import {
  EnvelopeClosedIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  LockClosedIcon,
} from '@radix-ui/react-icons'
import { AuthLayout, AuthPanel, AuthTabs } from '../auth'
import { useLogin } from './login.hook'

export function LoginView() {
  const [showPassword, setShowPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const {
    registerField,
    control,
    errors,
    isSubmitting,
    onSubmit,
    submitForgotPassword,
    isSubmittingForgotPassword,
    forgotPasswordError,
  } = useLogin()

  return (
    <AuthLayout
      hero={
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="2">
            <Heading size="8" weight="medium">
              Plan your perfect getaway
            </Heading>
            <Text size="4" style={{ maxWidth: 360 }}>
              Access curated destinations, smart itineraries, and real-time
              alerts for a seamless travel experience.
            </Text>
          </Flex>

          <Flex direction="column" gap="4">
            <Flex direction="column" gap="1">
              <Text size="5" weight="medium">
                5k+
              </Text>
              <Text size="3" color="gray">
                trips planned with Travelly
              </Text>
            </Flex>
            <Flex direction="column" gap="1">
              <Text size="5" weight="medium">
                98%
              </Text>
              <Text size="3" color="gray">
                customer satisfaction score
              </Text>
            </Flex>
          </Flex>
        </Flex>
      }
    >
      <AuthPanel
        title="Welcome back"
        description="Log in to manage your journeys, save favorites, and monitor your upcoming adventures."
        footer={
          <Text size="3" align="center">
            Don&apos;t have an account?{' '}
            <Link to="/register">Create one now</Link>
          </Text>
        }
      >
        <AuthTabs active="login">
          <form onSubmit={onSubmit}>
            <Flex direction="column" gap="5">
              <Flex direction="column" gap="2">
                <Text as="label" htmlFor="email" weight="medium">
                  Email
                </Text>

                <TextFieldRoot
                  id="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...registerField('email')}
                >
                  <TextFieldSlot>
                    <EnvelopeClosedIcon />
                  </TextFieldSlot>
                </TextFieldRoot>

                {errors.email ? (
                  <Callout.Root color="red" variant="soft">
                    <Callout.Text>{errors.email.message}</Callout.Text>
                  </Callout.Root>
                ) : null}
              </Flex>

              <Flex direction="column" gap="2">
                <Text as="label" htmlFor="password" weight="medium">
                  Password
                </Text>

                <TextFieldRoot
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...registerField('password')}
                >
                  <TextFieldSlot>
                    <LockClosedIcon />
                  </TextFieldSlot>
                  <TextFieldSlot side="right">
                    <IconButton
                      type="button"
                      size="2"
                      variant="ghost"
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{ cursor: 'pointer' }}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                    </IconButton>
                  </TextFieldSlot>
                </TextFieldRoot>

                {errors.password ? (
                  <Callout.Root color="red" variant="soft">
                    <Callout.Text>{errors.password.message}</Callout.Text>
                  </Callout.Root>
                ) : null}
              </Flex>

              <Flex align="center" justify="between">
                <Controller
                  control={control}
                  name="rememberMe"
                  render={({ field }) => (
                    <Flex align="center" gap="2">
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                      />
                      <Text
                        as="label"
                        htmlFor="rememberMe"
                        size="2"
                        style={{ cursor: 'pointer' }}
                      >
                        Remember me
                      </Text>
                    </Flex>
                  )}
                />

                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button variant="ghost" size="2" type="button">
                      Forgot password?
                    </Button>
                  </Dialog.Trigger>

                  <Dialog.Content size="3" style={{ maxWidth: 420 }}>
                    <Dialog.Title>Reset your password</Dialog.Title>
                    <Dialog.Description>
                      Enter your email address and we&apos;ll send you a reset
                      link.
                    </Dialog.Description>

                    {forgotPasswordError ? (
                      <Callout.Root color="red" variant="soft">
                        <Callout.Text>{forgotPasswordError}</Callout.Text>
                      </Callout.Root>
                    ) : null}

                    <Flex direction="column" gap="3" mt="4">
                      <TextFieldRoot
                        id="forgot-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={forgotEmail}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          setForgotEmail(event.target.value)
                        }
                      >
                        <TextFieldSlot>
                          <EnvelopeClosedIcon />
                        </TextFieldSlot>
                      </TextFieldRoot>

                      <Flex gap="3" justify="end">
                        <Dialog.Close>
                          <Button variant="soft" color="gray" type="button">
                            Cancel
                          </Button>
                        </Dialog.Close>
                        <Button
                          type="button"
                          onClick={async () => {
                            const success =
                              await submitForgotPassword(forgotEmail)
                            if (success) {
                              setForgotEmail('')
                            }
                          }}
                          loading={isSubmittingForgotPassword}
                          disabled={!forgotEmail}
                        >
                          Send reset link
                        </Button>
                      </Flex>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
              </Flex>

              <Button
                size="3"
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </Flex>
          </form>
        </AuthTabs>
      </AuthPanel>
    </AuthLayout>
  )
}
