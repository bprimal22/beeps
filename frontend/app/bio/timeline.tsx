"use client"

import { motion } from "framer-motion"
import { TimelineItem } from "./types"

export const Timeline = ({ items }: { items: TimelineItem[] }) => {
  return (
    <div className="relative space-y-8">
      {/* Vertical timeline line */}
      <div 
        className="absolute left-16 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-blue-500/50"
      />

      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative ml-28 group"
        >
          {/* Timeline node */}
          <motion.div
            className="absolute -left-[44px] w-4 h-4 rounded-full bg-blue-500 top-4 z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <div className="absolute inset-0 rounded-full bg-blue-400/50 animate-ping" />
          </motion.div>

          {/* Content */}
          <div className="bg-black/70 border border-gray-800 rounded-lg p-6 hover:bg-white/5 transition-all">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-blue-400">
                    {item.title}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center ml-2 text-blue-400/70 hover:text-blue-400"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <path d="M15 3h6v6" />
                          <path d="M10 14L21 3" />
                        </svg>
                      </a>
                    )}
                  </h3>
                  <span className="text-gray-500">{item.period}</span>
                </div>
                {item.organization && (
                  <p className="text-gray-400 mt-1">{item.organization}</p>
                )}
              </div>
            </div>

            <p className="text-gray-300 mb-4">{item.description}</p>

            {item.details && (
              <ul className="list-disc ml-4 text-gray-400 space-y-2">
                {item.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            )}

            {item.tech && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-full 
                             bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                             border border-blue-500/20 text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}