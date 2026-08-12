export default async function DetailBeritaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8">Detail Berita: {slug}</h1>
      <p className="text-slate-600">Halaman ini sedang dalam pengembangan.</p>
    </div>
  );
}
