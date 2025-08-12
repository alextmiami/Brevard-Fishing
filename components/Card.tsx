import { ReactNode } from 'react'
export default function Card({ title, right, children }: { title: string, right?: ReactNode, children: ReactNode }) {
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {right}
      </div>
      <div>{children}</div>
    </div>
  )
}
