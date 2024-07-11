import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'


const statusMap: Record<Status, { label: string, color: 'orange' | 'voilet' | 'green' }> = {
    OPEN: { label: 'Open', color: 'green' },
    IN_PROGRESS: { label: 'In Progress', color: 'voilet' },
    CLOSED: { label: 'Closed', color: 'orange' },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    )
}

export default IssueStatusBadge;
