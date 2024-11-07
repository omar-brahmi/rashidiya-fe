import {Component} from '@angular/core';
import {getPhoto, ProcessImageState} from 'src/app/shared/utils/getPhoto';

@Component({
  selector: 'app-upload-contract',
  templateUrl: './upload-contract.component.html',
  styleUrls: ['./upload-contract.component.scss'],
})
export class UploadContractComponent {

  protected readonly ProcessImageState = ProcessImageState;
  processImage: ProcessImageState = ProcessImageState.UPLOAD_IMAGE;

  imageUrl: string | undefined = undefined;

  openCamera() {
    this.processImage = ProcessImageState.IN_PROCESS;
    getPhoto().then((image) => {
      if (image) {
        this.imageUrl = image;
        this.processImage = ProcessImageState.HAS_FINISHED;
      } else {
        this.processImage = ProcessImageState.UPLOAD_IMAGE;
      }
    }).catch(reason => {
      this.processImage = ProcessImageState.UPLOAD_IMAGE;
      console.error("Error capturing or processing image:", reason);
    });
  }

}
