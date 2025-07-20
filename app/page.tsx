import { supabase } from '@/lib/supabase';
import CategoryCard from '@/components/CategoryCard';

export default async function Home() {
  const { data: domains } = await supabase
    .from('domains')
    .select(`
      id,
      title,
      description,
      icon,
      topics:topics(id, is_complete)
    `)
    .order('order_number', { ascending: true });

  const domainsWithProgress = domains?.map(domain => ({
    ...domain,
    progress: domain.topics.filter((topic: any) => topic.is_complete).length,
    totalTopics: domain.topics.length
  })) || [];

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Cybersecurity Fundamentals</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {domainsWithProgress.map((domain: any) => (
          <CategoryCard
            key={domain.id}
            title={domain.title}
            description={domain.description}
            icon={domain.icon}
            progress={domain.progress}
            totalTopics={domain.totalTopics}
            onSelect={() => {
              // Navigate to category view
              window.location.href = `/category/${domain.id}`;
            }}
          />
        ))}
      </div>
    </main>
  );
}
