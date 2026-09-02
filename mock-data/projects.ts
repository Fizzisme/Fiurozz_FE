import {
    ShoppingCart,
    Users,
    GraduationCap,
    CreditCard,
    HeartPulse,
    PlayCircle,
    BrainCog,
    Code,
    LucideIcon,
} from 'lucide-react';

// ============================================================
// TYPES
// ============================================================

export interface ProjectSubCategory {
    title: string;
    slug: string;
}

export interface ProjectCategory {
    title: string;
    slug: string;
    icon: LucideIcon;
    subCategories: ProjectSubCategory[];
}

export interface ProjectAuthor {
    name: string;
    avatar: string;
    username: string;
    email: string;
}

export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    /** Ảnh phụ cho ImageGallery - không tính thumbnail */
    images: string[];
    tags: string[];
    categorySlug: string;
    categoryTitle: string;
    subCategorySlug: string;
    subCategoryTitle: string;
    techStack: string[];
    author: ProjectAuthor;
    stats: {
        views: number;
        likes: number;
        stars: number;
        forks: number;
        comments: number;
    };
    demoUrl: string;
    githubUrl: string;
    featured: boolean;
    createdAt: string; // ISO date
}

// ============================================================
// CATEGORIES (dữ liệu gốc bạn cung cấp)
// ============================================================

export const projectCategories: ProjectCategory[] = [
    {
        title: 'E-commerce',
        slug: 'e-commerce',
        icon: ShoppingCart,
        subCategories: [
            { title: 'Online Store', slug: 'online-store' },
            { title: 'Marketplace', slug: 'market-place' },
            { title: 'Booking System', slug: 'booking-system' },
            { title: 'Subscription Service', slug: 'subscription-service' },
        ],
    },
    {
        title: 'Community & Social',
        slug: 'community-social',
        icon: Users,
        subCategories: [
            { title: 'Forum', slug: 'forum' },
            { title: 'Chat Application', slug: 'chat-application' },
            { title: 'Social Network', slug: 'social-network' },
        ],
    },
    {
        title: 'Education',
        slug: 'education',
        icon: GraduationCap,
        subCategories: [
            { title: 'E-learning Platform', slug: 'elearning-platform' },
            { title: 'Online Courses', slug: 'online-courses' },
            { title: 'Quiz System', slug: 'quiz-system' },
            { title: 'Student Management', slug: 'student-management' },
        ],
    },
    {
        title: 'Finance & Fintech',
        slug: 'finance-fintech',
        icon: CreditCard,
        subCategories: [
            { title: 'Expense Tracker', slug: 'expense-tracker' },
            { title: 'Payment System', slug: 'payment-system' },
            { title: 'Crypto Dashboard', slug: 'crypto-dashboard' },
            { title: 'Invoice & Billing', slug: 'invoice-and-billing' },
        ],
    },
    {
        title: 'Healthcare & Lifestyle',
        slug: 'healthcare-lifestyle',
        icon: HeartPulse,
        subCategories: [
            { title: 'Appointment Booking', slug: 'appointment-booking' },
            { title: 'Fitness Tracker', slug: 'fitness-tracker' },
            { title: 'Health Records', slug: 'health-records' },
            { title: 'Mental Health App', slug: 'mental-health-app' },
        ],
    },
    {
        title: 'Entertainment & Media',
        slug: 'entertainment-media',
        icon: PlayCircle,
        subCategories: [
            { title: 'Streaming Platform', slug: 'streaming-platform' },
            { title: 'Music Player', slug: 'music-player' },
            { title: 'Mini Games', slug: 'mini-games' },
            { title: 'Podcast Platform', slug: 'podcast' },
        ],
    },
    {
        title: 'AI & Data',
        slug: 'ai-data',
        icon: BrainCog,
        subCategories: [
            { title: 'AI Chatbot', slug: 'ai-chatbot' },
            { title: 'Recommendation System', slug: 'recommendation-system' },
            { title: 'Data Visualization', slug: 'data-visualization' },
            { title: 'AI SaaS Tool', slug: 'ai-saas-tool' },
        ],
    },
    {
        title: 'Developer Tools',
        slug: 'developer-tools',
        icon: Code,
        subCategories: [
            { title: 'Component Library', slug: 'component-library' },
            { title: 'API Platform', slug: 'api-platform' },
            { title: 'Code Snippet Manager', slug: 'code-snippet-manager' },
            { title: 'Dev Dashboard', slug: 'dev-dashboard' },
        ],
    },
];

// ============================================================
// DATA POOLS (dùng để sinh dữ liệu giả một cách xác định/deterministic
// -> tránh lỗi hydration mismatch trong Next.js vì KHÔNG dùng Math.random)
// ============================================================

const PREFIXES = [
    'Nova',
    'Pixel',
    'Cloud',
    'Swift',
    'Nimbus',
    'Zenith',
    'Orbit',
    'Flux',
    'Byte',
    'Spark',
    'Aero',
    'Vertex',
    'Prime',
    'Nexus',
    'Quantum',
    'Echo',
    'Lumen',
    'Atlas',
    'Crest',
    'Drift',
];

const TECH_STACKS = [
    ['Next.js', 'TypeScript', 'Tailwind CSS'],
    ['React', 'Node.js', 'MongoDB'],
    ['Vue 3', 'Nuxt', 'Pinia'],
    ['Next.js', 'Prisma', 'PostgreSQL'],
    ['React Native', 'Expo', 'Firebase'],
    ['SvelteKit', 'TypeScript', 'Supabase'],
    ['Next.js', 'tRPC', 'Drizzle ORM'],
    ['React', 'Redux Toolkit', 'Express'],
    ['Angular', 'RxJS', 'NestJS'],
    ['Next.js', 'GraphQL', 'Apollo'],
];

const AUTHOR_NAMES = [
    'Nguyen Van A',
    'Tran Thi B',
    'Le Van C',
    'Pham Thi D',
    'Hoang Van E',
    'Do Thi F',
    'Vu Van G',
    'Bui Thi H',
    'Dang Van I',
    'Ngo Thi K',
];

const DESCRIPTION_TEMPLATES = [
    (sub: string) => `Một dự án ${sub} hiện đại, tập trung vào trải nghiệm người dùng mượt mà và hiệu năng cao.`,
    (sub: string) => `Ứng dụng ${sub} full-stack, hỗ trợ xác thực người dùng, quản lý dữ liệu real-time.`,
    (sub: string) => `Nền tảng ${sub} có giao diện responsive, tối ưu SEO và tốc độ tải trang.`,
    (sub: string) => `Sản phẩm ${sub} demo, minh họa kiến trúc component tái sử dụng và clean code.`,
    (sub: string) => `Dự án ${sub} xây dựng theo mô hình microservices, dễ mở rộng và bảo trì.`,
];

// ============================================================
// HELPERS
// ============================================================

function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

/** Pseudo-random nhưng xác định (deterministic) dựa trên seed số nguyên */
function pick<T>(arr: T[], seed: number): T {
    return arr[seed % arr.length];
}

function pad(num: number, size = 3): string {
    return num.toString().padStart(size, '0');
}

// ============================================================
// GENERATE MOCK PROJECTS (~10 project / sub-category)
// ============================================================

const PROJECTS_PER_SUBCATEGORY = 10;

function generateMockProjects(): Project[] {
    const projects: Project[] = [];
    let globalIndex = 0;

    projectCategories.forEach((category) => {
        category.subCategories.forEach((sub) => {
            for (let i = 1; i <= PROJECTS_PER_SUBCATEGORY; i++) {
                globalIndex++;

                const prefix = pick(PREFIXES, globalIndex * 7 + i);
                const title = `${prefix} ${sub.title} ${i}`;
                const slug = `${slugify(prefix)}-${sub.slug}-${i}`;

                const techStack = pick(TECH_STACKS, globalIndex * 3 + i);
                const author = pick(AUTHOR_NAMES, globalIndex * 5 + i);
                const descriptionFn = pick(DESCRIPTION_TEMPLATES, globalIndex * 11 + i);

                projects.push({
                    id: `proj-${pad(globalIndex)}`,
                    title,
                    slug,
                    description: descriptionFn(sub.title.toLowerCase()),
                    thumbnail: `https://picsum.photos/seed/${slug}/600/400`,
                    images: [1, 2, 3].map((n) => `https://picsum.photos/seed/${slug}-${n}/800/600`),
                    tags: [category.slug, sub.slug, ...techStack.slice(0, 2).map((t) => slugify(t))],
                    categorySlug: category.slug,
                    categoryTitle: category.title,
                    subCategorySlug: sub.slug,
                    subCategoryTitle: sub.title,
                    techStack,
                    author: {
                        name: author,
                        username: slugify(author),
                        avatar: `https://i.pravatar.cc/150?u=${slugify(author)}-${globalIndex}`,
                        email: `${slugify(author)}@example.com`,
                    },
                    stats: {
                        views: 100 + ((globalIndex * 37 + i * 13) % 9000),
                        likes: 5 + ((globalIndex * 17 + i * 3) % 500),
                        stars: 1 + ((globalIndex * 9 + i * 2) % 300),
                        forks: 0 + ((globalIndex * 5 + i) % 80),
                        comments: 0 + ((globalIndex * 7 + i * 2) % 40),
                    },
                    demoUrl: `https://demo.example.com/${slug}`,
                    githubUrl: `https://github.com/example/${slug}`,
                    featured: i % 5 === 0,
                    createdAt: new Date(2024, (globalIndex + i) % 12, ((globalIndex * 3 + i) % 28) + 1).toISOString(),
                });
            }
        });
    });

    return projects;
}

export const mockProjects: Project[] = generateMockProjects();

// ============================================================
// HELPER GETTERS - dùng trực tiếp trong page.tsx
// ============================================================

/** Lấy toàn bộ project (dùng cho /projects) */
export function getAllProjects(): Project[] {
    return mockProjects;
}

/** Lấy project theo category slug (dùng cho /projects/[category]) */
export function getProjectsByCategory(categorySlug: string): Project[] {
    return mockProjects.filter((p) => p.categorySlug === categorySlug);
}

/** Lấy project theo category + subCategory slug (dùng cho /projects/[category]/[subCategory]) */
export function getProjectsByCategoryAndSub(categorySlug: string, subCategorySlug: string): Project[] {
    return mockProjects.filter((p) => p.categorySlug === categorySlug && p.subCategorySlug === subCategorySlug);
}

/** Lấy 1 project theo slug (dùng cho trang chi tiết project) */
export function getProjectBySlug(slug: string): Project | undefined {
    return mockProjects.find((p) => p.slug === slug);
}

/** Lấy các project nổi bật (featured) */
export function getFeaturedProjects(): Project[] {
    return mockProjects.filter((p) => p.featured);
}

// ============================================================
// CURSOR PAGINATION
// Không dùng page number (?page=2) mà dùng cursor = id của item
// cuối cùng đã lấy. Client gửi lại cursor đó để lấy "trang" tiếp theo.
// ============================================================

export interface ProjectsCursorPage {
    items: Project[];
    nextCursor: string | null;
    hasMore: boolean;
}

export interface GetProjectsCursorParams {
    /** id của project cuối cùng đã load, null = lấy từ đầu */
    cursor?: string | null;
    /** số lượng item mỗi lần load */
    limit?: number;
    /** lọc theo category, null/undefined = tất cả */
    categorySlug?: string | null;
    /** lọc theo sub-category, null/undefined = tất cả */
    subCategorySlug?: string | null;
}

export function getProjectsCursorPage({
    cursor = null,
    limit = 9,
    categorySlug = null,
    subCategorySlug = null,
}: GetProjectsCursorParams = {}): ProjectsCursorPage {
    let source = mockProjects;

    if (categorySlug) {
        source = source.filter((p) => p.categorySlug === categorySlug);
    }
    if (subCategorySlug) {
        source = source.filter((p) => p.subCategorySlug === subCategorySlug);
    }

    const startIndex = cursor ? source.findIndex((p) => p.id === cursor) + 1 : 0;

    // cursor không tồn tại trong tập dữ liệu (đã bị lọc/xoá) -> trả rỗng, tránh loop
    if (cursor && startIndex === 0) {
        return { items: [], nextCursor: null, hasMore: false };
    }

    const items = source.slice(startIndex, startIndex + limit);
    const nextIndex = startIndex + limit;
    const hasMore = nextIndex < source.length;
    const nextCursor = hasMore ? source[nextIndex - 1].id : null;

    return { items, nextCursor, hasMore };
}

/** Giả lập gọi API bất đồng bộ (có độ trễ mạng) cho cursor pagination phía client */
export async function fetchProjectsCursorPage(
    params: GetProjectsCursorParams = {},
    delayMs = 600,
): Promise<ProjectsCursorPage> {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return getProjectsCursorPage(params);
}
