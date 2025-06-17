"use client"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { supabase } from "@/lib/supabase-client"
import { MessageCircle } from "lucide-react"

type Comment = {
  id: string
  name: string
  email: string
  picture_url: string | null
  comment: string
  created_at: string
}

export default function CommentsList() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase.from("comments").select("*").order("created_at", { ascending: false })

      if (error) console.error("Fetch error:", error)
      else setComments(data || [])

      setLoading(false)
    }

    fetchComments()

    // Real-time updates
    const channel = supabase
      .channel("realtime-comments")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
        },
        (payload) => {
          setComments((prev) => [payload.new as Comment, ...prev])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          {[...Array(3)].map((_, i) => (
            <section key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="animate-pulse flex items-center justify-between">
                  <div>
                    <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                  </div>
                  <div className="text-right">
                    <div className="h-6 bg-gray-200 rounded-full w-20 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-32 bg-gray-200 rounded-lg mt-4"></div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Comments ({comments.length})</h2>
        </div>
        <p className="text-gray-600">Join the conversation and share your thoughts</p>
      </div>

      {comments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
          <p className="text-gray-600">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment, index) => (
            <section key={comment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Comment Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{comment.name}</h3>
                    <p className="text-sm text-gray-600">{comment.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Comment #{index + 1}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      {format(new Date(comment.created_at), "MMM d, yyyy • h:mm a")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comment Content */}
              <div className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-4">{comment.comment}</p>
                </div>

                {/* Comment Image */}
                {comment.picture_url && (
                  <div className="mt-4">
                    <img
                      src={`${supabase.storage.from("comment-pictures").getPublicUrl(comment.picture_url).data.publicUrl}`}
                      alt="Comment attachment"
                      className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200"
                    />
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
