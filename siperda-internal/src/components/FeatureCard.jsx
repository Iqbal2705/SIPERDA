function FeatureCard({ title, desc, button, color, buttonColor }) {
  return (
    <div className="bg-white/90 p-8 rounded-2xl shadow-2xl">
      <div className={`w-16 h-16 rounded-full ${color} mb-6`}></div>

      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      <p className="text-gray-700 mb-6">{desc}</p>

      <button className={`border px-5 py-2 rounded-lg ${buttonColor}`}>
        {button}
      </button>
    </div>
  );
}

export default FeatureCard;
