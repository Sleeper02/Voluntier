
function UploadFotos () {

    const limiteFotos = 3;

    function handleFotosChange(event: React.ChangeEvent<HTMLInputElement>) {
        const arquivos = Array.from(event.target.files || []);

        if (arquivos.length> limiteFotos) {
            alert(`Você pode enviar no máximo ${limiteFotos} imagens.`);
            event.target.value = "";
            return;
        }

        console.log(arquivos);
    }

    return (

        <div>
            
            <label className="block text-[16px] font-semibold text-black">
                Fotos do evento
            </label>

            <label className="mt-2 flex h-[120px] w-full cursor-pointer items-center justify-center rounded-md border-2 border-dasher border-[#C96A3D] bg-[#E8E1E1] text-[#6B6B6B]">
                Clique para adicionar até 3 fotos

                <input
                    type="file"
                    accept="image/"
                    multiple
                    onChange={handleFotosChange}
                    className="hidden"
                />
            </label>
        </div>
    );

}

export default UploadFotos;