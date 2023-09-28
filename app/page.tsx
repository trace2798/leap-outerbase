import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface ImageData {
  id: string;
  height: number;
  width: number;
  prompt: string;
  negativePrompt: string;
  promptStrength: number;
  modelId: string;
  numberOfImages: number;
  seed: number;
  steps: number;
  upscalingOption: string;
  createdAt: string;
  state: string;
  status: string;
  images: Array<{
    id: string;
    uri: string;
    createdAt: string;
  }>;
}

export default async function Home() {
  const allImages = await fetch(
    ` https://spiritual-aqua.cmd.outerbase.io/imageslist`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-cache",
    }
  );
  console.log(allImages);
  const data = await allImages.json();
  console.log(data);

  const prompts = new Set();
  const uniquePromptImages = data.filter((image: ImageData) => {
    if (image.state === "finished" && !prompts.has(image.prompt)) {
      prompts.add(image.prompt);
      return true;
    }
    return false;
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 md:p-24">
      <div className="grid grid-cols-1 2xl:grid-cols-3">
        {uniquePromptImages
          .slice()
          .reverse()
          .map((image: ImageData, index: number) => (
            <Card
              key={index}
              className="p-5 w-[500px] h-[380px] overflow-hidden border-hidden"
            >
              <CardTitle className=" line-clamp-2">{image.prompt}</CardTitle>
              <CardContent className="mt-3 relative max-w-xl h-full">
                <Image
                  src={image.images[0].uri}
                  alt={image.prompt}
                  fill
                  className="rounded-lg"
                  loading="lazy"
                />
              </CardContent>
            </Card>
          ))}
      </div>
    </main>
  );
}
