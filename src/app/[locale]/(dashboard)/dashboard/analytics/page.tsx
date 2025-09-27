import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // const t = await getTranslations();
  return {
    title: 'Analytics',
  };
}

function AnalyticsPage() {
  return <div></div>;
}

export default AnalyticsPage;
