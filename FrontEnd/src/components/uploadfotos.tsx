import { useState } from "react";

interface UploadFotosProps {
  onFotosSelecionadas?: (base64s: string[]) => void;
}

function UploadFotos({ onFotosSelecionadas }: UploadFotosProps) {
  const limiteFotos = 3;
  const [previews, setPreviews] = useState<string[]>([]);

  function handleFotosChange(event: React.ChangeEvent<HTMLInputElement>) {
    const arquivos = Array.from(event.target.files || []);

    if (arquivos.length > limiteFotos) {
      alert(`Você pode enviar no máximo ${limiteFotos} imagens.`);
      event.target.value = "";
      return;
    }

    const readers = arquivos.map(
      (arquivo) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(arquivo);
        }),
    );

    Promise.all(readers).then((base64s) => {
      setPreviews(base64s);
      onFotosSelecionadas?.(base64s);
    });
  }

  return (
    <div>
      <label className="block text-[16px] font-semibold text-black">
        Fotos do evento
      </label>

      <label className="mt-2 flex h-[120px] w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-[#C96A3D] bg-[#E8E1E1] text-[#6B6B6B]">
        {previews.length === 0
          ? "Clique para adicionar até 3 fotos"
          : `${previews.length} foto${previews.length > 1 ? "s" : ""} selecionada${previews.length > 1 ? "s" : ""} ✓`}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFotosChange}
          className="hidden"
        />
      </label>

      {previews.length > 0 && (
        <div className="mt-3 flex gap-3">
          {previews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Foto ${i + 1}`}
              className="h-20 w-20 rounded-md object-cover border border-[#C96A3D]"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UploadFotos;
