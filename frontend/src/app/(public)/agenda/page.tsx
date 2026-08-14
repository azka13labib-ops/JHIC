import Link from "next/link";
import Image from "next/image";
import { getAgendas } from "@/lib/api/school";

export const revalidate = 60; // Revalidate every minute

export default async function AgendaPage() {
  const agendas = await getAgendas();

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Agenda Sekolah</h1>
      <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
        Jadwal kegiatan dan acara penting seputar SMA PGRI 1 Lumajang.
      </p>

      {agendas.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-lg">Belum ada agenda yang dijadwalkan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agendas.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <span className="text-4xl">📅</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-center text-xs text-slate-500 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-bold">
                    {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h2>
                {item.location && (
                  <p className="text-sm text-slate-500 mb-3 flex items-center gap-1">
                    📍 {item.location}
                  </p>
                )}
                <p className="text-slate-600 line-clamp-3 grow">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
