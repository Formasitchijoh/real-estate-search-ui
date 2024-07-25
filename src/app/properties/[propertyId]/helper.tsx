import toast from "react-hot-toast";
import { useLayoutEffect, useRef } from "react";
import "pannellum/build/pannellum.css";
import "pannellum";

interface VirtualTourProps {
  imageUrls: string[];
}

const VirtualTour: React.FC<VirtualTourProps> = ({ imageUrls }) => {
  const panoramaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (panoramaRef.current && imageUrls?.length > 0) {
      const scenes = imageUrls.reduce((acc, url, index) => {
        const sceneId = `scene${index + 1}`;
        acc[sceneId] = {
          panorama: url,
          hotSpots: imageUrls
            .map((_, hotspotIndex) => {
              if (hotspotIndex !== index) {
                return {
                  pitch: 10 * (hotspotIndex + 1),
                  yaw: 150 * (hotspotIndex + 1),
                  type: "scene",
                  text: `Go to Image ${hotspotIndex + 1}`,
                  sceneId: `scene${hotspotIndex + 1}`,
                };
              }
              return null;
            })
            .filter((hotspot) => hotspot !== null),
        };
        return acc;
      }, {});

      const pannellumInstance = window.pannellum.viewer(panoramaRef.current, {
        type: "equirectangular",
        panorama: imageUrls[0],
        autoLoad: true,
        scenes,
      });

      return () => {
        pannellumInstance.destroy();
      };
    }
  }, [imageUrls]);

  return (
    <div
      ref={panoramaRef}
      id="panorama"
      style={{ width: "100%", height: "500px" }}
    ></div>
  );
};

export default VirtualTour;

export const successnotify = () =>
  toast.success("Item Bookmarked successfully.", {
    duration: 4000,
    position: "top-center",
    // Custom Icon
    icon: "👏",

    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },

    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
export const errornotify = () =>
  toast.error("Please login to make a bookmark.", {
    duration: 4000,
    position: "top-center",
    // Custom Icon
    icon: "👏",

    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },

    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });

