import { motion } from 'framer-motion'

import Project, { ProjectProps } from './Project'

export default function ListItem(props: ProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: '-15%' }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-15%' }}
      whileInView={{ opacity: 1, translateX: 0, translateY: 0 }}
    >
      <Project {...props} />
    </motion.div>
  )
}
