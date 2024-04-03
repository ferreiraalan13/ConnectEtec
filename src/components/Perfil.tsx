import { Box } from "@chakra-ui/react";
import userImage from "../assets/img/1702865313114.jpeg";

export default function Perfil() {
    return (
        <Box
        className="flex flex-col gap-5"
        bg="white"
        w="800px"
        h="500px"
        padding="10px"
        borderRadius={"16px"}
        marginLeft={'310px'}>
            <div className="flex gap-2 flex-col w-full">
                <div className="flex bg-red-300 text-gray-700 items-center gap-3 p-2 rounded-lg h-{78px} ">
                    <img
                        className="w-[50px] rounded-full bg-gray-300"
                        src={userImage}
                        alt=""
                    />
                    Fulano <span className="text-gray-500">@Fulano</span>
                </div>
            </div>
        </Box>

    )
}