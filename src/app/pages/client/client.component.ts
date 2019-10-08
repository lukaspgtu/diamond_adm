import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public client: object;

  public manager: object;

  public plan: object;

  public isDocument: boolean = false;

  public items: GalleryItem[];

  public imageData = data;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authSrv: AuthService,
    private userSrv: UserService,
    public gallery: Gallery,
    public lightbox: Lightbox
  ) {

    if (window.location.pathname.search('documents') != -1) {
      this.isDocument = true;
    }

  }

  ngOnInit() {

    this.title.setTitle('Cliente | Diamond Trading');

    this.spinner.show();

    // Verify Login
    this.authSrv.verifyLogin()
      .subscribe(res => {
        if (!res.success) {
          this.authSrv.logout();
          this.router.navigate(['/login']);
        }
        else {

          this.route.params.subscribe((params: any) => {
            const token = params['token'];

            // Client
            this.userSrv.client(token)
              .subscribe(res => {
                this.client = res.data.client;
                this.manager = res.data.manager;
                this.plan = res.data.plan;
              });
          });
        }
      });

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
