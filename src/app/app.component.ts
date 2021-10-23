import {Component, HostListener, OnInit} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public width: number = 0;
  public height: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;
    this.width = win.innerWidth;
    this.height = win.innerHeight;
  }

  // toggle webcam on/off
  public showWebcam = true;
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = {} as WebcamImage;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  public ngOnInit(): void {
    this.onResize();
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
