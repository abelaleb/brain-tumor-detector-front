'use client';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/lib/supabase-client';

export default function CommentForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {'image/*': []},
    maxFiles: 1,
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0])
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = null;
      
      // Upload image if exists
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from('comment-pictures')
          .upload(fileName, file);

        if (error) throw error;
        imageUrl = data.path;
      }

      // Insert comment
      const { error } = await supabase.from('comments').insert({
        name,
        email,
        picture_url: imageUrl,
        comment
      });

      if (error) throw error;

      // Reset form
      setName('');
      setEmail('');
      setComment('');
      setFile(null);
      alert('Comment submitted!');

    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div>
        <label className="block mb-1">Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Email *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Comment *</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={4}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Profile Picture</label>
        <div 
          {...getRootProps()} 
          className="p-4 border-2 border-dashed rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          {file ? (
            <p>{file.name}</p>
          ) : (
            <p>Drag & drop image here, or click to select</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {isSubmitting ? 'Submitting...' : 'Post Comment'}
      </button>
    </form>
  );
}