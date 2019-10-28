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
      position?: Position;
      offsetH?: number;
      offsetV?: number;
      width?: number;
      height?: number;
      padding?: number;
      fadeDelay?: number | null;
      hideOnReady?: boolean;
    }

    enum Position {
      TopLetf = 'top-left',
      TopRight = 'top-right',
      BottomLeft = 'bottom-left',
      BottomRight = 'bottom-right'
    }
  }

  interface VideoJsPlayer {
    logo(options?: VideoJsLogo.Options): VideoJsLogo;
  }
}
