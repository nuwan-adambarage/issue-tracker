'use client';
import { TextField, TextArea, Button } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-2xl space-y-3'>
      <h1 className='text-2xl font-bold'>Create New Issue</h1>
        <TextField.Root placeholder="Title">
          <TextField.Slot />
        </TextField.Root>
        <TextArea placeholder="Description" />
        <Button>Create Issue</Button>
    </div>
  )
}

export default NewIssuePage