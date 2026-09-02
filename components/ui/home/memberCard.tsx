import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/global/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/global/avatar';
import { Cake, Mail, MapPin, School, Send } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';

export default function MemberCard() {
    return (
        <Card className="w-full max-w-sm dark:bg-secondary dark:border-input dark:border">
            <CardHeader>
                {/*Avatar*/}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Avatar className="size-12">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="flex items-center gap-3">
                        <Send className="size-6 cursor-pointer" />
                        <Button variant="ghost" className="px-1 cursor-pointer">
                            Follow
                        </Button>
                    </div>
                </div>

                {/*Name*/}
                <div className="mt-1">
                    <p className="text-[20px] font-semibold">Tuan Phi</p>
                    <p className="text-[12px] text-[#737373]">@Fizz_isme</p>
                </div>

                <div className="mt-1 text-[15px]">
                    {/*Slogan*/}
                    <p>My web is the best</p>

                    {/*Link*/}
                    <div className="flex flex-wrap text-[14px] gap-x-3">
                        <div className="flex  items-center gap-1 text-[#737373]">
                            <School className="size-4" />
                            <p>Student</p>
                        </div>
                        <div className="flex  items-center gap-1 text-[#737373]">
                            <MapPin className="size-4" />
                            <p>Pleiku</p>
                        </div>
                        <div className="flex  items-center gap-1 text-[#737373]">
                            <Cake className="size-4" />
                            <p>September 9, 2005</p>
                        </div>
                        <div className="flex  items-center gap-1 text-[#737373]">
                            <Mail className="size-4" />
                            <Button
                                variant="link"
                                hoverScale={1.01}
                                className="text-sm text-blue-400 cursor-pointer h-[26px] p-0"
                            >
                                nguyenletuanphi910.2019@gmail.com
                            </Button>
                        </div>
                    </div>

                    {/*Following and follower*/}
                    <div className="flex gap-3 mt-2">
                        <div className="flex gap-1">
                            <p>143</p>
                            <p className="text-[#737373] font-semibold">Following</p>
                        </div>
                        <div className="flex gap-1">
                            <p>149</p>
                            <p className="text-[#737373] font-semibold">Followers</p>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-sm">My projects:</p>

                <div className="flex flex-col items-start mt-2.5">
                    <Button variant="link" className="text-sm text-blue-400 cursor-pointer h-[26px] p-0">
                        https://mywebsite.com{' '}
                    </Button>
                    <Button variant="link" className="text-sm text-blue-400 cursor-pointer h-[26px] p-0">
                        https://mywebsite.com{' '}
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-2.5">Joined December 2025</p>
            </CardContent>

            <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                    Share
                </Button>
            </CardFooter>
        </Card>
    );
}
