import { Search } from 'lucide-react';
import imagem from '../assets/img/Frame 5.svg';

export default function Header() {
    return (
        <div className='w-screen h-[129px] bg-gray-100 flex gap-[133px] items-center p-7 '>
            <div><img src={imagem} alt="" /></div>
            <div className="relative flex items-center">
                <input type="text" placeholder="Pesquisar" className="pl-4 pr-10 py-2 border rounded-[40px] focus:outline-none w-[664px] h-[68px] bg-gray-300 text-gray-700" />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Search className='text-gray-700' />
                </div>
            </div>
        </div>
    )
}
