import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col bg-white h-svh">
      <div className="relative w-[600px] max-w-full">
        <Image
          src="/assets/not_found.svg"
          sizes="100vw"
          width={600}
          height={600}
          style={{
            width: '100%',
            height: 'auto',
          }}
          alt="Not found"
        />
      </div>
      <Link href="/">
        <Button variant="link" className="text-xl text-zinc-900 font-bold">Return Home</Button>
      </Link>
    </div>
  )
}