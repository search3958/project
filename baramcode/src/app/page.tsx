'use client';

import { useState, useTransition } from 'react';
import { Bot, FileCode, FilePlus, FlaskConical, FolderPlus, Menu, Shrink, Wand2 } from 'lucide-react';
import { CodeEditor } from '@/components/code-editor';
import { AiPanel } from '@/components/ai-panel';
import { handleExplain, handleFindBugs, handleGenerateCode } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { editableFiles as initialFiles } from '@/lib/editable-files';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Basic formatter to trim whitespace and normalize line endings.
function formatCode(code: string): string {
  const lines = code.replace(/\r\n/g, '\n').split('\n');
  const formattedLines = lines.map(line => line.trimEnd());
  return formattedLines.join('\n');
}

// Basic minifier to remove comments and blank lines.
function minifyCode(code: string): string {
  // 1. Remove multi-line comments
  let minified = code.replace(/\/\*[\s\S]*?\*\//g, '');
  // 2. Remove single-line comments
  minified = minified.replace(/\/\/[^\r\n]*/g, '');
  // 3. Trim each line and remove empty lines
  const lines = minified.split('\n');
  const nonEmptyLines = lines.map(line => line.trim()).filter(line => line.length > 0);
  // 4. Join the lines back together. This preserves necessary newlines for languages like JS.
  return nonEmptyLines.join('\n');
}

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

  const onFormat = () => {
    try {
      const formattedCode = formatCode(files[activeFile] ?? '');
      handleCodeChange(formattedCode);
      toast({ title: '成功', description: 'コードが整形されました。' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'エラー', description: 'コードの整形に失敗しました。' });
    }
  };

  const onMinify = () => {
    try {
      const minifiedCode = minifyCode(files[activeFile] ?? '');
      handleCodeChange(minifiedCode);
      toast({ title: '成功', description: 'コードが圧縮されました。' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'エラー', description: 'コードの圧縮に失敗しました。' });
    }
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
          setResponse('```javascript\n' + result.code + '\n```');
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
    const cleanedCode = generatedCode.replace(/^```(\w*\n)?/, '').replace(/```$/, '');
    const currentCode = files[activeFile] || '';
    handleCodeChange(`${currentCode}\n\n${cleanedCode}`);
    toast({ title: '成功', description: 'コードがエディタに挿入されました。' });
  }

  const handleNewFile = () => {
    const filePath = window.prompt("新しいファイルへのパスを入力してください（例: src/components/new.tsx）:");
    if (filePath) {
      if (files[filePath] !== undefined) {
        toast({ variant: "destructive", title: "エラー", description: "同じ名前のファイルが既に存在します。" });
        return;
      }
      const newFiles = { ...files, [filePath]: `` };
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
      const newFiles = { ...files, [filePath]: `` };
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
             <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onFormat} disabled={isPending || isLoading}>
                <Wand2 className="w-3 h-3 mr-1" /> 整形
              </Button>
              <Button variant="outline" size="sm" onClick={onMinify} disabled={isPending || isLoading}>
                <Shrink className="w-3 h-3 mr-1" /> 圧縮
              </Button>
            </div>
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
