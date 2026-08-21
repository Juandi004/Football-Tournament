import { CheckCircle2, X } from "lucide-react"

interface SuccessAlertProps {
  title: string,
  success: boolean,
  message: string,
  onClose?: () => void
}

export const SuccessAlert = ({title = 'Operacion Exitosa',
  message ='La operación se completó con éxtito',
  success,
  onClose}: SuccessAlertProps) => {
  if ( success== false) return null

  return (
    <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 shadow-sm dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
      
      <div className="flex-1 text-sm">
        <h4 className="font-semibold leading-tight">{title}</h4>
        {message && (
          <p className="mt-1 text-emerald-700 dark:text-emerald-300">
            {message}
          </p>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}