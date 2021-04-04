import { Component, ElementRef, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Prediction } from './predictions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imageSrc: string="http://192.168.29.19:81/stream";
  
  @ViewChild('img') video: ElementRef;
  predictions: Prediction[];
  model: any;
  loading = true;
  constructor() { }

  async ngOnInit() {
    console.log('loading mobilenet model...');
    this.model = await mobilenet.load();
    console.log('Sucessfully loaded model');
    this.loading = false;

    setInterval(async () => {
      this.predictions = await this.model.classify(this.video.nativeElement);
      await tf.nextFrame();
    }, 3000);
  }

  async ngAfterViewInit() {
    const vid = this.video.nativeElement;

    // if (navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices.getUserMedia({ video: true })
    //     .then((stream) => {
    //       vid.srcObject = stream;

    //     })
    //     .catch((err0r) => {
    //       console.log('Something went wrong!');
    //     });
    // }
  }
}
