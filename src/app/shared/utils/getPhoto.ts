import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

export enum ProcessImageState {
  UPLOAD_IMAGE = 'Upload Image',
  IN_PROCESS = 'In Process',
  HAS_FINISHED = 'Has Finished'
}

export async function getPhoto(): Promise<string | null> {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      width: 1280,
      height: 720,
      correctOrientation: true,
    });
    return image.dataUrl ?? null;
  } catch (error) {
    console.error("Error capturing image:", error);
    return null;
  }
}
