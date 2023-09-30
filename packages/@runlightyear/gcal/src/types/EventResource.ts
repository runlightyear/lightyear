import { Etag } from "./Etag";
import { DateTime } from "./DateTime";
import { EventTime } from "./EventTime";
import { RecurrenceRules } from "./RecurrenceRules";
import { Attendee, AttendeeInput } from "./Attendee";
import { ExtendedProperties } from "./ExtendedProperties";
import { Gadget } from "./Gadget";

export interface EventResource {
  kind: "calendar#event";
  etag: Etag;
  id: string;
  status: string;
  htmlLink: string;
  created: DateTime;
  updated: DateTime;
  summary: string;
  description: string;
  location: string;
  colorId: string;
  creator: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  organizer: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  start: EventTime;
  end: EventTime;
  endTimeUnspecified: boolean;
  recurrence: RecurrenceRules;
  recurringEventId: string;
  originalStartTime: EventTime;
  transparency: string;
  visibility: string;
  iCalUID: string;
  sequence: number;
  attendees: Array<Attendee>;
  attendeesOmitted: boolean;
  extendedProperties: ExtendedProperties;
  hangoutLink: string;
  conferenceData: {
    createRequest: {
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
      status: {
        statusCode: string;
      };
    };
    entryPoints: [
      {
        entryPointType: string;
        uri: string;
        label: string;
        pin: string;
        accessCode: string;
        meetingCode: string;
        passcode: string;
        password: string;
      }
    ];
    conferenceSolution: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    };
    conferenceId: string;
    signature: string;
    notes: string;
  };
  gadget: Gadget;
  anyoneCanAddSelf: boolean;
  guestsCanInviteOthers: boolean;
  guestsCanModify: boolean;
  guestsCanSeeOtherGuests: boolean;
  privateCopy: boolean;
  locked: boolean;
  reminders: {
    useDefault: boolean;
    overrides: [
      {
        method: string;
        minutes: number;
      }
    ];
  };
  source: {
    url: string;
    title: string;
  };
  workingLocationProperties: {
    homeOffice: unknown;
    customLocation: {
      label: string;
    };
    officeLocation: {
      buildingId: string;
      floorId: string;
      floorSectionId: string;
      deskId: string;
      label: string;
    };
  };
  attachments: [
    {
      fileUrl: string;
      title: string;
      mimeType: string;
      iconLink: string;
      fileId: string;
    }
  ];
  eventType: string;
}

export interface EventResourceInput {
  kind?: "calendar#event";
  etag?: Etag;
  id?: string;
  status?: string;
  htmlLink?: string;
  summary?: string;
  description?: string;
  location?: string;
  colorId?: string;
  organizer?: {
    id?: string;
    email: string;
    displayName?: string;
    self?: boolean;
  };
  start: EventTime;
  end: EventTime;
  endTimeUnspecified?: boolean;
  recurrence?: RecurrenceRules;
  recurringEventId?: string;
  originalStartTime?: EventTime;
  transparency?: string;
  visibility?: string;
  sequence?: number;
  attendees?: Array<AttendeeInput>;
  attendeesOmitted?: boolean;
  extendedProperties?: ExtendedProperties;
  hangoutLink?: string;
  conferenceData?: {
    createRequest: {
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
      status: {
        statusCode: string;
      };
    };
    entryPoints: [
      {
        entryPointType: string;
        uri: string;
        label: string;
        pin: string;
        accessCode: string;
        meetingCode: string;
        passcode: string;
        password: string;
      }
    ];
    conferenceSolution: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    };
    conferenceId: string;
    signature: string;
    notes: string;
  };
  gadget?: Gadget;
  anyoneCanAddSelf?: boolean;
  guestsCanInviteOthers?: boolean;
  guestsCanModify?: boolean;
  guestsCanSeeOtherGuests?: boolean;
  privateCopy?: boolean;
  locked?: boolean;
  reminders?: {
    useDefault: boolean;
    overrides: [
      {
        method: string;
        minutes: number;
      }
    ];
  };
  source?: {
    url: string;
    title: string;
  };
  workingLocationProperties?: {
    homeOffice: unknown;
    customLocation: {
      label: string;
    };
    officeLocation: {
      buildingId: string;
      floorId: string;
      floorSectionId: string;
      deskId: string;
      label: string;
    };
  };
  attachments?: [
    {
      fileUrl: string;
      title: string;
      mimeType: string;
      iconLink: string;
      fileId: string;
    }
  ];
  eventType?: string;
}

export interface EventResourcePatchInput {
  kind?: "calendar#event";
  etag?: Etag;
  id?: string;
  status?: string;
  htmlLink?: string;
  summary?: string;
  description?: string;
  location?: string;
  colorId?: string;
  organizer?: {
    id?: string;
    email: string;
    displayName?: string;
    self?: boolean;
  };
  start?: EventTime;
  end?: EventTime;
  endTimeUnspecified?: boolean;
  recurrence?: RecurrenceRules;
  recurringEventId?: string;
  originalStartTime?: EventTime;
  transparency?: string;
  visibility?: string;
  sequence?: number;
  attendees?: Array<AttendeeInput>;
  attendeesOmitted?: boolean;
  extendedProperties?: ExtendedProperties;
  hangoutLink?: string;
  conferenceData?: {
    createRequest: {
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
      status: {
        statusCode: string;
      };
    };
    entryPoints: [
      {
        entryPointType: string;
        uri: string;
        label: string;
        pin: string;
        accessCode: string;
        meetingCode: string;
        passcode: string;
        password: string;
      }
    ];
    conferenceSolution: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    };
    conferenceId: string;
    signature: string;
    notes: string;
  };
  gadget?: Gadget;
  anyoneCanAddSelf?: boolean;
  guestsCanInviteOthers?: boolean;
  guestsCanModify?: boolean;
  guestsCanSeeOtherGuests?: boolean;
  privateCopy?: boolean;
  locked?: boolean;
  reminders?: {
    useDefault: boolean;
    overrides: [
      {
        method: string;
        minutes: number;
      }
    ];
  };
  source?: {
    url: string;
    title: string;
  };
  workingLocationProperties?: {
    homeOffice: unknown;
    customLocation: {
      label: string;
    };
    officeLocation: {
      buildingId: string;
      floorId: string;
      floorSectionId: string;
      deskId: string;
      label: string;
    };
  };
  attachments?: [
    {
      fileUrl: string;
      title: string;
      mimeType: string;
      iconLink: string;
      fileId: string;
    }
  ];
  eventType?: string;
}
