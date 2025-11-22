'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageSquare, Send, X } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export function GlobalChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const response = await fetch('http://localhost:8000/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          user_id: user?.id
        })
      })

      const data = await response.json()
      const assistantMessage: Message = { role: 'assistant', content: data.response }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error(error)
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to the server." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl flex flex-col z-50">
          <CardHeader className="flex flex-row items-center justify-between py-3 border-b">
            <CardTitle className="text-lg">Health Agent</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <p className="text-center text-muted-foreground text-sm mt-10">
                    How can I help you today?
                  </p>
                )}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-muted rounded-lg px-3 py-2 text-sm animate-pulse">
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex w-full gap-2"
            >
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit" size="icon" disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
