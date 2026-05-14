import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#F5F5F3] min-h-screen flex items-center justify-center px-4 py-32">
      <div className="text-center max-w-lg mx-auto">
        <p className="text-[9rem] font-black leading-none text-[#1E3A7B] select-none">
          404
        </p>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">
          Pagina non trovata
        </h1>
        <p className="mt-4 text-gray-500 leading-relaxed">
          La pagina che cerchi non esiste o è stata spostata.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E3A7B] text-white font-semibold text-sm hover:bg-[#162d61] transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            Torna alla Home
          </Link>
          <Link
            href="/contatti"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#1E3A7B] text-[#1E3A7B] font-semibold text-sm hover:bg-[#1E3A7B] hover:text-white transition-all duration-200"
          >
            <Phone size={16} />
            Contattaci
          </Link>
        </div>
      </div>
    </div>
  );
}
