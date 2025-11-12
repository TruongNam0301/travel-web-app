import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Controller } from 'react-hook-form'
import {
  Button,
  Callout,
  Card,
  Checkbox,
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
import { useLogin } from './login.hook'

export function LoginView() {
  const [showPassword, setShowPassword] = useState(false)
  const {
    registerField,
    control,
    errors,
    isSubmitting,
    onSubmit,
  } = useLogin()

  return (
    <Flex
      minHeight="100vh"
      align="center"
      justify="center"
      p="5"
      style={{
        background:
          'radial-gradient(circle at top left, hsl(210 80% 96%), transparent 60%), radial-gradient(circle at bottom right, hsl(160 80% 94%), transparent 55%)',
      }}
    >
      <Card
        size="4"
        style={{
          width: '100%',
          maxWidth: 480,
          boxShadow:
            '0 10px 30px hsl(250 50% 35% / 0.15), 0 2px 12px hsl(250 60% 45% / 0.12)',
        }}
      >
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="2">
            <Heading size="7">Welcome back</Heading>
            <Text color="gray">Log in to your account</Text>
          </Flex>

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

          <Flex direction="column" gap="3">
            <div />
            <Text size="3" align="center">
              Don&apos;t have an account?{' '}
              <Link to="/register">Sign up</Link>
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}
