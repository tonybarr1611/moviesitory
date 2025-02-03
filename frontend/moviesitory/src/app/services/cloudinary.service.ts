import { environment } from '../../environments/environment.development';
import { CloudinaryModule } from '@cloudinary/ng';
// Import the Cloudinary classes.
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: environment.cloudName,
    apiKey: environment.APIKey,
    apiSecret: environment.APISecret,
  },
});

export default cld;
