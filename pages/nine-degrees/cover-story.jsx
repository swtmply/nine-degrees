import NineDegreesArticle from "@/components/Articles/NineDegrees/NineDegreesArticle";
import ClientLayout from "@/components/Layouts/ClientLayout";
import { stories } from "@/lib/cover-stories";
import React from "react";

export default function CoverStory() {
  return (
    <ClientLayout category={"nine-degrees"}>
      <section className="bg-black col-span-full grid grid-cols-12 py-16">
        <div className="md:col-span-full col-span-10 col-start-2 md:col-start-0 grid grid-cols-8 my-16 relative">
          <div className="text-white text-xl space-y-4 md:col-span-6 md:col-start-2 col-span-full">
            <h1 className="text-5xl text-center">
              <span>
                OTW: <br />
              </span>
              9 individuals onto their highest form yet
            </h1>
            <p>
              In a highway called life, people are forced to hop on a
              ride-or-die drive towards their greater selves. A trip where they
              experience different colors of living and dying. A trip into
              enlightenment. Youth serves as the path where they pursue and
              experience first blows of change and reality.
            </p>
            <p>
              As vibrant souls, the youth are always on the lookout for what
              best feeds their hearts and minds. While as curious go-getters,
              they are not afraid to take risks. Hence, leading them to a series
              of setbacks, twists and turns, and even failures. This phase in
              their life is the most crucial of all. Signifying the end of their
              young beginning and the beginning of more beginnings. Life at this
              point is eventful. Everything they will experience will shape and
              carve their paths as individuals.
            </p>
            <p>
              Troubles and difficulties are an inevitable fact of life. This is
              one of the core lessons of Buddhist teachings on attaining one’s
              greater self. According to the religion, there are nine levels one
              must ponder upon to experience the fullest of life. Among the
              levels are senses of sight, hearing, smell, taste, and touch;
              reason, subconscious, karma, and wisdom — each of which have their
              own ways of showing struggle and change. Likewise, many youth have
              their own stories reflecting these levels of consciousness.
            </p>
            <p>
              Varying people have varying roads to take. But it might be
              possible that at some point, one might meet another in an
              intersection of shared experiences, pains, and victories.
            </p>
            <div>
              <p className="text-base text-neutral-400 font-bold">
                <span className="text-neutral-600 font-normal">
                  Words by MJ
                </span>{" "}
                Catequista, Kim Leal, Angela Guiral, Alfred Esmilla, Ailla Dela
                Cruz, Khiel Flores, and Mary Grace Paneda
              </p>
              <p className="text-base text-neutral-400 font-bold">
                <span className="text-neutral-600 font-normal">
                  Research by MJ
                </span>{" "}
                Catequista, Kim Leal, Angela Guiral, Alfred Esmilla, Ailla Dela
                Cruz, Khiel Flores, Gea Adlag, Jaymar Aquino, and Mary Grace
                Paneda
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="col-span-full grid grid-cols-12 py-16">
        {stories.map((story, idx) => (
          <NineDegreesArticle story={story} index={idx} key={idx} />
        ))}
      </section>
    </ClientLayout>
  );
}
