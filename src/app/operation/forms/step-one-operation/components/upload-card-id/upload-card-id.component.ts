import {Component, EventEmitter, Output} from '@angular/core';
import {detectTextFromImage} from './utils/detectTextFromImage';
import {getPhoto, ProcessImageState} from "../../../../../shared/utils/getPhoto";

@Component({
  selector: 'app-upload-card-id',
  templateUrl: './upload-card-id.component.html',
  styleUrls: ['./upload-card-id.component.scss'],
})
export class UploadCardIdComponent {

  @Output() cardScanned = new EventEmitter<{
    imageUrl: string,
    cardNumber: string | null,
    firstName: string | null,
    lastName: string | null
  }>();

  protected readonly ProcessImageState = ProcessImageState;
  processImage: ProcessImageState = ProcessImageState.UPLOAD_IMAGE;

  imageUrl: string | undefined = undefined;

  openCamera() {
    this.processImage = ProcessImageState.IN_PROCESS;
    getPhoto().then((image) => {
      if (image) {
        this.imageUrl = image;
        detectTextFromImage(image)
          .then((text: {
            cardID: string,
            firstName: string,
            lastname: string
          }) => {
            this.processImage = ProcessImageState.HAS_FINISHED;
            this.cardScanned.emit({
              imageUrl: image,
              cardNumber: text.cardID,
              firstName: text.firstName,
              lastName: text.lastname
            });
          })
          .catch((error: any) => {
            console.error("Error detecting text:", error);
            this.processImage = ProcessImageState.UPLOAD_IMAGE;
          });
      } else {
        this.processImage = ProcessImageState.UPLOAD_IMAGE;
      }
    }).catch(reason => {
      this.processImage = ProcessImageState.UPLOAD_IMAGE;
      console.error("Error capturing or processing image:", reason);
    });
  }

}