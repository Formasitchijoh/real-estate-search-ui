declare module 'pannellum/build/pannellum.js' {
    const pannellum: {
      viewer: (
        element: string | HTMLElement,
        config: {
          type: string;
          panorama: string;
          autoLoad: boolean;
          scenes?: {
            [key: string]: {
              panorama: string;
              hotSpots: {
                pitch: number;
                yaw: number;
                type: string;
                text: string;
                sceneId: string;
              }[];
            };
          };
        }
      ) => void;
    };
    export default pannellum;
  }
  