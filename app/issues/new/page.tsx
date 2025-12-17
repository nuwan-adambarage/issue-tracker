'use client';
import { TextField, Button, Box, Callout } from '@radix-ui/themes'
// import { InfoCircledIcon } from '@radix-ui/react-icons';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
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
        onSubmit={handleSubmit(async (data) => { 
          try {
            await axios.post('/api/issues', data); 
            router.push('/issues');          
          } 
          catch (error) {
            setError('Error occurred');
          }
        })}
      >        
          <Box>
            <TextField.Root size="3" placeholder="Title" {...register("title")} />
          </Box>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
          />
          <Button>Create Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage