'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';

import StartupFormField from './StartupFormField';
import { toast } from 'sonner';
import { createStartup } from '@/app/(root)/startup/actions';

export default function StartupForm() {
  // inout内リアルタイム更新用
  const [pitch, setPitch] = useState('');
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createStartup, {
    errors: {},
    globalError: '',
    status: 'INITIAL',
  });

  // global error toast
  useEffect(() => {
    if (state.globalError) {
      toast.error(state.globalError);
    }
  }, [state.globalError]);

  // success toast and redirect
  useEffect(() => {
    if (state.status === 'SUCCESS' && state.slug) {
      toast.success('Your startup pitch has been created successfully');
      router.push(`/startup/${state.slug}`);
    }
  }, [state.status, state.slug, router]);

  return (
    <form action={formAction} className='startup-form'>
      <StartupFormField id='title' label='Title' error={state.errors?.title}>
        <Input
          id='title'
          name='title'
          className='startup-form_input'
          required
          placeholder='Startup Title'
        />
      </StartupFormField>

      <StartupFormField
        id='description'
        label='Description'
        error={state.errors?.description}
      >
        <Textarea
          id='description'
          name='description'
          className='startup-form_textarea'
          required
          placeholder='Startup Description'
        />
      </StartupFormField>

      <StartupFormField
        id='category'
        label='Category'
        error={state.errors?.category}
      >
        <Input
          id='category'
          name='category'
          className='startup-form_input'
          required
          placeholder='Startup Category'
        />
      </StartupFormField>

      <StartupFormField id='link' label='Image URL' error={state.errors?.link}>
        <Input
          id='link'
          name='link'
          className='startup-form_input'
          required
          placeholder='Startup Image URL'
        />
      </StartupFormField>

      <StartupFormField
        id='pitch'
        label='Pitch'
        error={state.errors?.pitch}
        wrapperProps={{ 'data-color-mode': 'light' }}
      >
        <MDEditor
          value={pitch}
          onChange={value => setPitch(value ?? '')}
          id='pitch'
          preview='edit'
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden' }}
          textareaProps={{
            name: 'pitch',
            placeholder:
              'Briefly describe your idea and what problem it solves',
          }}
          previewOptions={{ disallowedElements: ['style'] }}
        />
      </StartupFormField>

      <Button
        type='submit'
        className='startup-form_btn text-white'
        disabled={isPending}
      >
        {isPending ? 'Submitting...' : 'Submit Your Pitch'}
        <Send className='size-6 ml-2' />
      </Button>
    </form>
  );
}
