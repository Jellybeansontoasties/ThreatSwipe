'use client'; // Add this at the top

interface CategoryCardProps {
  title: string;
  description: string;
  progress: number;
  totalTopics: number;
  icon: string;
  onSelect?: () => void;
}

export default function CategoryCard({
  title,
  description,
  progress,
  totalTopics,
  icon,
  onSelect
}: CategoryCardProps) {
  const progressPercentage = (progress / totalTopics) * 100;
  
  return (
    <div 
      className={`border rounded-lg p-6 transition-colors ${onSelect ? 'cursor-pointer hover:bg-gray-50' : ''}`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="text-2xl">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center gap-3">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-500">
          {progress}/{totalTopics} topics
        </span>
      </div>
    </div>
  );
} 