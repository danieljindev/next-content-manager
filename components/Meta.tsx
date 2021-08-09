import Head from 'next/head';

export interface MetaProps {
  title: string;
  keywords?: string;
  author?: string;
  description: string;
}

const Meta: React.FC<MetaProps> = ({ title, keywords, author, description }) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords || ''} />
      <meta name='author' content={author || ''} />
      <meta name='title' content={title} />
      <title>{title}</title>
    </Head>
  );
};

export default Meta;
