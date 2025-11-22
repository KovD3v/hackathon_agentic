'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export function DashboardChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

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
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="py-3 border-b">
        <CardTitle className="text-lg">AI Health Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <p className="text-center text-muted-foreground text-sm mt-10">
                Ask me anything about your health, workout, or nutrition!
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
  )
}
