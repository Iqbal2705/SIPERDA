import { motion } from "framer-motion";

function DashboardCard({ title, total, icon, color, subtitle }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500">{title}</p>

          <h1 className={`text-5xl font-bold mt-2 ${color}`}>
            {total}
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            {subtitle}
          </p>
        </div>

        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardCard;