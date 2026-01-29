export const editableFiles: Record<string, string> = {
  'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>AI Code Alchemist</title>
</head>
<body>
  <h1>Welcome to AI Code Alchemist</h1>
  <p>You can now edit HTML files!</p>
</body>
</html>`,
  'src/app/page.tsx': `'use client';

import { useState, useTransition } from 'react';
import { Bot, FileCode, FilePlus, FlaskConical, FolderPlus, Menu } from 'lucide-react';
import { CodeEditor } from '@/components/code-editor';
import { AiPanel } from '@/components/ai-panel';
import { handleExplain, handleFindBugs, handleGenerateCode } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { editableFiles as initialFiles } from '@/lib/editable-files';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function IDEPage() {
  const [sidebarView, setSidebarView] = useState<'files' | 'ai'>('files');
  const [files, setFiles] = useState<Record<string, string>>(initialFiles);
  const [activeFile, setActiveFile] = useState<string>(Object.keys(initialFiles)[0]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'explain' | 'bugs' | 'generate'>('explain');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleCodeChange = (newCode: string) => {
    setFiles(prevFiles => ({
      ...prevFiles,
      [activeFile]: newCode,
    }));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setResponse('');
    
    startTransition(async () => {
      let result;
      try {
        const code = files[activeFile] || '';
        if (activeTab === 'explain') {
          if (!prompt) {
            toast({ variant: 'destructive', title: 'エラー', description: '質問を入力してください。' });
            setIsLoading(false);
            return;
          }
          result = await handleExplain({ code, question: prompt });
          setResponse(result.explanation);
        } else if (activeTab === 'bugs') {
          result = await handleFindBugs({ code, question: prompt || 'コード内のバグを見つける' });
          setResponse(result.bugFindings);
        } else if (activeTab === 'generate') {
          if (!prompt) {
            toast({ variant: 'destructive', title: 'エラー', description: 'コードを生成するためのプロンプトを入力してください。' });
            setIsLoading(false);
            return;
          }
          result = await handleGenerateCode({ prompt });
          setResponse('\\\`\\\`\\\`javascript\\n' + result.code + '\\n\\\`\\\`\\\`');
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'エラーが発生しました',
          description: 'AIからの応答の取得に失敗しました。もう一度お試しください。',
        });
      } finally {
        setIsLoading(false);
      }
    });
  };

  const handleInsertCode = (generatedCode: string) => {
    const cleanedCode = generatedCode.replace(/^\\\`\\\`\\\`(\\w*\\n)?/, '').replace(/\\\`\\\`\\\`$/, '');
    const currentCode = files[activeFile] || '';
    handleCodeChange(\`\${currentCode}\\n\\n\${cleanedCode}\`);
    toast({ title: '成功', description: 'コードがエディタに挿入されました。' });
  }

  const handleNewFile = () => {
    const filePath = window.prompt("新しいファイルへのパスを入力してください（例: src/components/new.tsx）:");
    if (filePath) {
      if (files[filePath] !== undefined) {
        toast({ variant: "destructive", title: "エラー", description: "同じ名前のファイルが既に存在します。" });
        return;
      }
      const newFiles = { ...files, [filePath]: \`\` };
      setFiles(newFiles);
      setActiveFile(filePath);
      setIsMobileSidebarOpen(false);
    }
  };

  const handleNewFolder = () => {
    const filePath = window.prompt("新しいフォルダ内に作成するファイルへのパスを入力してください（例: src/new-folder/file.ts）:");
    if (filePath) {
      if (files[filePath] !== undefined) {
        toast({ variant: "destructive", title: "エラー", description: "同じ名前のファイルが既に存在します。" });
        return;
      }
      const newFiles = { ...files, [filePath]: \`\` };
      setFiles(newFiles);
      setActiveFile(filePath);
      setIsMobileSidebarOpen(false);
    }
  };

  const sidebarContent = (
    <>
      {sidebarView === 'files' && (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-2 border-b">
            <h2 className="text-lg font-semibold px-2">ファイル</h2>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNewFile} title="新しいファイル">
                <FilePlus className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNewFolder} title="新しいフォルダ">
                <FolderPlus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <ul>
              {Object.keys(files).sort().map(path => (
                <li key={path}>
                  <button
                    onClick={() => {
                      setActiveFile(path)
                      setIsMobileSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-accent",
                      activeFile === path && 'bg-primary/10 text-primary'
                    )}
                  >
                    {path}
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      )}
      {sidebarView === 'ai' && (
        <div className="h-full p-4">
          <AiPanel
            prompt={prompt}
            setPrompt={setPrompt}
            response={response}
            isLoading={isLoading || isPending}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSubmit={handleSubmit}
            onInsertCode={handleInsertCode}
          />
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-sans">
      <header className="flex items-center justify-between gap-2 px-4 py-3 border-b shrink-0 h-14">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-headline font-semibold text-foreground">
            AIコードアルケミスト
          </h1>
        </div>
        <div className="md:hidden">
          <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[300px]">
              <SheetTitle className="sr-only">モバイルサイドバー</SheetTitle>
              <SheetDescription className="sr-only">
                ファイルとAIアシスタントを切り替えます。
              </SheetDescription>
              <div className="flex h-full">
                <div className="flex flex-col items-center gap-2 p-2 bg-card border-r h-full">
                  <button
                    onClick={() => setSidebarView('files')}
                    className={cn("p-2 rounded-md hover:bg-accent", sidebarView === 'files' && 'bg-accent text-accent-foreground')}
                    title="ファイル"
                  >
                    <FileCode className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSidebarView('ai')}
                    className={cn("p-2 rounded-md hover:bg-accent", sidebarView === 'ai' && 'bg-accent text-accent-foreground')}
                    title="AIアシスタント"
                  >
                    <Bot className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex-1">
                  {sidebarContent}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex h-full">
          <div className="flex flex-col items-center gap-2 p-2 bg-card border-r">
            <button
              onClick={() => setSidebarView('files')}
              className={cn(
                "p-2 rounded-md hover:bg-accent",
                sidebarView === 'files' && 'bg-accent text-accent-foreground'
              )}
              title="ファイル"
            >
              <FileCode className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSidebarView('ai')}
              className={cn(
                "p-2 rounded-md hover:bg-accent",
                sidebarView === 'ai' && 'bg-accent text-accent-foreground'
              )}
              title="AIアシスタント"
            >
              <Bot className="w-6 h-6" />
            </button>
          </div>
          <div className={cn(
            "bg-card border-r transition-all duration-300 ease-in-out",
            sidebarView ? 'w-full max-w-sm md:max-w-md' : 'w-0'
          )}>
            {sidebarContent}
          </div>
        </div>

        {/* Editor */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="p-2 border-b text-sm text-muted-foreground bg-card font-mono flex items-center justify-between">
            <span>{activeFile}</span>
          </div>
          <div className="flex-1 overflow-auto">
            <CodeEditor
              code={files[activeFile] ?? ''}
              setCode={handleCodeChange}
              fileName={activeFile}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
`,
  'src/app/actions.ts': `'use server';

import { explainCodeSnippet, type ExplainCodeSnippetInput, type ExplainCodeSnippetOutput } from '@/ai/flows/explain-code-snippet';
import { findBugsInCode, type FindBugsInCodeInput, type FindBugsInCodeOutput } from '@/ai/flows/find-bugs-in-code';
import { generateCode, type GenerateCodeInput, type GenerateCodeOutput } from '@/ai/flows/generate-code-from-prompt';

export async function handleExplain(input: ExplainCodeSnippetInput): Promise<ExplainCodeSnippetOutput> {
  try {
    const result = await explainCodeSnippet(input);
    return result;
  } catch (error) {
    console.error('Error in handleExplain:', error);
    throw new Error('Failed to explain code.');
  }
}

export async function handleFindBugs(input: FindBugsInCodeInput): Promise<FindBugsInCodeOutput> {
  try {
    const result = await findBugsInCode(input);
    return result;
  } catch (error) {
    console.error('Error in handleFindBugs:', error);
    throw new Error('Failed to find bugs in code.');
  }
}

export async function handleGenerateCode(input: GenerateCodeInput): Promise<GenerateCodeOutput> {
  try {
    const result = await generateCode(input);
    return result;
  } catch (error) {
    console.error('Error in handleGenerateCode:', error);
    throw new Error('Failed to generate code.');
  }
}
`,
  'src/components/ai-panel.tsx': `'use client';

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
    const parts = text.split(/( \\\`\\\`\\\`[\\s\\S]*?\\\`\\\`\\\` )/g);

    return parts.map((part, index) => {
      if (part.startsWith('\\\`\\\`\\\`')) {
        const code = part.replace(/^\\\`\\\`\\\`\\w*\\n?/, '').replace(/\\\`\\\`\\\`$/, '');
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
`,
  'src/components/code-editor.tsx': `'use client';

import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  fileName: string;
}

export function CodeEditor({ code, setCode, fileName }: CodeEditorProps) {
  const getLanguage = (fileName: string) => {
    const extension = fileName.split('.').pop() ?? '';
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'jsx':
        return 'jsx';
      case 'ts':
        return 'typescript';
      case 'tsx':
        return 'tsx';
      case 'html':
        return 'markup';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      default:
        return 'clike';
    }
  };

  const language = getLanguage(fileName);

  const highlightWithLineNumbers = (code: string) =>
    highlight(code, languages[language] || languages.clike, language)
      .split('\\n')
      .map((line, i) => \`<span class='editorLineNumber'>\${i + 1}</span>\${line}\`)
      .join('\\n');

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 p-0 flex flex-row overflow-hidden rounded-lg">
        <ScrollArea className="h-full w-full bg-[#2d2d2d] rounded-lg">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={highlightWithLineNumbers}
            padding={16}
            textareaId="code-editor"
            className="editor font-code text-sm"
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 14,
              outline: 'none',
              border: 'none',
              backgroundColor: 'transparent',
              caretColor: 'white',
              minHeight: '100%',
            }}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
`,
  'src/lib/placeholder-code.ts': `export const defaultCode = \`// Welcome to AI Code Alchemist!
// Use the file explorer to select a file to edit.
// Use the AI panel to generate, explain, or debug your code.
\`;
`,
};
