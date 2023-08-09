export namespace Walker {
  type Events = Event[];
  interface Event {
    entity: string;
    action: string;
    data?: Properties;
    context?: OrderedProperties;
    trigger?: string;
    nested: Walker.Entities;
  }

  type PropertyType = boolean | string | number;
  type Property = PropertyType | Array<PropertyType>;
  interface Properties {
    [key: string]: Property;
  }
  interface OrderedProperties {
    [key: string]: [Property, number];
  }

  type Entities = Array<Entity>;
  interface Entity {
    type: string;
    data: Properties;
    nested: Entities;
    context: OrderedProperties;
  }

  type KeyVal = [string, string];

  type Attributes = Array<string>;

  type Trigger =
    | 'click'
    | 'custom'
    | 'hover'
    | 'load'
    | 'pulse'
    | 'scroll'
    | 'submit'
    | 'visible'
    | 'wait';
  // @TODO string

  interface Filter {
    [name: string]: boolean;
  }

  interface TriggersActionGroups {
    [trigger: string]: TriggerActions;
  }

  type TriggerActions = Array<TriggerAction>;

  interface TriggerAction {
    trigger: string;
    triggerParams?: string;
    action: string;
    actionParams?: string;
  }

  type ScrollElements = Array<[HTMLElement, number]>;
}
