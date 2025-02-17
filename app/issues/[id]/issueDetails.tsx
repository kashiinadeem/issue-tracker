import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMardown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex className='space-x-3' my='2'><IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text></Flex>
            <Card className='prose max-w-full' mt='4'>
                <p>
                    <ReactMardown>
                        {issue.description}
                    </ReactMardown>
                </p>
            </Card>
        </>
    )
}

export default IssueDetails
