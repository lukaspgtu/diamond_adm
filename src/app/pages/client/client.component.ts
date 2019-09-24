import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public isDocument: boolean = false;

  items: GalleryItem[];

  imageData = data;

  constructor(public gallery: Gallery, public lightbox: Lightbox) {

    if (window.location.pathname == '/client/documents') {
      this.isDocument = true;
    }

  }

  ngOnInit() {

    /** Basic Gallery Example */

    // Creat gallery items
    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));


    /** Lightbox Example */

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }
}

const data = [
  {
    srcUrl: '../assets/images/big/img1.jpg',
    previewUrl: '../assets/images/big/img1.jpg'
  },
  {
    srcUrl: '../assets/images/big/img1.jpg',
    previewUrl: '../assets/images/big/img1.jpg'
  },
  {
    srcUrl: '../assets/images/big/img1.jpg',
    previewUrl: '../assets/images/big/img1.jpg'
  },
  {
    srcUrl: '../assets/images/big/img1.jpg',
    previewUrl: '../assets/images/big/img1.jpg'
  }
];
