import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Topic {
  id: string;
  title: string;
  tool_references: string[];
  is_complete: boolean;
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { data: domain } = await supabase
    .from('domains')
    .select(`id, title, description, icon, topics:topics(id, title, tool_references, is_complete)`) 
    .eq('id', params.id)
    .single();

  if (!domain) return <div className="p-8">Category not found.</div>;

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span className="text-3xl">{domain.icon}</span> {domain.title}
      </h1>
      <p className="mb-6 text-gray-600">{domain.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {domain.topics.map((topic: Topic) => (
          <div key={topic.id} className="border rounded-lg p-5 flex flex-col gap-3 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{topic.title}</h2>
              {topic.is_complete && <span className="text-green-600 text-sm font-bold">✓ Complete</span>}
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {topic.tool_references?.map((tool: string) => (
                <span key={tool} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  {tool}
                </span>
              ))}
            </div>
            <Link href={`/practice/${topic.id}`}>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Start Practice
              </button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
} 