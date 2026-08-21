import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMethods } from "@/hooks/useMethods"
import { ErrorAlert } from "@/components/ErrorAlert"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SuccessAlert } from "@/components/SuccessAlert"

type Mode = 'login' | 'register'

export const Authentication = () => {
  const [userEmail, setUserEmail] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [mode, setMode] = useState<Mode>('login')
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { handleRegister, handleLogin, loading } = useMethods("auth")
  const navigate = useNavigate()

  const onLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsError(false)

    try {
      if (!loading) {
        await handleLogin({
          email: userEmail,
          password: userPassword
        }, "auth/login")

        setIsSuccess(true)
        setTimeout(() => {
          navigate("/home")
        }, 3000)
      }
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || 'Credenciales inválidas o error de conexión')
      setIsError(true)
    }
  }

  const onRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsError(false)

    try {
      if (!loading) {
        await handleRegister({
          name: userName,
          email: userEmail,
          password: userPassword
        }, 'auth/register')

        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
          setMode('login')
        }, 2000)
      }
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || 'Error al crear la cuenta')
      setIsError(true)
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4 relative">
      
      {/* Contenedor flotante de notificaciones en la esquina superior derecha */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full">
        <SuccessAlert 
          success={isSuccess}
          title={mode === 'login' ? "Inicio de Sesión Exitoso" : "Cuenta Creada"}
          message={mode === 'login' ? "Redirigiendo a tu panel..." : "Inicia sesión con tus credenciales."}
          onClose={() => setIsSuccess(false)}
        />
        <ErrorAlert 
          error={isError}
          title="Error en la autenticación"
          message={errorMessage || "Intente nuevamente."}
          onClose={() => setIsError(false)}
        />
      </div>

      {mode === 'login' ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Inicia Sesión en tu cuenta</CardTitle>
            <CardDescription>
              Introduce tus datos para iniciar sesión
            </CardDescription>
            <CardAction>
              <Button 
                onClick={() => {
                  setIsError(false)
                  setMode('register')
                }}
                variant="link"
              >
                Registrarse
              </Button>
            </CardAction>
          </CardHeader>
          
          <form onSubmit={onLogin}>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  value={userEmail}
                  id="login-email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={e => setUserEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="login-password">Contraseña</Label>
                <Input 
                  placeholder="********"
                  value={userPassword}
                  onChange={e => setUserPassword(e.target.value)}
                  id="login-password" 
                  type="password" 
                  required 
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-4">
              <Button disabled={loading} type="submit" className="w-full">
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Crea una cuenta</CardTitle>
            <CardDescription>
              Introduce tus datos para crear una cuenta
            </CardDescription>
            <CardAction>
              <Button 
                onClick={() => {
                  setIsError(false)
                  setMode('login')
                }}
                variant="link"
              >
                {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
              </Button>
            </CardAction>
          </CardHeader>
          
          <form onSubmit={onRegister}>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="register-name">Nombre</Label>
                <Input
                  value={userName}
                  id="register-name"
                  placeholder="John Doe"
                  onChange={e => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  value={userEmail}
                  id="register-email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={e => setUserEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="register-password">Contraseña</Label>
                <Input 
                  value={userPassword}
                  onChange={e => setUserPassword(e.target.value)}
                  placeholder="********"
                  id="register-password" 
                  type="password" 
                  required  
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-4">
              <Button disabled={loading} type="submit" className="w-full">
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  )
}