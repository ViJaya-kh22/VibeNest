const StatCard = ({ label, value, icon }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
    <div className="h-12 w-12 rounded-xl bg-zinc-800 flex items-center justify-center text-green-400">
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-zinc-400 font-medium">{label}</p>
    </div>
  </div>
);

export default StatCard;