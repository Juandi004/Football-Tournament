import { CheckCircle2, X } from "lucide-react"

interface ErrorAlertProps {
  title: string,
  error: boolean,
  message: string,
  onClose?: () => void
}

export const ErrorAlert = ({title = 'Operacion Exitosa',
  message,
  error,
  onClose}: ErrorAlertProps) => {
  if ( error== false) return null

  return (
    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-900 shadow-sm dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
      <CheckCircle2 className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
      
      <div className="flex-1 text-sm">
        <h4 className="font-semibold leading-tight">{title}</h4>
        {message && (
          <p className="mt-1 text-red-700 dark:text-red-300">
            {message}
          </p>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}