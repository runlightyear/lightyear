import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

export interface CreateImageProps {
  /**
   * A text description of the desired image(s). The maximum length is 1000 characters.
   */
  prompt: string;

  /**
   * The number of images to generate. Must be between 1 and 10.
   *
   * Defaults to 1
   */
  n?: number;

  /**
   * The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024.
   *
   * Defaults to 1024x1024
   */
  size?: "256x256" | "512x512" | "1024x1024";

  /**
   * The format in which the generated images are returned.
   *
   * Defaults to url
   */
  responseFormat?: "url" | "b64_json";

  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. Learn more.
   */
  user?: string;
}

export interface CreateImageResponse extends HttpProxyResponse {
  data: {
    created: number;
    data: Array<{
      url: string;
    }>;
  };
}

export const createImage =
  (self: OpenAI) =>
  async (props: CreateImageProps): Promise<CreateImageResponse> => {
    const { prompt, n, size, responseFormat, user } = props;

    return self.post({
      url: `/images/generations`,
      data: {
        prompt,
        n,
        size,
        response_format: responseFormat,
        user,
      },
    });
  };
