'use client';
import { TextField, Button, Box, Callout, Text, Spinner } from '@radix-ui/themes'
import dynamic from "next/dynamic";
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import z from 'zod';
import { issueSchema } from '../../validationSchemas';
import ErrorMessage from '@/app/components/ErrorMessage';
import { on } from 'events';

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({ resolver: zodResolver(issueSchema) });
  
  const onSubmit = handleSubmit(async (data) => { 
          try {
            setIsSubmitting(true);
            await axios.post('/api/issues', data); 
            router.push('/issues');          
          } 
          catch (error) {
            setIsSubmitting(false);
            setError('Error occurred');
          }
          setIsSubmitting(false);
        });

  return (
    <div className='max-w-2xl'>
      <h1 className='mb-5 text-2xl font-bold'>Create New Issue</h1>
      {
      error && 
      <Callout.Root color="red" className='mb-5'>
        <Callout.Icon>        
        </Callout.Icon>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>
      }
      <form className='space-y-3' 
        onSubmit={onSubmit}
      >        
        <Box>
          <TextField.Root size="3" placeholder="Title" {...register("title")} />
        </Box>        
          <ErrorMessage>
            {errors.title?.message}
          </ErrorMessage>        
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
        <Button disabled={isSubmitting}>Create Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}

export default NewIssuePage