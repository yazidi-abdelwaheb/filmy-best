import { Component, Input } from '@angular/core';
import { Film } from '../../models/film.model';
import { NgFor, NgIf } from '@angular/common';
import { DurationPipe } from '../../pipes/duration.pipe';


@Component({
  selector: 'app-video-card',
  imports: [NgIf , DurationPipe],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.css',
})
export class VideoCardComponent {
  @Input() film: Film = new Film();

  isPlaying = false;
  isMuted = false;
  progress = 0;
  currentTime = 0;
  subtitlesOn = false;

  showSettings = false;
  showQualityMenu = false;
  currentQuality = '1080p';
  currentSpeed = 1;
  private playbackTimer?: number;

  toggleSettings() {
    this.showSettings = !this.showSettings;
    this.showQualityMenu = false;
  }

  openQualityMenu() {
    this.showQualityMenu = true;
  }

  closeQualityMenu() {
    this.showQualityMenu = false;
  }

  selectQuality(q: string) {
    this.currentQuality = q;
    console.log(`Qualité changée en ${q}`);
    this.showQualityMenu = false;
    this.showSettings = false;
  }

  changeSpeed() {
    this.currentSpeed = this.currentSpeed === 1 ? 1.5 : 1;
    console.log(`Vitesse changée en x${this.currentSpeed}`);
  }

  toggleSubtitles() {
    this.subtitlesOn = !this.subtitlesOn;
    console.log(
      this.subtitlesOn ? 'Sous-titres activés' : 'Sous-titres désactivés'
    );
  }

  togglePlay() {
    // Toggle play/pause
    this.isPlaying = !this.isPlaying;
    console.log(this.isPlaying ? 'Lecture simulée' : 'Pause simulée');

    const totalSeconds = Math.floor(this.film.duration * 60);

    // Pause: arrêter proprement le timer
    if (!this.isPlaying) {
      if (this.playbackTimer) {
        clearInterval(this.playbackTimer);
        this.playbackTimer = undefined;
      }
      return;
    }

    // Play: reprendre depuis currentTime (en minutes) -> convertir en secondes
    let elapsedSeconds = Math.floor(this.currentTime * 60);

    // Éviter les doublons de timer
    if (this.playbackTimer) {
      clearInterval(this.playbackTimer);
    }

    this.playbackTimer = window.setInterval(() => {
      // Fin ou pause
      if (!this.isPlaying || elapsedSeconds >= totalSeconds) {
        clearInterval(this.playbackTimer);
        this.playbackTimer = undefined;
        this.isPlaying = false;
        console.log('Lecture terminée');
        return;
      }

      // Avancer d'une seconde
      elapsedSeconds += 1;

      // Mettre à jour l'état public
      this.progress = (elapsedSeconds / totalSeconds) * 100;
      this.currentTime = elapsedSeconds / 60; // rester en minutes pour le pipe
    }, 1000);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    console.log(this.isMuted ? 'Son coupé (simulé)' : 'Son activé (simulé)');
  }

  openSettings() {
    console.log('Ouvrir paramètres (simulé)');
  }

  toggleFullscreen() {
    const element = document.querySelector('.video-hero') as HTMLElement;
    if (element) {
      if (!document.fullscreenElement) {
        element.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  }

  seek(event: MouseEvent) {
    const bar = event.currentTarget as HTMLElement;
    const clickX = event.offsetX;
    this.progress = (clickX / bar.offsetWidth) * 100;
    this.currentTime = Math.floor((this.progress / 100) * 140);
  }
}
