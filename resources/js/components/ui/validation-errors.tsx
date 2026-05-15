import { usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

type Props = {
  prefix: string
}

export function ValidationErrors({prefix}: Props) {
  const errors = usePage().props.errors
  const messages = Object.entries(errors)
    .filter(([key]) => key.startsWith(prefix))
    .map(([, message]) => message)
  const alertRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
      alertRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [errors])

  if (messages.length === 0) {
    return null
  }

  return (
    <Alert variant="destructive" className="mt-2" ref={alertRef}>
      <AlertCircleIcon />
      <AlertTitle>Les données de ce champs sont invalides.</AlertTitle>
      <AlertDescription>
        <ul className="list-inside list-disc text-sm">
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )

}
