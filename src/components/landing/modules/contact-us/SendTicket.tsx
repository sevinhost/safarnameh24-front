'use client';

import { TopBarConfig } from '../../shared';
import { sendTicket as formSchema } from '@/schema';
import SendTicketReaction from './molecules/SendTicketReaction';

import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { generalInstance } from '@/utils/services';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

type ReactionType = 'success' | 'fail';
type FormStates = 'title' | 'full_name' | 'phone_number' | 'email' | 'text';

type Form = {
  email: string;
  title: string;
  text: string;
  full_name: string;
  phone_number: string;
};

// -----------------------------------------

export function SendTicket() {
  const [reactionOpen, setReactionOpen] = useState(false);
  const [reactionType, setReactionType] = useState<ReactionType>('success');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      title: '',
      email: '',
      full_name: '',
      phone_number: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (values: Form) => {
      return generalInstance({
        data: values,
        method: 'POST',
        url: '/contact/message/',
      });
    },
    onError: () => handleSetReaction('fail', true),
    onSuccess: () => {
      handleSetReaction('success', true);
      form.reset();
    },
  });

  function handleSetError(state: FormStates) {
    const errors = form.formState.errors;
    return errors[state] ? 'ring-red-400' : '';
  }

  function handleSetReaction(type: 'success' | 'fail', isOpen: boolean) {
    setReactionType(type);
    setReactionOpen(isOpen);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <div>
      <TopBarConfig
        title={{ type: 'single', text: 'تماس با شبکه سفرنامه 24' }}
        subtitle="دوست داریم نظرات و پیشنهادات شما را بشنویم پیام هایتان را با ما در میان بذارید."
      />

      <SendTicketReaction
        isOpen={reactionOpen}
        setOpen={setReactionOpen}
        reactionType={reactionType}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 lg:grid-cols-[1fr_2fr]"
        >
          <div className="space-y-4">
            {/* =============== Subject */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className={`pl-28 ${handleSetError('title')}`}
                        placeholder="* موضوع مورد نظر را وارد نمایید"
                      />

                      <div className="flex-center absolute left-4 top-1/2 h-7 -translate-y-1/2 gap-1 rounded-md bg-zinc-100 px-3 pt-0.5 text-cs07 font-extrabold text-zinc-500">
                        <span className="w-3 text-center">
                          {35 - form.getValues('title').length >= 0
                            ? 35 - form.getValues('title').length
                            : 0}
                        </span>
                        <span>کاراکتر</span>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* =============== FullName */}
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className={handleSetError('full_name')}
                      placeholder="* نام و نام خانوادگی خود را وارد نمایید"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* =============== PhoneNumber */}
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className={handleSetError('phone_number')}
                      placeholder="* شماره همراه خود را وارد نمایید"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* =============== Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="* ایمیل خود را وارد نمایید"
                      className={handleSetError('email')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* =============== Description */}
          <FormField
            name="text"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="* توضیحات خود را وارد نمایید ..."
                    className={`h-full resize-none ${handleSetError('text')}`}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit-Button */}
          <Button type="submit" className="w-28">
            {mutation.isPending ? (
              <span className="loader-dots" />
            ) : (
              <span>ارسال پیام</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
