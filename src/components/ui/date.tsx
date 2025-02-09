import { formatDate } from "@/utils/formatDate"

const DateComponent = ({ createdAt, position }: { createdAt?: Date, position: 'LEFT' | 'RIGHT' }) => {
  return createdAt &&
    <span className={`${position === 'LEFT' ? 'left-1': 'right-1'} absolute -bottom-6 text-[#8d948d] text-xs whitespace-nowrap`}>{formatDate(createdAt)}</span>
}

export { DateComponent }


