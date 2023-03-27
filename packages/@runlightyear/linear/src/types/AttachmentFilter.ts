import { DateComparator } from "./DateComparator";
import { NullableUserFilter } from "./NullableUserFilter";
import { IDComparator } from "./IDComparator";
import { SourceTypeComparator } from "./SourceTypeComparator";
import { NullableStringComparator } from "./NullableStringComparator";
import { StringComparator } from "./StringComparator";

export interface AttachmentFilter {
  /**
   * Compound filters, all of which need to be matched by the attachment.
   */
  and?: Array<AttachmentFilter>;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   * Filters that the attachments creator must satisfy.
   */
  creator?: NullableUserFilter;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Compound filters, one of which need to be matched by the attachment.
   */
  or?: Array<AttachmentFilter>;

  /**
   * Comparator for the source type.
   */
  sourceType?: SourceTypeComparator;

  /**
   * Comparator for the subtitle.
   */
  subtitle?: NullableStringComparator;

  /**
   * Comparator for the title.
   */
  title?: StringComparator;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;

  /**
   * Comparator for the url.
   */
  url?: StringComparator;
}
