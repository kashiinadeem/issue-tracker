'use client'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchema'
import { z } from 'zod'
import ErrorMessage from '@/app/components/errormessage';
import Spinner from '@/app/components/spinner';

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false })

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (err) {
            setSubmitting(false);
            setError('An Unexpected Error Occured')
        }
    });

    return (
        <div className='max-w-xl '>
            {error && <Callout.Root color='orange'><Callout.Text>{error}</Callout.Text></Callout.Root>}
            <form className="space-y-2" onSubmit={onSubmit}>
                <TextField.Root placeholder='Title' {...register('title')}></TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller name='description' control={control} render={({ field }) => <SimpleMDE placeholder='Description' {...field}></SimpleMDE>} />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button>Submit New Issue {isSubmitting && <Spinner />} </Button>
            </form>
        </div>
    )
}

export default NewIssuePage
