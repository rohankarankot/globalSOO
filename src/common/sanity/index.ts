import { Injectable } from '@nestjs/common';
import createClient, { SanityClient } from '@sanity/client';

@Injectable()
class SanityService {
  public readonly client: SanityClient = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_PROJECT_DATASET,
    apiVersion: '2022-03-07',
    useCdn: true,
    token: process.env.SANITY_PROJECT_TOKEN,
  });
}

export default SanityService;
