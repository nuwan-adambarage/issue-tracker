'use client';
import { TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className='max-w-2xl space-y-3'>
      <h1 className='text-2xl font-bold'>Create New Issue</h1>
        <TextField.Root placeholder="Title">
          <TextField.Slot />
        </TextField.Root>
        <SimpleMDE placeholder='Description' />
        <Button>Create Issue</Button>
    </div>
  )
}

export default NewIssuePage