
import React from 'react';

const InstructionPanel: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8 container mx-auto max-w-3xl">
      <h2 className="text-2xl font-semibold text-sky-700 mb-3">Welcome to Ikigai Explorer!</h2>
      <p className="text-slate-600 leading-relaxed">
        Discover your Ikigai – your reason for being – by reflecting on four key aspects of your life:
      </p>
      <ul className="list-disc list-inside mt-3 text-slate-600 space-y-1">
        <li><span className="font-semibold text-rose-500">What you LOVE:</span> Activities and passions that bring you joy.</li>
        <li><span className="font-semibold text-emerald-500">What you are GOOD AT:</span> Your skills, talents, and strengths.</li>
        <li><span className="font-semibold text-sky-500">What the world NEEDS:</span> How you can contribute to others or society.</li>
        <li><span className="font-semibold text-amber-500">What you can be PAID FOR:</span> Skills or services that have monetary value.</li>
      </ul>
      <p className="mt-4 text-slate-600 leading-relaxed">
        Add items to each category below. As your lists grow, the diagram will update to show how these areas intersect, revealing your <span className="font-semibold">Passion, Mission, Vocation, Profession,</span> and ultimately, your <span className="font-semibold text-purple-600">IKIGAI</span>.
      </p>
    </div>
  );
};

export default InstructionPanel;
