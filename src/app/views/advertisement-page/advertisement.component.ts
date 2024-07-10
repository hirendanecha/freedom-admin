import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdvertisementService } from '../../services/advertisement.service';
import { ToastService } from '../../services/toast.service';
import { ChannelService } from 'src/app/services/channels.service';
@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit {
  selectedFile: any;

  advertisementDataList: any[] = [];
  imageDimensions: { width: number; height: number } | null = null;
  constructor(
    private channelService: ChannelService,
    private advertisementService: AdvertisementService,
    private spinner: NgxSpinnerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getadvertizements();
  }

  ngAfterViewInit(): void {}

  onFileSelected(event: any, id: number) {
    const file = event.target.files[0];
    // const reader = new FileReader();
    // reader.onload = (e: any) => {
    //   const ad = this.advertisementDataList.find((ad) => ad.id === id);
    //   if (ad) {
    //     ad.imageUrl = e.target.result;
    //     ad.file = file;
    //   }
    // };
    // reader.readAsDataURL(file);
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;

        image.onload = () => {
          const height = image.height;
          const width = image.width;
          console.log({ height, width, image });
          const minHeight = 80;
          const maxHeight = 500;
          const minWidth = 150;
          const maxWidth = 1250;

          if ((width < minWidth || width > maxWidth || height < minHeight || height > maxHeight) || (width === height)) {
            this.toastService.warring(`Image dimensions must be between ${minWidth}x${minHeight} and ${maxWidth}x${maxHeight} pixels and should not be square.`);
            // if (width >= 350 || height >= 150) {
            //   this.toastService.warring(
            //     'width and height must not exceed 350*150px.'
            //   );
            return false;
          } else {
            const ad = this.advertisementDataList.find((ad) => ad.id === id);
            if (ad) {
              ad.imageUrl = image.src;
              ad.file = file;
            }
          }
          return true;
        };
      };
    }
  }

  getadvertizements(): void {
    this.advertisementService.getAdvertisement().subscribe({
      next: (res: any) => {
        this.advertisementDataList = res;
        this.ensureMinimumCards();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ensureMinimumCards(): void {
    const minimumCards = 12;
    const currentLength = this.advertisementDataList.length;
    if (currentLength < minimumCards) {
      for (let i = currentLength; i < minimumCards; i++) {
        this.advertisementDataList.push({
          cardId: i + 1,
          id: null,
          imageUrl: '',
          createdDate: null,
          updatedDate: null,
        });
      }
    }
  }

  onLinkChange(advertisement: any) {
    advertisement.isLinkChanged = true;
  }

  saveAdvertisement(id: number): void {
    const ad = this.advertisementDataList.find((ad) => ad.id === id);
    if (ad && ad.file) {
    this.spinner.show();
      this.channelService.upload(ad.file).subscribe({
        next: (res: any) => {
          if (res.body.url) {
            ad.imageUrl = res.body.url;
            this.spinner.hide();
            this.saveChanges(ad);
          }
        },
        error: (err: any) => {
          this.spinner.hide();
        },
      });
    } else if (ad && ad.link && !ad.file) {
      this.saveChanges(ad);
    }
  }

  saveChanges(ad: any): void {
    this.spinner.show();

    if (ad.imageUrl && ad.createdDate || ad.link && ad.createdDate) {
      const data = {
        id: ad.id,
        imageUrl: ad.imageUrl,
        link: ad.link
      };
      console.log('update',data);
      
      this.advertisementService.getAdvertisementData(data).subscribe({
        next: (res: any) => {
          this.spinner.hide();
          this.toastService.success('Advertisement updated successfully');
          this.getadvertizements();
        },
        error: (err) => {
          this.spinner.hide();
          console.log(err);
        },
      });
    } else if (ad.imageUrl && ad.createdDate === null) {
      const data = {
        imageUrl: ad.imageUrl,
        link: ad.link
      };
      this.advertisementService.getAdvertisementData(data).subscribe({
        next: (res: any) => {
          this.spinner.hide();
          this.toastService.success('Advertisement created successfully');
          this.getadvertizements();
        },
        error: (err) => {
          this.spinner.hide();
          console.log(err);
        },
      });
    }
  }

  restData(): void {
    this.selectedFile = null;
  }

  deleteAdvertisement(id): void {
    this.advertisementService.deleteAdvertisement(id).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.toastService.danger('Advertisement deleted successfully');
        this.removePostSelectedFile(id);
        const ad = this.advertisementDataList.find((ad) => ad.id === id);
        if (ad) {
          ad.id = null;
          ad.link = '';
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err);
      },
    });
  }

  removePostSelectedFile(id: number) {
    const ad = this.advertisementDataList.find((ad) => ad.id === id);
    if (ad) {
      ad.imageUrl = '';
      ad.file = null;
      ad.link = '';
    }
  }
}
