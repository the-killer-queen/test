import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // const t = await getTranslations();
  return {
    title: 'Reports',
  };
}

function ReportsPage() {
  return <div></div>;
}

export default ReportsPage;
