'use client'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { IssueSchema } from '@/app/validationSchema'
import { z } from 'zod'
import ErrorMessage from '@/app/components/errormessage';
import Spinner from '@/app/components/spinner';
import { Issue } from '@prisma/client';

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false })

type IssueFormData = z.infer<typeof IssueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(IssueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            if (issue)
                await axios.patch('/api/issues/' + issue.id, data);
            else {
                await axios.post('/api/issues', data);
            }
            router.push('/issues/list');
            router.refresh();
        } catch (err) {
            setSubmitting(false);
            setError('An Unexpected Error Occured')
        }
    });

    return (
        <div className='max-w-xl '>
            {error && <Callout.Root color='orange'><Callout.Text>{error}</Callout.Text></Callout.Root>}
            <form className="space-y-2" onSubmit={onSubmit}>
                <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')}></TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller name='description' control={control} defaultValue={issue?.description} render={({ field }) => <SimpleMDE placeholder='Description' {...field}></SimpleMDE>} />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button>{issue ? 'Update Issue ' : 'Submit New Issue '}{isSubmitting && <Spinner />} </Button>
            </form>
        </div>
    )
}

export default IssueForm
