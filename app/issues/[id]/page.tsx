import IssueStatusBadge from '@/app/components/issueStatusBadge';
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'

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
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap='4'><IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text></Flex>
            <Card><p>{issue.description}</p></Card>




        </div>
    )
}

export default IssueDetails
