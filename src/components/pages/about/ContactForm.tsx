'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { contactApis } from '@/services/apis/contactApis';
import { ApiRequestError } from '@/services/utils/apiHelper';
import { contactMessageSchema, type ContactFormValues } from '@/shared';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const EMPTY_MESSAGE: ContactFormValues = {
  name: '',
  email: '',
  message: '',
  website: '',
};

function ContactForm() {
  const [isSent, setIsSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: EMPTY_MESSAGE,
    // Same limits the API enforces, so a valid form never comes back as a 422.
    resolver: zodResolver(contactMessageSchema),
  });

  async function handleSend(values: ContactFormValues) {
    setIsSent(false);
    setSendError(null);

    try {
      await contactApis.sendMessage(values);
      reset(EMPTY_MESSAGE);
      setIsSent(true);
    } catch (error) {
      if (error instanceof ApiRequestError) {
        // A 422 names the fields it rejected; anything else is a whole-form
        // problem the visitor cannot fix by editing one input.
        const issues = error.fieldIssues.filter(
          (
            issue,
          ): issue is { field: keyof ContactFormValues; message: string } =>
            issue.field in EMPTY_MESSAGE,
        );

        issues.forEach((issue) =>
          setError(issue.field, { message: issue.message }),
        );

        if (issues.length > 0) return;
      }

      setSendError(
        error instanceof Error
          ? error.message
          : 'Could not send your message right now.',
      );
    }
  }

  return (
    <form
      className="mt-5 grid max-w-xl gap-5"
      onSubmit={handleSubmit(handleSend)}
      noValidate
    >
      <Field>
        <FieldLabel htmlFor="contactName">Your name</FieldLabel>
        <Input
          id="contactName"
          placeholder="Who is writing?"
          aria-invalid={Boolean(errors.name)}
          {...register('name')}
        />
        <FieldError errors={[errors.name]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="contactEmail">Your email</FieldLabel>
        <Input
          id="contactEmail"
          type="email"
          placeholder="So I can reply"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        <FieldError errors={[errors.email]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="contactMessage">Message</FieldLabel>
        <Textarea
          id="contactMessage"
          rows={7}
          placeholder="What would you like to talk about?"
          aria-invalid={Boolean(errors.message)}
          {...register('message')}
        />
        <FieldError errors={[errors.message]} />
      </Field>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <input
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register('website')}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send message'}
      </Button>

      {isSent && (
        <p className="text-sm text-primary" role="status">
          Thanks — your message is on its way. I will reply by email.
        </p>
      )}
      {sendError && (
        <p className="text-sm text-destructive" role="alert">
          {sendError}
        </p>
      )}
    </form>
  );
}

export default ContactForm;
