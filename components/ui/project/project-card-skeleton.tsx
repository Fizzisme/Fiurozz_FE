import { Skeleton } from '@/components/ui/global/skeleton';

interface ProjectCardSkeletonProps {
    className?: string;
    style?: React.CSSProperties;
}

export default function ProjectCardSkeleton({ className, style }: ProjectCardSkeletonProps) {
    return <Skeleton style={style} className={`aspect-video rounded ${className ?? ''}`} aria-hidden="true" />;
}
