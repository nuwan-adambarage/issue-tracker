'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteIssueButton = ({issueId}: {issueId: Number}) => {
  const router = useRouter();
  const deleteIssue = async () => {   
    await axios.delete('/api/issues/' + issueId);   
    router.push('/issues');     
    router.refresh();
  };

  return (
    <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? Once it's deleted, it can not be undone.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="start">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={deleteIssue}>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>    
    </>
  )
}

export default DeleteIssueButton