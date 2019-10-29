import videojs, { VideoJsPlayer } from "video.js";

declare module "video.js" {
  class VideoJsLogo {
    show(): void;
    hide(): void;
  }

  namespace VideoJsLogo {
    interface Options {
      image: string;
      url?: string;
      position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
      offsetH?: number;
      offsetV?: number;
      width?: number;
      height?: number;
      padding?: number;
      fadeDelay?: number | null;
      hideOnReady?: boolean;
    }
  }

  interface VideoJsPlayer {
    logo(options?: VideoJsLogo.Options): VideoJsLogo;
  }
}
