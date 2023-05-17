import { HttpProxyResponse } from "@runlightyear/lightyear";
import { OpenAI } from "../OpenAI";

/**
 * @beta
 */
export interface CreateTranscriptionProps {
  /**
   * The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
   */
  file: string;

  /**
   * ID of the model to use. Only whisper-1 is currently available.
   */
  model: string;

  /**
   * An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language.
   */
  prompt?: string;

  /**
   * Defaults to json
   *
   * The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
   */
  responseFormat?: string;

  /**
   * Defaults to 0
   *
   * The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;

  /**
   * The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency.
   */
  language?: string;
}

/**
 * @beta
 */
export interface CreateTranscriptionResponseData {
  text: string;
}

/**
 * @beta
 */
export interface CreateTranscriptionResponse extends HttpProxyResponse {
  data: CreateTranscriptionResponseData;
}

export const createTranscription =
  (self: OpenAI) =>
  async (
    props: CreateTranscriptionProps
  ): Promise<CreateTranscriptionResponse> => {
    const { file, model, prompt, responseFormat, temperature, language } =
      props;

    return self.post({
      url: `/audio/transcriptions`,
      data: {
        file,
        model,
        prompt,
        response_format: responseFormat,
        temperature,
        language,
      },
    });
  };
