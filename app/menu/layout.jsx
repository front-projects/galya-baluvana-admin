import Navigation from '../components/Navigation';

export default function Layout({ children }) {
  return (
    <section className="w-screen h-[100dvh]">
      <Navigation />
      <div style={{ height: 'calc(100dvh - 60px)' }} className="p-4 pb-10">
        {children}
      </div>
    </section>
  );
}
