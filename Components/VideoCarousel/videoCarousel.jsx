'use client'
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
import VideoCard from "../VideoCard/VideoCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import './Videocarousel.scss'

const videos = [
    { id: "1", videoId: "3z_qM9PI9x4", title: "Amazing Makeover for 14 Years Old Kitchen" },
    { id: "2", videoId: "MVI0FO6Hup0", title: "TV unit before after" },
    { id: "3", videoId: "uEfLE2Wad-Q", title: "14 years old kitchen makeovers in Dubai" },
    { id: "4", videoId: "Kns79yGhDK0", title: "Made a beautiful balcony for an Airbnb apartment in Dubai" },
    { id: "5", videoId: "atRIdFiMdMI", title: "TV unit in Modern Design" },
    { id: "6", videoId: "jELktdt1wNw", title: "14 years old apartment renovation in Dubai" },
    { id: "7", videoId: "nGrVdf0MPWU", title: "Beautiful Mirror Shelf" },
    { id: "8", videoId: "XELxU-t9jJs", title: "Before and After look of an Airbnb Apartment in Dubai" },
];

const VideoCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
    });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [playingVideoId, setPlayingVideoId] = useState(null); // null or string (video id)

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section className="w-full px-16 py-8 gallery">
            <p>Video Gallery</p>
            <h2>
                Featured Videos
            </h2>

            <div className="relative ">
                <div ref={emblaRef} className="overflow-hidden">
                    <div className="flex gap-4 md:gap-6">
                        {videos.map((video) => (
                            <div
                                key={video.id}
                                className="shrink-0 w-[85%] sm:w-[45%] lg:w-[31%] pr-5"
                            >
                                <VideoCard
                                    videoId={video.videoId}
                                    title={video.title}
                                    isPlaying={playingVideoId === video.id}
                                    onPlay={() => setPlayingVideoId(video.id)}
                                    onStop={() => setPlayingVideoId(null)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="changeSlide">
                <button
                    onClick={scrollPrev}
                    disabled={!canScrollPrev}
                ><FaArrowLeft className="text-3xl"/></button>
                <button
                    onClick={scrollNext}
                    disabled={!canScrollNext}
                ><FaArrowRight className="text-3xl"/></button>
            </div>
        </section>
    );
};

export default VideoCarousel;