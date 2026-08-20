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
import { useAuthStore } from "@/store/authStore"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type Mode = 'login' | 'register'

export const Authentication = () => {
  const [userEmail, setUserEmail]=useState<string>('')
  const [userPassword, setUserPassword]=useState<string>('')
  const [userName, setUserame]=useState<string>('')
  const [mode, setMode]=useState<Mode>('login')

  const {handleRegister, handleLogin, loading, error} = useMethods("auth")

  const navigate = useNavigate()

  const onLogin = async(login: string)=>{
    if(loading == false && !error){
      await handleLogin({
      email: userEmail,
      password: userPassword
    }, "auth/login")
      navigate('/home')
    }
  }

  const onRegister = async()=>{
    if(loading == false && !error){
      await handleRegister({
      name: userName,
      email: userEmail,
      password: userPassword
    }, 'auth/register')
    }
  }
  return (
     <div className="h-screen w-screen flex justify-center items-center">
    {mode =='login' ? (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Inicia Sesión en tu cuenta</CardTitle>
        <CardDescription>
          Introduce tus datos para inciar sesión
        </CardDescription>
        <CardAction>
          <Button 
          onClick={()=>setMode('register')}
          variant="link">Registarse</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={userEmail}
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={e => setUserEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
              </div> 
              <Input 
              placeholder="********"
              value={userPassword}
              onChange={e => setUserPassword(e.target.value)}
              id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button 
        onClick={()=>onLogin('login')}
        type="submit" className="w-full">
          Iniciar Sesión
        </Button>
      </CardFooter>
    </Card>
    ): (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Crea una cuenta</CardTitle>
        <CardDescription>
          Introduce tus datos para crear una cuenta
        </CardDescription>
        <CardAction>
          <Button 
          onClick={()=>setMode('login')}
          variant="link">Inciar Sesión</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Nombre</Label>
              <Input
                value={userName}
                id="name"
                placeholder="John Doe"
                onChange={e => setUserame(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={userEmail}
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={e => setUserEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
              </div> 
              <Input 
              value={userPassword}
              onChange={(e=> setUserPassword(e.target.value))}
              placeholder="********"
              id="password" type="password" required  />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button 
        onClick={onRegister}
        type="submit" className="w-full">
          Crear Cuenta
        </Button>
      </CardFooter>
    </Card>
    )}
     </div>
  )
}
