import CommentForm from '@/components/CommentForm';
import CommentsList from '@/components/CommentsList';

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Comments Section</h1>
      

      
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Comments</h2>
        <CommentsList />
      </section>
    </main>
  );
}