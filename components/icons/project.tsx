export default function Project() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Browser window */}
            <rect x="3" y="3" width="18" height="18" rx="2" />

            {/* Browser header */}
            <path d="M3 8h18" />

            {/* Window dots */}
            <path d="M7 5.5h.01" />
            <path d="M10 5.5h.01" />
            <path d="M13 5.5h.01" />

            {/* Code */}
            <path d="m9 12-2 2 2 2" />
            <path d="m15 12 2 2-2 2" />
            <path d="m13 11-2 6" />
        </svg>
    );
}
