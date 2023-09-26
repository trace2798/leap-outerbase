import Image from "next/image";

export default async function Home() {
  const allImages = await fetch(
    `https://api.tryleap.ai/api/v1/images/models/26a1a203-3a46-42cb-8cfa-f4de075907d8/inferences?onlyFinished=false`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        authorization: "Bearer bd130c31-55ab-46a6-97f9-ca7843aae065",
      },
    }
  );
  const data = await allImages.json();
  const finishedImages = data.filter((image) => image.state === "finished");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 md:p-24">
      <div className="space-y-4 grid grid-cols-1 2xl:grid-cols-2">
        {finishedImages
          .slice()
          .reverse()
          .map((image: any, index: any) => (
            <div key={index} className="flex flex-col md:flex-row">
              <Image
                src={image.images[0].uri}
                alt={image.prompt}
                width={500}
                height={500}
                className="rounded-lg"
              />

              <p className="md:ml-5">{image.prompt}</p>
            </div>
          ))}
      </div>
    </main>
  );
}
