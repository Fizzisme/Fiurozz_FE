
import { motion } from 'framer-motion'
import FlipCard from "@/app/(main)/home/components/flipCard";
const code = `## Achievements 2025

- **Completed 12 Projects:**  
  including social platform UI, admin dashboard, and AI-integrated features.

- **Open Source Contributions:**  
  helped fix issues & add components in community libraries.

- **Community Mentor:**  
  guided new members, shared knowledge weekly in Discord voice sessions.

- **Top 1 Code Quality:**  
  with consistent clean architecture & scalable layout templates.

- **Fi Landing Page:**  
  handled responsive UI logic & animation flows.
`
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4, // Delay giữa các card
        },
    },
}

// Card animation variants
const cardVariants = {
    hidden: {
        opacity: 0,
        y: 100, // Bắt đầu từ dưới lên
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring' as const,
            stiffness: 100,
            damping: 15,
        },
    },
}
export default function MemberOfYear() {
    return (
        <motion.div className="pt-32" variants={containerVariants} initial="hidden" animate="visible">
            <div className="grid grid-cols-3 gap-4 items-end max-w-6xl mx-auto">
                <motion.div className="-translate-y-8" variants={cardVariants}>
                    <FlipCard emoji="🥈" color="text-gray-400" code={code} />
                </motion.div>

                <motion.div className="-translate-y-24" variants={cardVariants}>
                    <FlipCard emoji="🥇" color="text-yellow-500" code={code} />
                </motion.div>

                <motion.div className="translate-y-0" variants={cardVariants}>
                    <FlipCard emoji="🥉" color="text-orange-400" code={code} />
                </motion.div>
            </div>
        </motion.div>
    )
}
