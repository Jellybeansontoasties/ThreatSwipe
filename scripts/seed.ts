import 'dotenv/config';
import { supabase } from '../lib/supabase';

async function seedDatabase() {
  // Seed domains
  const response = await supabase
    .from('domains')
    .insert([
      {
        title: 'Understand Core Cybersecurity Concepts',
        description: 'Learn fundamental security principles including CIA triad, threats, and defense mechanisms',
        icon: '🔐',
        order_number: 1
      },
      {
        title: 'Grasp Basic Networking Concepts',
        description: 'Understand IP addressing, DNS, ports, and protocols',
        icon: '🌐',
        order_number: 2
      },
      {
        title: 'Get Comfortable in Linux and Windows',
        description: 'Master essential OS commands and security tools',
        icon: '💻',
        order_number: 3
      },
      {
        title: 'Analyze Malware at a Basic Level',
        description: 'Learn to identify, analyze, and defend against malware',
        icon: '🦠',
        order_number: 4
      }
    ])
    .select();

  console.log('Domains insert response:', response);

  const { data: domains, error: domainError } = response;

  if (domainError) {
    console.error('Error seeding domains:', domainError.message);
    return;
  }

  // Seed topics for first domain
  if (domains && domains.length > 0) {
    const { data: topics, error: topicError } = await supabase
      .from('topics')
      .insert([
        {
          domain_id: domains[0].id,
          title: 'Define the CIA Triad',
          tool_references: ['TryHackMe - Security Principles'],
          order_number: 1
        },
        {
          domain_id: domains[0].id,
          title: 'Describe cyber threats',
          tool_references: ['TryHackMe - Threats'],
          order_number: 2
        }
        // Add more topics as needed
      ])
      .select();

    if (topicError) {
      console.error('Error seeding topics:', topicError.message);
      return;
    }

    // Seed statements for first topic
    if (topics && topics.length > 0) {
      const { data: statements, error: statementError } = await supabase
        .from('statements')
        .insert([
          {
            topic_id: topics[0].id,
            text: 'Confidentiality ensures information is accessible only to authorized users.',
            is_true: true,
            explanation: 'Correct! Confidentiality protects data from unauthorized access.',
            difficulty: 'easy'
          },
          {
            topic_id: topics[0].id,
            text: 'Integrity refers to ensuring systems are always available.',
            is_true: false,
            explanation: 'Actually, integrity ensures data accuracy/completeness. Availability ensures systems are accessible.',
            difficulty: 'easy'
          }
          // Add more statements as needed
        ]);
      console.log('Statements insert response:', { statements, statementError });
      if (statementError) {
        console.error('Error seeding statements:', statementError.message);
        return;
      }
    }
  }

  console.log('Database seeded successfully!');
}

// Example: Insert test user progress (replace with real user_id and statement_id)
await supabase
  .from('user_progress')
  .insert([
    {
      user_id: 'test-user-uuid',
      statement_id: 'test-statement-uuid',
      is_correct: true
    }
  ]);

// Example: Insert test user progress meta (replace with real user_id and domain_id)
await supabase
  .from('user_progress_meta')
  .insert([
    {
      user_id: 'test-user-uuid',
      domain_id: 'test-domain-uuid',
      completed_topics: 2,
      total_topics: 5
    }
  ]);
  
seedDatabase(); 