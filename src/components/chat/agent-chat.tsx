"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Bot,
  LoaderCircle,
  PlayCircle,
  Radar,
  SendHorizonal,
  ShieldCheck,
  Sparkles,
  User,
  Info
} from "lucide-react";
import { useAgent } from "@/hooks/use-agent";
import { usePortfolioGuardStore } from "@/store/portfolio-guard-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const examples = [
  "Rebalance to 60/40 ETH/USDC",
  "Make portfolio more conservative",
  "Show current allocation",
  "Execute auto-compound",
];

export function AgentChat() {
  const messages = usePortfolioGuardStore((state) => state.messages);
  const lastDecision = usePortfolioGuardStore((state) => state.lastDecision);
  const rules = usePortfolioGuardStore((state) => state.rules);
  const identity = usePortfolioGuardStore((state) => state.identity);
  const activity = usePortfolioGuardStore((state) => state.activity);
  const [input, setInput] = useState("");
  const { sendMessage, isSending, executeDecision, isExecuting } = useAgent();

  async function onSubmit() {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-12 h-[calc(100vh-12rem)] min-h-[600px]">
      <Card className="xl:col-span-8 flex flex-col bg-card/40 backdrop-blur-xl border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/40 pb-4 bg-background/20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Agent Console
              </CardTitle>
              <CardDescription className="mt-1">
                Natural language steering for autonomous portfolio management.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-normal">Reasoning First</Badge>
              <Badge variant="secondary" className="bg-muted text-muted-foreground font-normal">Execution Gated</Badge>
              {messages.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => usePortfolioGuardStore.getState().clearMessages()} className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                  Delete Chat
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <ScrollArea className="flex-1 p-4 sm:p-6 bg-gradient-to-b from-transparent to-background/5">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-muted-foreground py-20">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <p>How can I assist with your portfolio today?</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg mt-4">
                {examples.map((example) => (
                  <Button key={example} variant="outline" size="sm" onClick={() => setInput(example)} className="border-border/50 bg-background/50 hover:bg-muted text-xs rounded-full">
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${message.role === "assistant" ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${message.role === "assistant" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={`flex flex-col gap-1 min-w-[120px] max-w-[80%] ${message.role === "assistant" ? "items-start" : "items-end"}`}>
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-[10px] uppercase font-medium tracking-wider text-muted-foreground">
                        {message.role === "assistant" ? "Agent" : "You"}
                      </span>
                      <span className="text-[10px] text-muted-foreground/60">
                        {format(new Date(message.timestamp), "HH:mm")}
                      </span>
                    </div>
                    <div className={`px-4 py-3 text-sm leading-relaxed ${message.role === "assistant" ? "bg-card border border-border/50 text-foreground rounded-2xl rounded-tl-sm shadow-sm" : "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm shadow-sm"}`}>
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        <div className="p-4 bg-background/40 border-t border-border/40">
          <div className="relative flex items-center bg-card rounded-2xl border border-border/60 shadow-sm focus-within:ring-1 focus-within:ring-primary/50 focus-within:border-primary/50 transition-all overflow-hidden p-1">
            <Textarea
              className="min-h-[52px] max-h-32 resize-none border-0 shadow-none focus-visible:ring-0 bg-transparent py-3 px-4"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Tell the agent what to do..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit();
                }
              }}
            />
            <Button 
              size="icon" 
              className="absolute right-2 bottom-2 rounded-xl h-10 w-10 shrink-0" 
              onClick={onSubmit} 
              disabled={isSending || !input.trim()}
            >
              {isSending ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
            </Button>
          </div>
          <div className="flex items-center justify-between px-2 pt-2">
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Info className="h-3 w-3" />
              The agent explains its reasoning before any execution.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:col-span-4 h-full">
        <Card className="flex flex-col bg-card/40 backdrop-blur-xl border-border/50 shadow-sm overflow-hidden h-full">
          <CardHeader className="border-b border-border/40 pb-4 bg-background/20">
            <CardTitle className="text-lg">Execution Console</CardTitle>
            <CardDescription>
              Review staged actions and active policies.
            </CardDescription>
          </CardHeader>
          
          <ScrollArea className="flex-1 p-5">
            <div className="space-y-6">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Sparkles className="h-16 w-16 text-primary" />
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  Staged Action
                </div>
                <p className="text-base font-medium text-foreground relative z-10 leading-relaxed">
                  {lastDecision?.summary ?? "Awaiting instruction. Chat with the agent to stage an action."}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/50 bg-background/30 p-4 flex flex-col justify-between">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Active Rules</p>
                  <p className="text-2xl font-bold text-foreground">{rules.filter((rule) => rule.enabled).length}</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-background/30 p-4 flex flex-col justify-between">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Execution</p>
                  <p className="text-sm font-medium text-foreground">Sepolia Wallet</p>
                </div>
              </div>
              
              <Tabs defaultValue="decision" className="w-full">
                <TabsList className="w-full grid grid-cols-2 mb-4 bg-background/50 h-9 p-1">
                  <TabsTrigger value="decision" className="text-xs rounded-md">Reasoning</TabsTrigger>
                  <TabsTrigger value="persona" className="text-xs rounded-md">Context</TabsTrigger>
                </TabsList>
                
                <TabsContent value="decision" className="space-y-3 mt-0 focus-visible:outline-none">
                  {(lastDecision?.reasoning ?? []).length ? (
                    <div className="space-y-2">
                      {(lastDecision?.reasoning ?? []).map((line, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground bg-background/30 p-3 rounded-lg border border-border/30">
                          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                          <span className="leading-relaxed">{line}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-border/50 rounded-xl bg-background/20">
                      <Radar className="h-6 w-6 text-muted-foreground mb-2 opacity-50" />
                      <p className="text-sm text-muted-foreground">No reasoning trail generated yet.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="persona" className="space-y-3 mt-0 focus-visible:outline-none">
                  <div className="rounded-xl border border-border/50 bg-background/30 p-4">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Agent Identity</p>
                    <p className="text-sm font-medium text-foreground">{identity?.ensName ?? "Not assigned"}</p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-background/30 p-4">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Recent Activity</p>
                    <p className="text-sm leading-relaxed text-foreground mt-1 line-clamp-3">{activity[0]?.detail ?? "No recent events logged."}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t border-border/40 bg-background/20">
            <Button 
              className="w-full h-12 shadow-sm font-medium text-sm rounded-xl transition-all" 
              onClick={() => executeDecision()} 
              disabled={isExecuting || !lastDecision}
            >
              {isExecuting ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PlayCircle className="mr-2 h-4 w-4" />
              )}
              Execute Proposed Action
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

