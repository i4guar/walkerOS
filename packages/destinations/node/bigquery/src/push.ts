import type { Elbwalker } from '@elbwalker/types';
import type { CustomConfig, PushEvents, Row } from './types';

export const push = async function (events: PushEvents, custom: CustomConfig) {
  const { client, datasetId, tableId } = custom;

  const rows = events.map((event) => mapEvent(event.event));

  await client.dataset(datasetId).table(tableId).insert(rows);

  return { queue: [] };
};

export const mapEvent = (event: Elbwalker.Event) => {
  // Required properties
  const destinationEvent: Row = {
    event: event.event,
    consent: JSON.stringify(event.consent),
    id: event.id,
    entity: event.entity,
    action: event.action,
    timestamp: new Date(event.timestamp),
    server_timestamp: new Date(),
  };

  // Optional properties
  if (event.data) destinationEvent.data = JSON.stringify(event.data);
  if (event.context) destinationEvent.context = JSON.stringify(event.context);
  if (event.globals) destinationEvent.globals = JSON.stringify(event.globals);
  if (event.user) destinationEvent.user = event.user;
  if (event.nested) destinationEvent.nested = JSON.stringify(event.nested);
  if (event.trigger) destinationEvent.trigger = event.trigger;
  if (event.timing) destinationEvent.timing = event.timing;
  if (event.group) destinationEvent.group = event.group;
  if (event.count) destinationEvent.count = event.count;
  if (event.version) destinationEvent.version = event.version;
  if (event.source) destinationEvent.source = event.source;
  // @TODO custom
  // if (event.additional_data)
  //   destinationEvent.additional_data = JSON.stringify(event.additional_data);

  return destinationEvent;
};
