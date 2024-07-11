import IssueStatusBadge from '@/app/components/issueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

import ReactMardown from 'react-markdown';

interface Props {
    params: { id: string }
}

const IssueDetails = async ({ params }: Props) => {

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if (!issue)
        notFound();

    return (
        <div className=''>
            <Heading>{issue.title}</Heading>
            <Flex gap='4'><IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text></Flex>
            <Card className='prose' mt='4'><p><ReactMardown>{issue.description}</ReactMardown></p></Card>

        </div>
    )
}

export default IssueDetails
