import Phaser from "phaser";

/** The fade every transition uses: 450 ms to the background color. */
const FADE_MS = 450;
const FADE_RGB = [4, 2, 12] as const;

/** A scene that leaves by fading out, then starting another scene. */
export abstract class FadingScene extends Phaser.Scene {
  /** True once a fade-out has begun; reset it in init(). */
  protected leaving = false;

  /** Fades out, then starts the scene `key` with `data`. Ignores repeats. */
  protected fadeTo(key: string, data?: object): void {
    if (this.leaving) return;
    this.leaving = true;
    this.cameras.main.fadeOut(FADE_MS, ...FADE_RGB);
    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start(key, data);
    });
  }
}
