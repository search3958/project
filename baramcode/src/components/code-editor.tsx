'use client';

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
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join('\n');

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
