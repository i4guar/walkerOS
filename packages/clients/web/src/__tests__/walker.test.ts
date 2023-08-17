import fs from 'fs';
import { getEvents } from '../lib/walker';
import { Const } from '@elbwalker/utils';
const mockFn = jest.fn(); //.mockImplementation(console.log);

const html: string = fs
  .readFileSync(__dirname + '/html/walker.html')
  .toString();

beforeEach(() => {
  // reset DOM with event listeners etc.
  document.body = document.body.cloneNode() as HTMLElement;
  document.body.innerHTML = html;
  jest.clearAllMocks();
});

describe('Walker', () => {
  test('Basic collection', () => {
    expect(getEvents(getElem('basic'), Const.Trigger.Load)).toMatchObject([
      {
        entity: 'entity',
        action: 'action',
        data: { k: 'v' },
      },
    ]);
  });

  test('Nested entites', () => {
    expect(getEvents(getElem('nested'), Const.Trigger.Load)).toMatchObject([
      {
        entity: 'mother',
        action: 'like',
        data: { label: 'grandmother' },
        trigger: Const.Trigger.Load,
        nested: [
          { type: 'son', data: { interested_in: 'pizza' } },
          {
            type: 'daughter',
            data: { status: 'hungry' },
            nested: [{ type: 'baby', data: { status: 'infant' } }],
          },
          { type: 'baby', data: { status: 'infant' } },
        ],
      },
    ]);

    expect(getEvents(getElem('son'), Const.Trigger.Load)).toMatchObject([
      {
        entity: 'son',
        action: 'speak',
        data: { interested_in: 'pizza' },
      },
      { entity: 'mother', action: 'speak', data: { label: 'grandmother' } },
    ]);
  });

  test('Nested entites filtered', () => {
    expect(getEvents(getElem('daughter'), Const.Trigger.Load)).toMatchObject([
      {
        entity: 'daughter',
        action: 'care',
        data: { status: 'hungry' },
      },
    ]);
  });

  test('Nested entites filtered multiple', () => {
    expect(getEvents(getElem('baby'), Const.Trigger.Load)).toMatchObject([
      {
        entity: 'baby',
        action: 'play',
        data: { status: 'infant' },
      },
      { entity: 'mother', action: 'play', data: { label: 'grandmother' } },
    ]);
  });

  test('Quoted Properties', () => {
    expect(getEvents(getElem('properties'), Const.Trigger.Load)).toMatchObject([
      {
        entity: 'properties',
        action: 'act;ion',
        data: { foo: 'ba;r', key: 'value' },
      },
    ]);
    expect(getEvents(getElem('properties'), Const.Trigger.Click)).toMatchObject(
      [
        {
          entity: 'properties',
          action: 'action;',
          data: { foo: 'ba;r', key: 'value' },
        },
      ],
    );
  });

  test('No elbwalker attribute at clicked element', () => {
    expect(getEvents(getElem('click_test'), Const.Trigger.Click)).toMatchObject(
      [
        {
          entity: 'click',
          action: 'test',
          data: {},
        },
      ],
    );
  });

  test('No action attribute at clicked element', () => {
    expect(getEvents(getElem('click_bubble'), Const.Trigger.Click)).toEqual([
      expect.objectContaining({
        entity: 'click',
        action: 'test',
        data: { foo: 'bar', key: 'value' },
      }),
    ]);
  });

  test('Empty action attribute at clicked element', () => {
    expect(
      getEvents(getElem('click_bubble_action'), Const.Trigger.Click),
    ).toEqual([
      expect.objectContaining({
        entity: 'click',
        action: 'test',
        data: { foo: 'bar', key: 'value' },
      }),
    ]);
  });

  test('Empty action attribute at clicked element and missing action attribute at parent', () => {
    expect(getEvents(getElem('click_invalid'), Const.Trigger.Click)).toEqual(
      [],
    );
  });

  test('Missing action and property', () => {
    expect(getEvents(getElem('just_entity'), Const.Trigger.Click)).toEqual([]);
  });

  test('Get nested child data properties with higher priority', () => {
    expect(getEvents(getElem('propert_priority'), Const.Trigger.Click)).toEqual(
      [
        expect.objectContaining({
          entity: 'property',
          action: 'priority',
          data: { parent: 'property', prefere: 'deeper' },
        }),
      ],
    );
  });

  test('Dynamic values', () => {
    expect(getEvents(getElem('dynamic_values'), Const.Trigger.Click)).toEqual([
      expect.objectContaining({
        action: 'click',
        entity: 'dynamic',
        data: {
          value_value: 'text',
          html: 'inner',
          id: 'id_value',
          static: 'value',
          option: 'choosen',
        },
      }),
    ]);
  });

  test('Prefix', () => {
    expect(
      getEvents(getElem('prefix'), Const.Trigger.Load, 'elb'),
    ).toMatchObject([
      {
        entity: 'entity',
        action: 'action',
        data: { k: 'v' },
      },
    ]);
  });

  test('Context', () => {
    expect(getEvents(getElem('context'), Const.Trigger.Click)).toMatchObject([
      {
        entity: 'e',
        action: 'click',
        context: {
          inside: ['entity', 0],
          recommendation: ['smart_ai', 1],
          same: ['level', 1],
          test: ['engagement', 2],
        },
      },
    ]);
  });

  test('Casting', () => {
    expect(getEvents(getElem('casting'), Const.Trigger.Load)).toMatchObject([
      {
        entity: 'types',
        action: 'cast',
        data: {
          string: 'text',
          empty: '',
          bool_true: true,
          bool_false: false,
          null: 0,
          int: 42,
          float: 13.37,
          negative: -3.14,
        },
      },
    ]);
  });

  test('Array properties', () => {
    expect(getEvents(getElem('array'), Const.Trigger.Load)).toMatchObject([
      {
        entity: 'array',
        action: 'props',
        data: {
          size: ['s', 'm', 'l'],
        },
      },
    ]);
  });

  test('Page entity as default', () => {
    expect(getEvents(getElem('no_entity'), Const.Trigger.Click)).toMatchObject([
      {
        entity: 'page',
        action: 'click',
        data: { e: 'v', p: 'v' },
        context: { k: ['c', 0] },
      },
    ]);
  });

  test('Generic properties', () => {
    expect(getEvents(getElem('generic'), Const.Trigger.Click)).toMatchObject([
      {
        entity: 'generic',
        data: { p: 'v', k: 'v', g: 'v', o: 'v' },
      },
    ]);
  });

  test('Link', () => {
    const data = { k: 'v', l0: 0, l1: 1, l2: 2, l3: 3 };

    expect(
      getEvents(getElem('link-parent'), Const.Trigger.Click),
    ).toMatchObject([{ entity: 'l', context: { entity: ['link', 0] }, data }]);

    expect(getEvents(getElem('link-child'), Const.Trigger.Click)).toMatchObject(
      [
        {
          entity: 'l',
          context: {
            child: ['link', 0],
            parent: ['link', 1],
            entity: ['link', 2],
          },
          data,
        },
      ],
    );
  });
});

function getElem(selector: string) {
  return document.getElementById(selector) as HTMLElement;
}
