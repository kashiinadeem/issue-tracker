

'use client';
import { Pencil2Icon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    const router = useRouter();
    const [error, setError] = useState(false);

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='orange'>
                        Delete Issue

                    </Button>
                </AlertDialog.Trigger>

                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you wnat to delete this issue? This action cannot be undone.
                    </AlertDialog.Description>
                    <Flex mt='4' gap='3'>
                        <AlertDialog.Cancel>
                            <Button variant='soft' color='gray'>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color='orange' onClick={async () => {
                                try {
                                    await axios.delete('/api/issues/' + issueId);
                                    router.push('/issues/list');
                                    router.refresh();
                                } catch (err) {

                                }

                            }}>Delete Issue</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton
