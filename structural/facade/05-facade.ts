/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../../helpers/colors.ts";

class Projector {
  on() {
    console.log("Projector on", COLORS.green);
  }

  off() {
    console.log("Projector off", COLORS.red);
  }
}

class SoundSystem {
  on() {
    console.log("Sound system on", COLORS.green);
  }

  off() {
    console.log("Sound system off", COLORS.red);
  }

  setVolume(level: number) {
    console.log(`Sound system volume set to ${level}`);
  }
}

class VideoPlayer {
  on() {
    console.log("Video player on", COLORS.green);
  }

  off() {
    console.log("Video player off", COLORS.red);
  }

  play(movie: string) {
    console.log(`Playing movie: ${movie}`, COLORS.blue);
  }

  stop() {
    console.log("Video player stopped", COLORS.red);
  }
}

class PopcornPopper {
  on() {
    console.log("Popcorn popper on", COLORS.green);
  }

  off() {
    console.log("Popcorn popper off", COLORS.red);
  }
}

interface HomeTheaterFacadeOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornPopper: PopcornPopper;
}

class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornPopper: PopcornPopper;

  constructor({
    projector,
    soundSystem,
    videoPlayer,
    popcornPopper,
  }: HomeTheaterFacadeOptions) {
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
    this.popcornPopper = popcornPopper;
  }

  watchMovie(movie: string) {
    console.log("Get ready to watch a movie...");
    this.popcornPopper.on();
    this.projector.on();
    this.soundSystem.on();
    this.soundSystem.setVolume(5);
    this.videoPlayer.on();
    this.videoPlayer.play(movie);
  }

  pauseMovie() {
    console.log("Pausing the movie...");
    this.videoPlayer.stop();
  }

  endMovie() {
    console.log("Shutting down the home theater...");
    this.popcornPopper.off();
    this.projector.off();
    this.soundSystem.off();
    this.videoPlayer.stop();
    this.videoPlayer.off();
  }
}

function getMovieName(): string {
  const movieName = prompt("Introduce el nombre de la película:");
    if (!movieName) {
        return getMovieName();
    }
    return movieName;
}

function main() {
  const projector = new Projector();
  const soundSystem = new SoundSystem();
  const videoPlayer = new VideoPlayer();
  const popcornPopper = new PopcornPopper();

  const homeTheater = new HomeTheaterFacade({
    projector,
    soundSystem,
    videoPlayer,
    popcornPopper,
  });

  let movieName = getMovieName();
  homeTheater.watchMovie(movieName);
}

main();
