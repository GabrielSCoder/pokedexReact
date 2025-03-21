import { useEffect, useState } from "react";
import { getImage, saveImage } from "../services/indexDb";

export function useCachedImage(key: string, url: string) {
    const [imageURL, setImageURL] = useState<string>("");

    useEffect(() => {
        async function fetchImage() {
            const cachedImage = await getImage(key);

            if (cachedImage) {
                setImageURL(URL.createObjectURL(cachedImage));
            } else {
                const response = await fetch(url);
                const blob = await response.blob();
                saveImage(key, blob);
                setImageURL(URL.createObjectURL(blob));
            }
        }

        fetchImage();
    }, [key, url]);

    return imageURL;
}

export function useCachedImage2(key: string, url: string) {
    const [imageURL, setImageURL] = useState<string>("");

    useEffect(() => {
        async function loadImage() {
            const cachedImage = await getImage(key);

            if (cachedImage) {
                setImageURL(URL.createObjectURL(cachedImage));
                return;
            }

            setImageURL(url); // Usa a URL original até que seja salva no IndexedDB
        }

        loadImage();
    }, [key, url]);

    // Função chamada quando a imagem terminar de carregar
    async function handleImageLoad() {
        if (imageURL.startsWith("blob:")) return; // Já está salvo

        try {
            const img = await fetch(url);
            const blob = await img.blob();
            saveImage(key, blob);
            console.log(`Imagem salva: ${key}`);
        } catch (error) {
            console.error("Erro ao salvar imagem:", error);
        }
    }

    return { imageURL, handleImageLoad };
}

