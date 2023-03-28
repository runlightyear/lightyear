import { DateComparator } from "./DateComparator";
import { NullableUserFilter } from "./NullableUserFilter";
import { IDComparator } from "./IDComparator";
import { NullableStringComparator } from "./NullableStringComparator";
import { AttachmentFilter } from "./AttachmentFilter";
import { StringComparator } from "./StringComparator";
import { SourceTypeComparator } from "./SourceTypeComparator";
import { NumberComparator } from "./NumberComparator";

export interface AttachmentCollectionFilter {
  /**
   * Compound filters, all of which need to be matched by the attachment.
   */
  and?: Array<AttachmentCollectionFilter>;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   * Filters that the attachments creator must satisfy.
   */
  creator?: NullableUserFilter;

  /**
   * Filters that needs to be matched by all attachments.
   */
  every?: AttachmentFilter;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Comparator for the collection length.
   */
  length?: NumberComparator;

  /**
   * Compound filters, one of which need to be matched by the attachment.
   */
  or?: Array<AttachmentCollectionFilter>;

  /**
   * Filters that needs to be matched by some attachments.
   */
  some?: AttachmentFilter;

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
