
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Palette, Mail, Lock, LogIn as LogInIcon, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(4, { message: "Password must be at least 4 characters." }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const rolesCredentials = {
  admin: { email: "admin@atelierhub.com", pass: "adminpass", path: "/admin/dashboard" },
  student: { email: "student@atelierhub.com", pass: "studentpass", path: "/student/dashboard" },
  teacher: { email: "teacher@atelierhub.com", pass: "teacherpass", path: "/teacher/dashboard" },
  parent: { email: "parent@atelierhub.com", pass: "parentpass", path: "/parent/dashboard" },
};

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setLoginError(null);
    let loggedIn = false;
    let path = "/";

    for (const role in rolesCredentials) {
      const creds = rolesCredentials[role as keyof typeof rolesCredentials];
      if (data.email === creds.email && data.password === creds.pass) {
        loggedIn = true;
        path = creds.path;
        // In a real app, you'd set some auth context/token here
        // and also update the SidebarNav's currentUserRole state.
        // For now, we directly navigate. The SidebarNav has a manual role switcher for demo.
        break;
      }
    }

    if (loggedIn) {
      toast({
        title: "Login Successful!",
        description: "Redirecting to your dashboard...",
      });
      router.push(path);
    } else {
      setLoginError("Invalid email or password. Please try again.");
      form.setValue("password", ""); // Clear password field on error
    }
  };

  const prefillCredentials = (role: keyof typeof rolesCredentials) => {
    form.setValue("email", rolesCredentials[role].email);
    form.setValue("password", rolesCredentials[role].pass);
    setLoginError(null);
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-primary/70 via-purple-500 to-accent/70 p-12 text-white relative overflow-hidden">
        <Image
          src="https://placehold.co/1200x1800.png"
          alt="Artistic background"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
          data-ai-hint="abstract art inspiration"
        />
        <div className="relative z-10 text-center space-y-6">
          <Palette className="mx-auto h-24 w-24 text-white" />
          <h1 className="text-5xl font-bold tracking-tight">Atelier Hub</h1>
          <p className="text-xl font-light max-w-md">
            Unlock your creative potential. Learn, create, and connect in a vibrant community of artists.
          </p>
        </div>
         <div className="absolute bottom-6 left-6 z-10 text-xs font-extralight">
          Inspired by creativity, built for artists.
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-background">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <Link href="/" className="inline-block mx-auto mb-4">
              <Palette className="h-12 w-12 text-primary" />
            </Link>
            <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
            <CardDescription>Sign in to continue your artistic journey.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {loginError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                       <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between text-sm">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} id="rememberMe" />
                        </FormControl>
                        <FormLabel htmlFor="rememberMe" className="font-normal text-muted-foreground cursor-pointer">
                          Remember me
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <Link href="#" className="font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    "Signing In..."
                  ) : (
                    <>
                      <LogInIcon className="mr-2 h-5 w-5" /> Sign In
                    </>
                  )}
                </Button>
              </form>
            </Form>
             <div className="mt-6 space-y-2">
              <p className="text-xs text-center text-muted-foreground">Or quickly sign in as:</p>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(rolesCredentials) as Array<keyof typeof rolesCredentials>).map((role) => (
                  <Button
                    key={role}
                    variant="outline"
                    size="sm"
                    onClick={() => prefillCredentials(role)}
                    className="capitalize"
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground pt-6 pb-6">
            <p className="w-full">
              Don't have an account? <Link href="#" className="text-primary hover:underline font-medium">Sign up</Link> <br />
              © {new Date().getFullYear()} Atelier Hub. All rights reserved.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
