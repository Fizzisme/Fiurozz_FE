'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Input } from '@/components/ui/global/input';
import { Button } from '@/components/animate-ui/components/buttons/button';
import { Separator } from '@/components/ui/global/separator';
import { Label } from '@/components/ui/global/label';
import { Mail, Lock } from 'lucide-react';
import Github from '@/components/icons/github';
import { useState } from 'react';
import { z } from 'zod';
import { authService } from '@/services/auth-service';
import { ApiEnvelope } from '@/services/api-core';
import { useRouter } from 'next/navigation';
import Google from '@/components/icons/google';
import OauthLogin from '@/components/ui/global/oauth-login';
import Image from 'next/image';
import Facebook from '@/components/icons/facebook';
import { OauthLoginListener } from '@/components/oauth-login-listener';
import BackgroundSpace from '@/components/ui/global/background-space';
import { Star } from '@/lib/utils';

const loginSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(255),
});

type LoginFormData = z.infer<typeof loginSchema>;

type FormErrors = Partial<Record<keyof LoginFormData, string>>;

export default function LoginForm({ smallStars, bigStars }: { smallStars: Star[]; bigStars: Star[] }) {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const router = useRouter();

    const handleInputChange = <K extends keyof LoginFormData>(field: K, value: LoginFormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = async () => {
        const parsed = loginSchema.safeParse(formData);
        if (!parsed.success) {
            const fieldErrors: FormErrors = {};
            parsed.error.issues.forEach((e) => {
                fieldErrors[e.path[0] as keyof typeof fieldErrors] = e.message;
            });
            setErrors(fieldErrors);
            return;
        }

        const result: ApiEnvelope<null> = await authService.login(parsed.data);
        if (!result.success) {
            alert(result.message);
            return;
        }

        router.push('/home');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 relative">
            {/*<GravityStarsBackground*/}
            {/*    starsCount={100}*/}
            {/*    starsOpacity={0.9}*/}
            {/*    className="absolute bg-muted/30 dark:bg-primary"*/}
            {/*/>*/}
            <BackgroundSpace smallStars={smallStars} bigStars={bigStars} />
            {/* SATURN DECORATION - top right, hidden on small screens */}
            <div className="hidden md:block absolute top-16 right-8 pointer-events-none select-none">
                <Image
                    src="/auth/saturn-light.png"
                    alt=""
                    width={240}
                    height={240}
                    className="object-contain dark:hidden"
                />
                <Image
                    src="/auth/saturn-dark.png"
                    alt=""
                    width={240}
                    height={240}
                    className="object-contain hidden dark:block"
                />
            </div>
            <div className="hidden md:block absolute bottom-0 left-0 pointer-events-none select-none">
                <Image
                    src="/auth/satellite-dark.png"
                    alt=""
                    width={240}
                    height={240}
                    className="object-contain dark:hidden"
                />
                <Image
                    src="/auth/satellite-light.png"
                    alt=""
                    width={240}
                    height={240}
                    className="object-contain hidden dark:block"
                />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-6xl z-1"
            >
                <div className="w-full max-w-4xl mx-auto rounded border bg-card shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                    {/* LEFT - IMAGE */}
                    <div className="relative hidden lg:block bg-muted">
                        <Image
                            src="/auth/Fizz.png"
                            alt=""
                            fill
                            className="object-cover pointer-events-none select-none"
                            priority
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 dark:from-black/90 dark:via-black/50 dark:to-black/20" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <p className="text-lg font-semibold tracking-tight">Fiurozz</p>
                            <p className="text-sm text-white/70">Showcase your work, your way.</p>
                        </div>
                    </div>
                    {/* RIGHT - FORM */}
                    <div className="flex flex-col justify-center p-8 sm:p-10">
                        <div className="mb-6">
                            <h1 className="text-xl font-semibold tracking-tight">Welcome back</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Enter your credentials to access your account
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* EMAIL */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-1.5">
                                    <Mail className="h-3.5 w-3.5" /> Email
                                </Label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="Fizz@example.com"
                                />
                                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                            </div>

                            {/* PASSWORD */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-1.5">
                                    <Lock className="h-3.5 w-3.5" /> Password
                                </Label>
                                <Input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div className="flex justify-end mb-1">
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-muted-foreground hover:text-black dark:hover:text-white transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <Button onClick={handleSubmit} className="w-full rounded cursor-pointer" variant="outline">
                                {/*{loading ? 'Logging in...' : 'Log in'}*/}
                                Log in
                            </Button>
                        </div>

                        {/* DIVIDER */}
                        <div className="flex items-center gap-3 my-6">
                            <Separator className="flex-1" />
                            <span className="text-xs text-muted-foreground">or</span>
                            <Separator className="flex-1" />
                        </div>

                        {/* SOCIAL LOGIN */}

                        <div className="grid grid-cols-3 gap-3">
                            <OauthLoginListener>
                                <OauthLogin provider="google" label="" Icon={Google} />
                                <OauthLogin provider="facebook" label="" Icon={Facebook} />
                                <OauthLogin provider="github" label="" Icon={Github} />
                            </OauthLoginListener>
                        </div>

                        <p className="text-center text-sm text-muted-foreground mt-6">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="text-black dark:text-white font-medium hover:underline">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
