import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Messages',
  description: 'Message interface for Bulder platform'
};

export default function MessagesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full">{children}</div>;
}
