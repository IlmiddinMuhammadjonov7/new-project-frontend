export default function PageHeader({ title }) {
    return (
      <div className="bg-white py-4 px-6 border-b shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>
    );
  }
  