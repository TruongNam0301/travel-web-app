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
  PersonIcon,
} from '@radix-ui/react-icons'
import { useRegister } from './register.hook'

export function RegisterView() {
  const [showPassword, setShowPassword] = useState(false)
  const { registerField, control, errors, isSubmitting, onSubmit } =
    useRegister()

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
            <Heading size="7">Create your account</Heading>
            <Text color="gray">Sign up to get started</Text>
          </Flex>

          <form onSubmit={onSubmit}>
            <Flex direction="column" gap="5">
              <Flex direction="column" gap="2">
                <Text as="label" htmlFor="name" weight="medium">
                  Full name
                </Text>

                <TextFieldRoot
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  {...registerField('name')}
                >
                  <TextFieldSlot>
                    <PersonIcon />
                  </TextFieldSlot>
                </TextFieldRoot>

                {errors.name ? (
                  <Callout.Root color="red" variant="soft">
                    <Callout.Text>{errors.name.message}</Callout.Text>
                  </Callout.Root>
                ) : null}
              </Flex>

              <Flex direction="column" gap="2">
                <Text as="label" htmlFor="email" weight="medium">
                  Email
                </Text>

                <TextFieldRoot
                  id="email"
                  type="email"
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
                  autoComplete="new-password"
                  placeholder="Create a strong password"
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

              <Controller
                control={control}
                name="acceptTerms"
                rules={{
                  validate: (value) =>
                    value || 'You must accept the terms to continue.',
                }}
                render={({ field }) => (
                  <Flex direction="column" gap="2">
                    <Flex align="start" gap="3">
                      <Checkbox
                        id="acceptTerms"
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                      />
                      <Text size="2" as="label" htmlFor="acceptTerms" style={{ cursor: 'pointer' }}>
                        I agree to the Terms of Service and privacy policy
                      </Text>
                    </Flex>

                    {errors.acceptTerms ? (
                      <Callout.Root color="red" variant="soft">
                        <Callout.Text>
                          {errors.acceptTerms.message}
                        </Callout.Text>
                      </Callout.Root>
                    ) : null}
                  </Flex>
                )}
              />

              <Button
                size="3"
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>
            </Flex>
          </form>

          <Flex direction="column" gap="3">
            <div />
            <Text size="3" align="center">
              Already have an account? <Link to="/login">Log in</Link>
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}
