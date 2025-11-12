import { useState } from 'react'
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
  PersonIcon,
} from '@radix-ui/react-icons'
import { AuthLayout, AuthPanel, AuthTabs } from '../auth'
import { useRegister } from './register.hook'

export function RegisterView() {
  const [showPassword, setShowPassword] = useState(false)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const { registerField, control, errors, isSubmitting, onSubmit } =
    useRegister()
  const termsDialogContent = (
    <>
      <Text size="3">
        We value your privacy. By creating an account, you consent to our use of
        your data to enhance your travel planning experience.
      </Text>
      <Text size="2" color="gray">
        Highlights:
      </Text>
      <ul style={{ margin: 0, paddingInlineStart: '1.2rem' }}>
        <li>
          <Text size="2">
            We never sell personal data and only share with trusted partners
            when needed for bookings.
          </Text>
        </li>
        <li>
          <Text size="2">
            You can export or delete your data anytime from your account
            settings.
          </Text>
        </li>
        <li>
          <Text size="2">
            We use analytics to improve recommendations while keeping your data
            anonymized.
          </Text>
        </li>
      </ul>
      <Text size="2" color="gray">
        Full details are available on our website. Reach out to support if you
        have any concerns.
      </Text>
    </>
  )

  return (
    <AuthLayout
      hero={
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="2">
            <Heading size="8" weight="medium">
              Join an inspired community
            </Heading>
            <Text size="4" style={{ maxWidth: 360 }}>
              Discover personalized recommendations, collaborate on itineraries,
              and unlock exclusive member perks.
            </Text>
          </Flex>

          <Flex direction="column" gap="4">
            <Flex direction="column" gap="1">
              <Text size="5" weight="medium">
                1M+
              </Text>
              <Text size="3" color="gray">
                explorers trust Travelly
              </Text>
            </Flex>
            <Flex direction="column" gap="1">
              <Text size="5" weight="medium">
                120+
              </Text>
              <Text size="3" color="gray">
                curated city guides worldwide
              </Text>
            </Flex>
          </Flex>
        </Flex>
      }
    >
      <AuthPanel
        title="Create your account"
        description="Sign up to start planning epic adventures with real-time insights and collaborative tools."
        footer={
          <Text size="3" align="center">
            Already have an account? <Link to="/login">Log in</Link>
          </Text>
        }
      >
        <AuthTabs active="register">
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
                      <Text size="2">
                        I agree to the{' '}
                        <Dialog.Root
                          open={isTermsOpen}
                          onOpenChange={setIsTermsOpen}
                        >
                          <Dialog.Trigger>
                            <Button type="button" variant="ghost" size="1">
                              Terms of Service
                            </Button>
                          </Dialog.Trigger>
                          <Dialog.Content
                            size="3"
                            style={{ maxWidth: 520, maxHeight: '80vh' }}
                          >
                            <Dialog.Title>Terms &amp; Privacy</Dialog.Title>
                            <Dialog.Description>
                              Please review our latest terms before continuing.
                            </Dialog.Description>
                            <Flex
                              direction="column"
                              gap="4"
                              mt="4"
                              style={{ overflowY: 'auto' }}
                            >
                              {termsDialogContent}
                            </Flex>

                            <Flex justify="end" mt="5">
                              <Dialog.Close>
                                <Button variant="soft" color="gray">
                                  Close
                                </Button>
                              </Dialog.Close>
                            </Flex>
                          </Dialog.Content>
                        </Dialog.Root>{' '}
                        and privacy policy.
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
        </AuthTabs>
      </AuthPanel>
    </AuthLayout>
  )
}
