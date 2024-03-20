import { Home, PartyPopper, Settings, Users } from 'lucide-react';
import userImage from '../assets/img/1702865313114.jpeg';

export default function Menu(){
    return(
        <div className="bg-gray-100 flex flex-col w-[276px] p-[15px] gap-[100px] h-screen rounded-[16px]">
            <div className="flex gap-2 flex-col w-3 w-full">
                <button className='flex bg-gray-300 text-gray-700 items-center gap-3 p-2 rounded-lg h-{78px} '><img className='w-[50px] rounded-full bg-gray-300' src={userImage} alt="" />Fulano  <span className='text-gray-500'>@Fulano</span></button>
            </div>
            <div className="flex flex-col w-3 w-full gap-[10px] ">
                <button className="bg-gray-300 text-gray-700 flex gap-3 p-2 rounded-lg"> <Home/>Inicio</button>
                <button className="bg-gray-300 text-gray-700 flex gap-3 p-2 rounded-lg"> <Users/>Amigos</button>
                <button className="bg-gray-300 text-gray-700 flex gap-3 p-2 rounded-lg"> <PartyPopper/>Eventos</button>
                <button className="bg-gray-300 text-gray-700 flex gap-3 p-2 rounded-lg"> <Settings/>Configuracao</button>
            </div>
        </div>
    )
}