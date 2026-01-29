'use client';

import React from 'react';
import { BookText, Bug, Copy, ClipboardPlus, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type AiPanelProps = {
  prompt: string;
  setPrompt: (prompt: string) => void;
  response: string;
  isLoading: boolean;
  activeTab: 'explain' | 'bugs' | 'generate';
  setActiveTab: (tab: 'explain' | 'bugs' | 'generate') => void;
  onSubmit: () => void;
  onInsertCode: (code: string) => void;
};

export function AiPanel({
  prompt,
  setPrompt,
  response,
  isLoading,
  activeTab,
  setActiveTab,
  onSubmit,
  onInsertCode,
}: AiPanelProps) {
  const { toast } = useToast();

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'クリップボードにコピーしました！',
    });
  };

  const renderResponse = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const code = part.replace(/^```\w*\n?/, '').replace(/```$/, '');
        return (
          <div key={index} className="relative my-4 rounded-md bg-secondary">
            <pre className="p-4 text-sm text-secondary-foreground overflow-x-auto font-code rounded-md">
              <code>{code}</code>
            </pre>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7"
              onClick={() => handleCopyToClipboard(code)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        );
      }
      return <p key={index} className="whitespace-pre-wrap text-sm leading-relaxed">{part}</p>;
    });
  };

  const getPromptPlaceholder = () => {
    switch (activeTab) {
      case 'explain':
        return '例：この関数は何をしますか？';
      case 'bugs':
        return '例：パフォーマンスの問題はありますか？（任意）';
      case 'generate':
        return '例：ログインフォームのReactコンポーネント';
      default:
        return '質問を入力してください...';
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="explain">
            <BookText className="w-4 h-4 mr-2" /> 説明
          </TabsTrigger>
          <TabsTrigger value="bugs">
            <Bug className="w-4 h-4 mr-2" /> バグを探す
          </TabsTrigger>
          <TabsTrigger value="generate">
            <Wand2 className="w-4 h-4 mr-2" /> 生成
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-2">
        <Textarea
          placeholder={getPromptPlaceholder()}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[80px] text-sm"
        />
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? '考え中...' : 'AIに送信'}
        </Button>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-lg font-headline">AIの応答</CardTitle>
          {response && activeTab === 'generate' && (
             <Button variant="outline" size="sm" onClick={() => onInsertCode(response)}>
              <ClipboardPlus className="h-4 w-4 mr-2" />
              エディタに挿入
            </Button>
          )}
          {response && activeTab !== 'generate' &&(
             <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(response)}>
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full p-4">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-4 w-[90%]" />
              </div>
            ) : response ? (
              renderResponse(response)
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                AIの応答はここに表示されます。
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
