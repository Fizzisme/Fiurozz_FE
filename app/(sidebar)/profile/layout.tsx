const suggestedUsers = [
    { id: 's1', name: 'Minh Khang', handle: '@minhkhang', avatarUrl: 'https://i.pravatar.cc/64?img=12' },
    { id: 's2', name: 'Trang Đặng', handle: '@trangdang', avatarUrl: 'https://i.pravatar.cc/64?img=32' },
    { id: 's3', name: 'Huy Nguyễn', handle: '@huynguyen', avatarUrl: 'https://i.pravatar.cc/64?img=51' },
];

const trendingTopics = [
    { id: 't1', category: 'Công nghệ · Xu hướng', title: '#NextJS15', posts: '12.4K bài viết' },
    { id: 't2', category: 'Lập trình', title: 'Rust vs Go', posts: '3.2K bài viết' },
    { id: 't3', category: 'Xu hướng tại Việt Nam', title: '#DevTools2026', posts: '8.7K bài viết' },
];

function RightRail() {
    return (
        <aside className="hidden w-80 shrink-0 flex-col gap-4 lg:flex">
            <div className="sticky top-6 flex flex-col gap-4">
                <div className="rounded-2xl border p-4">
                    <h3 className="mb-3 text-sm font-medium">Gợi ý theo dõi</h3>
                    <div className="flex flex-col gap-3">
                        {suggestedUsers.map((u) => (
                            <div key={u.id} className="flex items-center gap-2.5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={u.avatarUrl}
                                    alt={u.name}
                                    className="h-9 w-9 shrink-0 rounded-full object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">{u.name}</p>
                                    <p className="truncate text-xs">{u.handle}</p>
                                </div>
                                <button className="shrink-0 rounded-full px-3 py-1 text-xs font-medium transition hover:opacity-90">
                                    Theo dõi
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border p-4">
                    <h3 className="mb-3 text-sm font-medium">Đang thịnh hành</h3>
                    <div className="flex flex-col gap-3">
                        {trendingTopics.map((t) => (
                            <div key={t.id}>
                                <p className="text-xs">{t.category}</p>
                                <p className="text-sm font-medium">{t.title}</p>
                                <p className="text-xs">{t.posts}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen">
            <div className="mx-auto flex max-w-6xl gap-6 px-4 py-10">
                {children}
                <RightRail />
            </div>
        </main>
    );
}
