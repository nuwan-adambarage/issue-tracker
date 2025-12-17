'use client';
import { TextField, Button, Box } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { use } from 'react';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  return (
    <form className='max-w-2xl space-y-3' 
      onSubmit={handleSubmit(async (data) => { 
        await axios.post('/api/issues', data); 
        router.push('/issues');
      })}
    >
      <h1 className='text-2xl font-bold'>Create New Issue</h1>
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
  )
}

export default NewIssuePage