
interface Props { html: string; }

export function BlogPostContent({ html }: Props) {
  return (
    <div
      className="prose max-w-3xl mx-auto px-4 prose-h2:mt-12 prose-h3:mt-8 prose-ul:list-disc prose-li:leading-7"
       
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
