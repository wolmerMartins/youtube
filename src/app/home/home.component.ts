import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  search: string;
  videos: any = {};
  selectedVideo: any = {};

  constructor(private _http: HttpService) { }

  ngOnInit() {
  }

  searchVideos() {
    this.selectedVideo = {};
    this._http.getVideos(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.search}&key=AIzaSyDMyf0zj096EilXTyUEsHw-4Y34rBn2PnI`).subscribe(data => {
      this.videos = data;
      this.scrollToTop()
    });
  }

  getVideoId(videoId) {
    this.selectedVideo = videoId;
  }

  getSelectedVideo() {
    return JSON.stringify(this.selectedVideo) !== '{}';
  }

  @Output() returnToHome = () => {
    this.selectedVideo = {};
  }

  scrollToTop() {
    window.scrollTo(window.scrollY, 0);
  }

  disabledPrevButton() {
    return this.videos.prevPageToken === undefined;
  }

  prevPage() {
    this._http.getVideos(`https://www.googleapis.com/youtube/v3/search?pageToken=${this.videos.prevPageToken}&part=snippet&q=${this.search}&key=AIzaSyDMyf0zj096EilXTyUEsHw-4Y34rBn2PnI`).subscribe(data => {
      this.videos = data;
      this.scrollToTop();
    })
  }

  disabledNextButton() {
    return this.videos.nextPageToken === undefined;
  }

  nextPage() {
    this._http.getVideos(`https://www.googleapis.com/youtube/v3/search?pageToken=${this.videos.nextPageToken}&part=snippet&q=${this.search}&key=AIzaSyDMyf0zj096EilXTyUEsHw-4Y34rBn2PnI`).subscribe(data => {
      this.videos = data;
      this.scrollToTop();
    });
  }

}
