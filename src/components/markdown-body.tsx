"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";

const Wrapper = styled.div`
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.75;

  h1, h2, h3, h4 {
    color: var(--text-primary);
    font-family: var(--font-display);
    margin: 1.5em 0 0.6em;
    font-weight: 600;
  }
  h1 { font-size: 1.75rem; }
  h2 { font-size: 1.4rem; }
  h3 { font-size: 1.15rem; }

  p { margin: 0 0 1em; }

  a {
    color: var(--accent-primary);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  ul, ol {
    margin: 0 0 1em 1.25rem;
  }

  li { margin-bottom: 0.35em; }

  code {
    font-family: var(--font-mono);
    font-size: 0.9em;
    background: var(--bg-tertiary);
    padding: 0.15em 0.4em;
    border-radius: 6px;
  }

  pre {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 1rem 1.25rem;
    overflow-x: auto;
    margin: 1.25em 0;

    code {
      background: none;
      padding: 0;
    }
  }

  blockquote {
    margin: 1em 0;
    padding-left: 1rem;
    border-left: 3px solid var(--accent-primary);
    color: var(--text-muted);
  }

  img {
    max-width: 100%;
    border-radius: var(--radius-md);
  }

  hr {
    border: none;
    border-top: 1px solid var(--border-color);
    margin: 2rem 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    font-size: 0.95rem;
  }
  th, td {
    border: 1px solid var(--border-color);
    padding: 0.5rem 0.75rem;
    text-align: left;
  }
  th {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }
`;

type Props = {
  markdown: string;
  className?: string;
};

export function MarkdownBody({ markdown, className }: Props) {
  return (
    <Wrapper className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </Wrapper>
  );
}
