import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {

  @Input() video: any;
  videoUrl: SafeResourceUrl;
  @Input() returnToHome;

  constructor() { }

  ngOnInit() {
  }

  setVideoToWatch() {
    if (this.video.playlistId) return this.videoUrl = `https://www.youtube.com/embed/videoseries?list=${this.video.playlistId}`;
    if (this.video.videoId) return this.videoUrl = `https://www.youtube.com/embed/${this.video.videoId}`;
  }

}
